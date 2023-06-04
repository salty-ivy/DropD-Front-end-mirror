import Web3 from "web3";
import { DROPD_ABI } from "../abis/DROPD";
const DROPD_ADDRESS = "0xbc961AF9c006C9BE267b009e250eeB30bB079457";
const INTERACTIONS_ADDRESS = "0x2F3426B95CE0Daf450824Eb5808432e4Fb310258";

export const getDRPDBalance = async (address) => {
  const web3 = new Web3("https://rinkeby.infura.io/v3/249ade10d1654c31a077253a72842946");
  const drpd = new web3.eth.Contract(DROPD_ABI, DROPD_ADDRESS);
  const balance = await drpd.methods.balanceOf(address).call();
  console.log("balance", balance);
  return balance;
};

export const updateInteractionApproval = async (from) => {
  console.log("from", from);
  const web3 = new Web3(window.ethereum);
  const drpd = new web3.eth.Contract(DROPD_ABI, DROPD_ADDRESS);
  const receipt = await drpd.methods
    .approve(
      INTERACTIONS_ADDRESS,
      (1e26).toLocaleString("fullwide", { useGrouping: false })
    )
    .send({ from });
  console.log("balance", receipt);
  return receipt;
};
