const Token = require("../models/token.model");

async function addMintedToken(tokenId, dna) {
  try {
    await Token.create({
      id: tokenId,
      dna: dna,
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function checkTokenId(tokenId) {
  try {
    const found = await Token.findOne({
      where: {
        id: tokenId,
      },
    });
    console.log("token ", found);
    if (!found) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

async function checkDNA(dna) {
  try {
    const found = await Token.findOne({
      where: {
        dna: dna,
      },
    });
    console.log("dna ", found);
    if (!found) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

module.exports = {
  addMintedToken,
  checkTokenId,
  checkDNA,
};
