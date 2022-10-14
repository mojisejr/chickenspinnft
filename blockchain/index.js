require("dotenv").config();
const { ethers } = require("ethers");

const options = {
  gasPrice: ethers.utils.parseUnits("20", "gwei"),
  gasLimit: 5500000,
};

const provider = new ethers.providers.JsonRpcProvider(
  // "https://rpc-testnet.bitkubchain.io"
  "https://rpc-mumbai.matic.today"
);
const wallet = new ethers.Wallet(process.env.wallet_key);
const account = wallet.connect(provider);

const nftContract = new ethers.Contract(
  "0xe5B8b548B98F924336aC64a8B747Db212a62cBcA",
  [
    "function setBaseUri(uint256 _tokenId, string memory _baseUri) public",
    "event Minted(address indexed minter, uint256 tokenId)",
  ],
  account
);

module.exports = nftContract;
