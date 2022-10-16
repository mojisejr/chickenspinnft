require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  // "https://rpc-testnet.bitkubchain.io"
  "https://rpc-mumbai.matic.today"
);
const wallet = new ethers.Wallet(process.env.wallet_key);
const account = wallet.connect(provider);

const nftContract = new ethers.Contract(
  process.env.nft_address,
  [
    "function setBaseUri(uint256 _tokenId, string memory _baseUri) public",
    "event Minted(address indexed minter, uint256 tokenId)",
  ],
  account
);

module.exports = nftContract;
