require("dotenv").config();
const { NFTStorage, Blob } = require("nft.storage");
const nftstorage = new NFTStorage({ token: process.env.nft_storage_key });

async function storeImageBlob(image) {
  const blob = new Blob([image], { type: "image/png" });
  const output = await nftstorage.storeBlob(blob);
  const baseUrl = `https://nftstorage.link/ipfs/${output}`;
  return baseUrl;
}

async function storeNFT(metadata) {
  const blob = new Blob([JSON.stringify(metadata)], { type: "text/json" });
  const output = await nftstorage.storeBlob(blob);
  const baseUrl = `https://nftstorage.link/ipfs/${output}`;
  return baseUrl;
}

module.exports = { storeNFT, storeImageBlob };
