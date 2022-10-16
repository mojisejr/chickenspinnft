const express = require("express");
const sequelize = require("./database/sqlite.database");
const basePath = process.cwd();
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);
const nft = require("./blockchain");
const { ethers } = require("ethers");
require("dotenv").config();
require("./pinata");

const options = {
  gasPrice: ethers.utils.parseUnits("30", "gwei"),
  gasLimit: 3000000,
};

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.status(200).json({
    result: "OK",
  });
});

nft.on("Minted", async (minter, _tokenId) => {
  //@DEV: parse token to String from;
  let success = false;
  let tokenId = _tokenId.toString();
  console.log(`${tokenId} minted ====`);
  //@DEV: create image and pin then return url back
  const jsonUrl = await startCreating(tokenId);
  //@DEV: set baseURI to the contract
  while (!success) {
    try {
      console.log(`${tokenId} setting base uri...`);
      const tx = await nft
        .setBaseUri(tokenId, jsonUrl, options)
        .then(() => {
          success = true;
        })
        .catch((e) => success(false));
      await tx.wait();
      console.log(`${tokenId} tx: ${tx.hash}`);
      console.log(`[[[[==>${tokenId}<==SUCCESSFULL]]]]`);
    } catch (e) {
      success = false;
    }
  }
});

sequelize.sync().then(() => {
  console.log("sqlite ready");
});

app.listen(PORT, () => {
  console.log("generator is now ready");
  buildSetup();
  console.log("build setup ok!");
});
