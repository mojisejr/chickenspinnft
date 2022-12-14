const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Chicker";
const description =
  "Chicken DAO NFT Chicken DAO คือโปรเจค NFT Generative profile picture แบบ On The Fly Random Generate รูปไก่กุ๊กๆ ที่มีแต่ พระเจ้าเท่านั้นที่รู้ว่า ตัวต่อไปจะเป็นอะไร Chicken DAO เป็นโปรเจค profile picture ที่อยากจะรู้ว่า On Chain DAO สามารถที่จะทำให้ คอมมูนิตี้มีส่วนร่วมในการสร้างมูลค่า ให้กับโปรเจคได้อย่างแท้จริงหรือเปล่า ? , Roadmap เราไม่มีเพราะทุกอย่างไม่ได้อยู่ในมือเราเท่านั้น แต่อยู่ในมือ พวกเราเหล่า Chicker";
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
const commonConfig = [
  { name: "BG" },
  { name: "Prop" },
  { name: "Crest" },
  { name: "Type" },
  { name: "Tattoo" },
  { name: "Neck" },
  { name: "Body" },
  { name: "Mouth" },
  { name: "Scarf" },
  { name: "Eyes" },
  { name: "Head" },
  { name: "Tag" },
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
