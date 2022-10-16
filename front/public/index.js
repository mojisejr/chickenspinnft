const mintButton = document.querySelector(".btn-mint");
const connectButton = document.querySelector(".btn-connect");
const connectedWallet = document.querySelector(".connected-address");

let _ethereum;
let _provider;
let _signer;
let _address;
let _contract;

//Contracts
//https://mumbai.polygonscan.com/address/0xe5B8b548B98F924336aC64a8B747Db212a62cBcA#code
// const rpc = "https://rpc-testnet.bitkubchain.io";
const contractAddress = "0xd0419C6d90B589fb61977B9764C55adF60693F35";
const abi = ["function mint() public payable"];

//EVENTS
window.addEventListener("load", onPageLoad);
connectButton.addEventListener("click", onConnect);
mintButton.addEventListener("click", onMint);

//Handlers
async function onPageLoad() {
  if (window.ethereum !== undefined) {
    _ethereum = window.ethereum;
  }

  fetch("https://chickenspinnft-service.onrender.com/").then((result) => {
    console.log("result", result);
  });
  _provider = new ethers.providers.Web3Provider(_ethereum);
  const address = _signer === undefined ? false : _signer.getAddress();
  if (address) {
    connectedWallet.innerHTML = address;
    connectButton.setAttribute("style", "display:none");
    mintButton.setAttribute("style", "display:flex");
  } else {
    connectButton.setAttribute("style", "display:flex");
    mintButton.setAttribute("style", "display:none");
  }
}

async function onConnect() {
  await _provider.send("eth_requestAccounts", []);
  _signer = _provider.getSigner();
  _address = await _signer.getAddress();
  _contract = new ethers.Contract(contractAddress, abi, _signer);
  connectedWallet.innerHTML = _address;
  connectButton.setAttribute("style", "display:none");
  mintButton.setAttribute("style", "display:flex");
}

async function onMint() {
  const tx = await _contract.mint({
    value: ethers.utils.parseUnits("0.001", "ether"),
  });
  alert(`ไปดูไก่ที่ opensea ${tx.hash}`);
}
