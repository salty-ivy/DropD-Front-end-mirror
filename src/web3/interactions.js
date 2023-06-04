import Web3 from "web3";
import { INTERACTIONS_ABI } from "../abis/DROPD_INTERACTIONS";
const INTERACTIONS_ADDRESS = "0x2F3426B95CE0Daf450824Eb5808432e4Fb310258";

export const sendGift = async (to, account) => {
  console.log("to", to);
  const web3 = new Web3(window.ethereum);
  const interactions = new web3.eth.Contract(
    INTERACTIONS_ABI,
    INTERACTIONS_ADDRESS
  );
  const receipt = await interactions.methods
    .sendGift(to)
    .send({ from: account });
  console.log("receipt", receipt);
  return receipt;
};
export const claimGift = async (from, account) => {
  const web3 = new Web3(window.ethereum);
  const interactions = new web3.eth.Contract(
    INTERACTIONS_ABI,
    INTERACTIONS_ADDRESS
  );
  const receipt = await interactions.methods
    .claimGift(from)
    .send({ from: account });
  console.log("receipt", receipt);
  return receipt;
};

export const paySubscription = async ( provider,account) => {
  const web3 = new Web3(window.ethereum);
  const interactions = new web3.eth.Contract(
    INTERACTIONS_ABI,
    INTERACTIONS_ADDRESS
  );
  const receipt = await interactions.methods
    .paySubscriptionFee()
    .send({ from: account });
  console.log("receipt", receipt);
  return receipt;
};
