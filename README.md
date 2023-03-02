# Welcome to HashLips 👄

![](https://github.com/HashLips/hashlips_art_engine/blob/main/logo.png)

# HashLips Art Engine 🔥

参考
https://note.com/standenglish/

## Installation 🛠️

フォルダのルートに移動し、yarnがインストールされている場合は、このコマンドを実行します。

```sh
yarn install
```

また、nodeがインストールされている場合は、このコマンドを実行することもできます。

```sh
npm install
```

## Usage ℹ️

layers」ディレクトリにフォルダを作成し、その中に全てのレイヤーアセットを追加してください。アセット名は、ファイル名にレアリティのウェイトが付いていれば何でもOKです。例えば、`example element#70.png` のように。オプションとして、デリミタ `#` を `src/config.js` ファイル内の変数 `rarityDelimiter` で好きなものに変更することができます。

全てのレイヤーを配置したら、`src/config.js` に移動して `layerConfigurations` オブジェクトの `layersOrder` 配列を更新し、レイヤーフォルダー名を後ろのレイヤーから前のレイヤーへ順番に並べてください。

例:_ ポートレートデザインを作成する場合、背景、頭、口、目、眼鏡、そしてヘッドウェアの順で作成します。

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Head" },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Eyeswear" },
      { name: "Headwear" },
    ],
  },
];
```

各レイヤーオブジェクトの `name` は、画像が格納されているフォルダ名（`/layers/` 内）を表します。

オプションとして、複数の異なる `layerConfigurations` をコレクションに追加することができます。各設定はユニークで、異なるレイヤーオーダーを持つことができ、同じレイヤーを使用したり、新しいレイヤーを導入したりすることができます。これは、アーティストが自分のニーズに合わせてコレクションを微調整する際に、柔軟性を与えます。

例：ポートレートデザインを作成する場合、背景、頭、口、目、眼鏡、そしてヘッドウェアがあり、新しいレースを作成したり、単純にレイヤーの順番を変えたり、新しいレイヤーを追加する場合、`layerConfigurations` と `layersOrder` は次のようになります。

```js
const layerConfigurations = [
  {
    // Creates up to 50 artworks
    growEditionSizeTo: 50,
    layersOrder: [
      { name: "Background" },
      { name: "Head" },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Eyeswear" },
      { name: "Headwear" },
    ],
  },
  {
    // Creates an additional 100 artworks
    growEditionSizeTo: 150,
    layersOrder: [
      { name: "Background" },
      { name: "Head" },
      { name: "Eyes" },
      { name: "Mouth" },
      { name: "Eyeswear" },
      { name: "Headwear" },
      { name: "AlienHeadwear" },
    ],
  },
];
```

出力される画像サイズである `format` サイズと、出力されるバリエーション量である各 `layerConfigurations` オブジェクトの `growEditionSizeTo` を更新してください。

コンフィグ.js`ファイル内の変数 `shuffleLayerConfigurations` を true に設定すると、画像を保存する `layerConfigurations` の順序を混ぜることができます。デフォルトではfalseになっており、すべての画像が数値順に保存されます。

もし、画像を生成するときに何が起こっているのかをデバッグするためにログを残したい場合は、`config.js`ファイル内の変数 `debugLogs` をtrueに設定することができます。デフォルトでは false になっているので、一般的なログしか見えません。

