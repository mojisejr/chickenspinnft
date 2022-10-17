const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your NFT name here";
const description = "NFT Collection Description here";
// const description =
//   "KPunk Hooligan Limited Edition Collection NFT Pixel art profile picture ที่ไม่ซ้ำกันเลย. มีระดับความหายาก 5 ระดับคือ Normal, Rare, Super Rare, Super Special Rare, Ultra Rare";
const baseUri = "ipfs://";

const solanaMetadata = {
  symbol: "",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "",
  creators: [
    {
      address: "",
      share: 100,
    },
  ],
};

//Place layer folder name here
// const commonConfig = [
//   { name: "Bg 1" },
//   { name: "Back 2" },
//   { name: "Crest 3" },
//   { name: "Type 4" },
//   { name: "Tattoo 5" },
//   { name: "Neck 6" },
//   { name: "Body 7" },
//   { name: "Mouth 8" },
//   { name: "Scarf 9" },
//   { name: "Eyes 10" },
//   { name: "Head 11" },
//   { name: "Tag 12" },
//   // { name: "Item 13" },
// ];
const commonConfig = [
  { name: "Background" },
  { name: "Face" },
  { name: "Lower" },
  { name: "Upper" },
  { name: "Head" },
  { name: "Pet" },
];

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    //how many nft do you want to generate ?
    growEditionSizeTo: 10,
    layersOrder: commonConfig,
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 750,
  height: 750,
  smoothing: true,
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
  weight: "bold",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "90%",
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
