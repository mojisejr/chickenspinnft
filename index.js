const express = require("express");
const sequelize = require("./database/sqlite.database");
const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);
const {
  updateTokenURI,
  updateCompletedToken,
  getBaseUriOf,
} = require("./database/services/token.service");
const nft = require("./blockchain");
const { ethers } = require("ethers");
require("dotenv").config();
require("./pinata");

const options = {
  gasPrice: ethers.utils.parseUnits("20", "gwei"),
  gasLimit: 5500000,
};

const app = express();

const PORT = process.env.PORT || 5555;

app.get("/", async (req, res) => {
  res.status(200).json({
    result: "OK",
  });
});

nft.on("Minted", async (minter, _tokenId) => {
  //@DEV: parse token to String from;
  let tokenId = _tokenId.toString();
  console.log(`${tokenId} minted ====`);
  //@DEV: create image and pin then return url back
  const jsonUrl = await startCreating(tokenId);
  await updateTokenURI(tokenId, jsonUrl);
  //@DEV: set baseURI to the contract
  console.log(`${tokenId} setting base uri...`);
  const tx = await nft
    .setBaseUri(tokenId, jsonUrl, options)
    .catch((e) => console.log("error setBaseURI", e));
  await tx.wait();
  console.log(`${tokenId} SET BASE URI tx: ${tx.hash}`);
  console.log(`[[[[==>${tokenId}<==SUCCESSFULL]]]]`);
  if (tx.hash) {
    await updateCompletedToken(tokenId);
  }
});

nft.on("RequestBaseUri", async (_tokenId, owner) => {
  let tx;
  let tokenId = _tokenId.toString();
  console.log(`${tokenId} request tokenURI`);
  const completed = await nft.isCompleted(tokenId);
  const baseURI = await getBaseUriOf(tokenId);
  if (!completed && baseURI != null) {
    tx = await nft
      .setBaseUri(tokenId, baseURI, options)
      .catch((e) => console.log("error RequsetBaseURI: ", e));
    await tx.wait();
    console.log(`${tokenId} REQUEST BASE URI tx:`);
    console.log(`[[[[==>${tokenId}<==SUCCESSFULL]]]]`);
  } else {
    console.log("failed!");
  }
});

process.on("uncaughtException", (error) => {
  console.log(error.message);
  console.log("uncaught error");
});
process.on("unhandledRejection", (error) => {
  console.log(error);
  console.log("unhandle rejection");
});

sequelize.sync().then(() => {
  console.log("sqlite ready");
});

app.listen(PORT, () => {
  console.log("generator is now ready");
  buildSetup();
  console.log("build setup ok!");
});
