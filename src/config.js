const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const description = "Remember to replace this description";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // セカンダリーマーケットの売上からどれだけの割合を得るかを定義する 1000 = 10
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// Solanaを選択した場合、コレクションは自動的に0から開始されます。
// const layerConfigurations = [
//   {
//     growEditionSizeTo: 1000,
//     layersOrder: [
//       { name: "basic" },
//       { name: "Eye" },
//       { name: "Hair" },
//       { name: "Mouse" },
//     ],
//   },
// ];

// 
const layerConfigurations = [
  {
    fileName: "weapon_off/helmet_off/aura",
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "face_result" },
      { name: "cloth" },
      { name: "rare" },
    ],
  },
  {
    fileName: "weapon_off/helmet_off/none",
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "face_result" },
      { name: "cloth" },
    ],
  },
  {
    fileName: "weapon_off/helmet_on/aura",
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "face_result" },
      { name: "cloth_h" },
      { name: "rare" },
    ],
  },
  {
    fileName: "weapon_off/helmet_on/none",
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "face_result" },
      { name: "cloth_h" },
    ],
  },

  {
    fileName: "weapon_on/helmet_off/aura",
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "face_result" },
      { name: "cloth_w" },
      { name: "rare" },
    ],
  },
  {
    fileName: "weapon_on/helmet_off/none",
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "face_result" },
      { name: "cloth_w" },
    ],
  },
  {
    fileName: "weapon_on/helmet_on/aura",
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "face_result" },
      { name: "cloth_h_w" },
      { name: "rare" },
    ],
  },
  {
    fileName: "weapon_on/helmet_on/none",
    growEditionSizeTo: 10,
    layersOrder: [
      { name: "face_result" },
      { name: "cloth_h_w" },
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 1024,
  height: 1024,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
