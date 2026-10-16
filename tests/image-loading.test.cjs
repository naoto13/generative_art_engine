const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const vm = require('node:vm');

if (process.argv[2] === '--fixture') {
  const [file, scenario] = process.argv.slice(3);
  const writes = [], draws = [], unhandled = [], imagePaths = [];
  process.on('unhandledRejection', error => unhandled.push(error.message));
  const failure = new Error('fixture image unavailable');
  const ctx = { clearRect() {}, drawImage(image) { draws.push(image.path); }, fillRect() {} };
  const config = {
    format: { width: 2, height: 2, smoothing: false }, network: 'eth',
    layerConfigurations: [{ growEditionSizeTo: 1, layersOrder: [{ name: 'First' }, { name: 'Second' }] }],
    rarityDelimiter: '#', shuffleLayerConfigurations: false, uniqueDnaTorrance: 2,
    text: { only: false }, gif: { export: false }, background: { generate: false },
    namePrefix: 'Fixture', baseUri: 'fixture:', description: 'inert', extraMetadata: {},
  };
  const fakeFs = {
    readdirSync: () => ['part#1.png'],
    writeFileSync: (file, value) => writes.push({ file, value: String(value) }),
  };
  const module = { exports: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
    process: { cwd: () => '/fixture', exit() { throw new Error('unexpected exit'); } },
    console: { log() {}, error() {} }, module,
    require(id) {
      if (id === 'fs') return fakeFs;
      if (id.endsWith('/network.js')) return { NETWORK: { sol: 'sol' } };
      if (id.endsWith('/sha1')) return () => 'fixture-dna';
      if (id.endsWith('/config.js')) return config;
      if (id.endsWith('/HashlipsGiffer.js')) return class {};
      if (id.endsWith('/canvas')) return {
        createCanvas: () => ({ getContext: () => ctx, toBuffer: () => Buffer.from('inert image') }),
        loadImage(imagePath) {
          imagePaths.push(imagePath);
          const shouldFail = scenario !== 'success' && (scenario !== 'second-reject' || imagePath.includes('/Second/'));
          if (shouldFail && scenario === 'throw') throw failure;
          if (shouldFail) return Promise.reject(failure);
          return Promise.resolve({ path: imagePath });
        },
      };
      throw new Error(`Unexpected dependency: ${id}`);
    },
  }, { filename: file });
  let state = 'pending', sameError = false;
  module.exports.startCreating().then(() => { state = 'fulfilled'; }, error => { state = 'rejected'; sameError = error === failure; });
  setTimeout(() => {
    console.log(JSON.stringify({ state, sameError, writes, draws, imagePaths, unhandled }));
  }, 30);
} else {
  for (const file of ['src/main.js', 'src/main_crypto.js']) {
    for (const scenario of ['success', 'reject', 'throw', 'second-reject']) {
      test(`${file}: ${scenario}`, () => {
        const result = spawnSync(process.execPath, [__filename, '--fixture', file, scenario], { encoding: 'utf8', timeout: 3000 });
        assert.equal(result.status, 0, result.stderr);
        const value = JSON.parse(result.stdout);
        if (scenario === 'success') {
          assert.equal(value.state, 'fulfilled');
          assert.deepEqual(value.draws, ['/fixture/layers/First/part#1.png', '/fixture/layers/Second/part#1.png']);
          const metadata = JSON.parse(value.writes.find(w => w.file.endsWith('/json/1.json')).value);
          assert.deepEqual(metadata.attributes, [{ trait_type: 'First', value: 'part' }, { trait_type: 'Second', value: 'part' }]);
          assert.equal(value.writes.filter(w => w.file.endsWith('/images/1.png')).length, 1);
          assert.equal(value.writes.length, file === 'src/main.js' ? 2 : 3);
        } else {
          assert.equal(value.state, 'rejected', 'caller must reject instead of remaining pending');
          assert.equal(value.sameError, true, 'preserve the original error');
          assert.deepEqual(value.writes, [], 'failed edition must not be published');
          assert.deepEqual(value.draws, [], 'failed edition must not be drawn');
        }
        assert.deepEqual(value.unhandled, [], 'failure must belong to startCreating promise');
      });
    }
  }
}
