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
  checkTokenId,
  checkDNA,
};