もし、異なるブレンドモードで遊びたい場合は、 `blend.MODE.colorBurn` フィールドを追加してください。MODE.colorBurn` フィールドを追加することができます。

もし、レイヤーの不透明度を変えたい場合は、laysOrder `options` オブジェクトに `opacity: 0.7` フィールドを追加することができます。

DNAの一意性チェックでレイヤーを無視させたい場合は、`options`オブジェクトに `bypassDNA: true` を設定します。これは、例えば `Background` レイヤーを形質として考慮しない一方で、残りの形質がユニークであることを確認する効果があります。レイヤーは最終的な画像に含まれます。

別のメタデータ属性名を使用するには、`displayName: "Awesome Eye Color"` を `options` オブジェクトに追加します。すべてのオプションはオプションであり、必要であれば同じレイヤーに追加することができます。

以下は、両方のフィルターフィールドを使った場合の例です。

```js
const layerConfigurations = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      { name: "Background" , {
        options: {
          bypassDNA: false;
        }
      }},
      { name: "Eyeball" },
      {
        name: "Eye color",
        options: {
          blend: MODE.destinationIn,
          opacity: 0.2,
          displayName: "Awesome Eye Color",
        },
      },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid", options: { blend: MODE.overlay, opacity: 0.7 } },
      { name: "Top lid" },
    ],
  },
];
```

オプションで使用できるブレンドモードの一覧はこちらです。

```js
const MODE = {
  sourceOver: "source-over",
  sourceIn: "source-in",
  sourceOut: "source-out",
  sourceAtop: "source-out",
  destinationOver: "destination-over",
  destinationIn: "destination-in",
  destinationOut: "destination-out",
  destinationAtop: "destination-atop",
  lighter: "lighter",
  copy: "copy",
  xor: "xor",
  multiply: "multiply",
  screen: "screen",
  overlay: "overlay",
  darken: "darken",
  lighten: "lighten",
  colorDodge: "color-dodge",
  colorBurn: "color-burn",
  hardLight: "hard-light",
  softLight: "soft-light",
  difference: "difference",
  exclusion: "exclusion",
  hue: "hue",
  saturation: "saturation",
  color: "color",
  luminosity: "luminosity",
};
```

準備ができたら、以下のコマンドを実行すると、出力されたアートは `build/images` ディレクトリに、json は `build/json` ディレクトリに置かれます。

```sh
npm run build
```

or

```sh
node index.js
```

Tこのプログラムは、`build/images` ディレクトリにあるすべての画像を、`build/json` ディレクトリにあるメタデータファイルとともに出力します。各コレクションは `_metadata.json` ファイルを持ち、これは `build/json` ディレクトリにあるコレクションのすべてのメタデータから構成されます。また、`build/json` フォルダには、各画像ファイルを表す全てのシングルjsonファイルが格納されます。画像のシングルjsonファイルは、以下のようなものになります。

```json
{
  "dna": "d956cdf4e460508b5ff90c21974124f68d6edc34",
  "name": "#1",
  "description": "This is the description of your NFT project",
  "image": "https://hashlips/nft/1.png",
  "edition": 1,
  "date": 1731990799975,
  "attributes": [
    { "trait_type": "Background", "value": "Black" },
    { "trait_type": "Eyeball", "value": "Red" },
    { "trait_type": "Eye color", "value": "Yellow" },
    { "trait_type": "Iris", "value": "Small" },
    { "trait_type": "Shine", "value": "Shapes" },
    { "trait_type": "Bottom lid", "value": "Low" },
    { "trait_type": "Top lid", "value": "Middle" }
  ],
  "compiler": "HashLips Art Engine"
}
```

また、`config.js` ファイル内の `extraMetadata` オブジェクト変数に、追加したい項目 (key: value) のペアを追加すれば、各メタデータ・ファイルに余分なメタデータを追加することができます。


```js
const extraMetadata = {
  creator: "Daniel Eugene Botha",
};
```

余分なメタデータが必要ない場合は、単にオブジェクトを空にしてください。デフォルトでは空です。

```js
const extraMetadata = {};
```


## Utils

### Updating baseUri for IPFS and description

コレクションを実行した後で、baseUri と description を更新したくなるかもしれません。baseUri と description を更新するには、単に以下を実行します。

```sh
npm run update_info
```

### Generate a preview image

コレクションのプレビュー画像コラージュを作成し、実行します。

```sh
npm run preview
```

### Generate pixelated images from collection

画像をピクセル画像に変換するためには、変換したい画像のリストが必要です。そこで、まずジェネレーターを実行します。
そして、このコマンドを実行するだけです。

```sh
npm run pixelate
```

すべての画像は `/build/pixel_images` ディレクトリに出力されます。
もし、ピクセル化の比率を変更したい場合は、 `src/config.js` ファイルにある `pixelFormat` オブジェクトの ratio プロパティを更新してください。左側の数字が小さいほど、画像のピクセル化が強くなります。

```js
const pixelFormat = {
  ratio: 5 / 128,
};
```

### Printing rarity data (Experimental feature)

コレクション全体の各属性のパーセンテージを見るには、以下を実行します。
```sh
npm run rarity
```

このような出力になります。
```sh
Trait type: Top lid
{
  trait: 'High',
  chance: '30',
  occurrence: '3 in 20 editions (15.00 %)'
}
{
  trait: 'Low',
  chance: '20',
  occurrence: '3 in 20 editions (15.00 %)'
}
{
  trait: 'Middle',
  chance: '50',
  occurrence: '14 in 20 editions (70.00 %)'
}
```

