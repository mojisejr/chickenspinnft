require("dotenv").config();
const pinataSdk = require("@pinata/sdk");
const pinata = pinataSdk(process.env.pinata_api_key, process.env.pinata_secret);
const fs = require("fs");
const basePath = process.cwd();
const buildPath = `${basePath}/build/images`;
const basePinataUrl = "https://gateway.pinata.cloud/ipfs";
const { Readable } = require("stream");

pinata
  .testAuthentication()
  .then(() => {
    console.log("pinata ready!");
  })
  .catch((e) => {
    console.log("pinata error: ", e);
  });

async function readImageOf(tokenId) {
  let imagePath = `${buildPath}/${tokenId}.png`;
  let readStream = fs.createReadStream(imagePath);
  return readStream;
}

async function pinImageBufferToPinata(tokenId, buffer) {
  const options = {
    pinataMetadata: {
      name: `${tokenId}.png`,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const stream = Readable.from(buffer);
  const result = await pinata.pinFileToIPFS(stream, options).catch((e) => {
    console.log(e);
  });
  const mapped = {
    ...result,
    imageUrl: `${basePinataUrl}/${result.IpfsHash}`,
  };
  return mapped;
}

async function pinImageToPinata(tokenId) {
  const imageStream = await readImageOf(tokenId);
  const result = await pinata.pinFileToIPFS(imageStream);
  const mapped = {
    ...result,
    imageUrl: `${basePinataUrl}/${result.IpfsHash}`,
  };
  //   console.log(mapped);
  return mapped;
}

async function pinMetadataToPinata(tokenId, metadata) {
  const options = {
    pinataMetadata: {
      name: `${tokenId}.json`,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const result = await pinata.pinJSONToIPFS(metadata, options);
  const mapped = {
    result,
    jsonUrl: `${basePinataUrl}/${result.IpfsHash}`,
  };
  return mapped;
}

module.exports = {
  pinImageToPinata,
  pinMetadataToPinata,
  pinImageBufferToPinata,
};
