import Web3 from "web3";
import { COMMUNITY_POOL_ABI } from "../abis/CommunityPool";
const COMMUNITY_POOL_ADDRESS = "0xCE8EBd64E25c15E4bAeEAcEdCC999b6F8e47074a";
export const claimDRPD = async (provider, from) => {
  const web3 = new Web3(window.ethereum);
  const communityPool = new web3.eth.Contract(
    COMMUNITY_POOL_ABI,
    COMMUNITY_POOL_ADDRESS
  );
  console.log("initiating send",from)
  const receipt = await communityPool.methods
    .claim(from, 1,( 200 * 1e18).toLocaleString('fullwide', {useGrouping:false}))
    .send({ from });
    
  return receipt;
};
