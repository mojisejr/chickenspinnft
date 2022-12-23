const Token = require("../models/token.model");

async function addMintedToken(tokenId, dna, tokenURI) {
  try {
    await Token.create({
      id: tokenId,
      dna: dna,
      tokenURI: tokenURI,
      completed: false,
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function getBaseUriOf(tokenId) {
  try {
    const { dataValues } = await Token.findOne({ where: { id: tokenId } });
    if (dataValues.tokenURI != "") {
      return dataValues.tokenURI;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

async function updateTokenURI(tokenId, tokenURI, minter) {
  const result = await Token.update(
    { tokenURI, minter },
    { where: { id: tokenId } }
  );
  console.log("update token", result);
}

async function updateCompletedToken(tokenId, minter) {
  const result = await Token.update(
    { minter, completed: true, timestamp: new Date().getTime() },
    { where: { id: tokenId } }
  );
  console.log("updateCompleted ", result);
}

// async function getRandomTokenId() {}

async function checkTokenId(tokenId) {
  try {
    const found = await Token.findOne({
      where: {
        id: tokenId,
      },
    });
    if (!found) {
      return true;
    } else {
      console.log(`checkTokenId: ${tokenId} has dupliacted id`);
      return false;
    }
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
    if (!found) {
      return true;
    } else {
      console.log(
        "checkDNA: found duplicated with tokenId: ",
        found.dataValues.id
      );
      return false;
    }
  } catch (e) {
    return false;
  }
}

module.exports = {
  addMintedToken,
  getBaseUriOf,
  updateTokenURI,
  updateCompletedToken,
  checkTokenId,
  checkDNA,
};
