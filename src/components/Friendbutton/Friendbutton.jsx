import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { USER_VIEW_PROFILE } from "../../axios/GET_API";
import { FRIEND_REQUEST, GET_ACCOUNT, MANAGED_CANCEL_REQUEST, MANAGED_REJECT_REQUEST } from "../../axios/POST_API";
import {
  ACCEPT_FRIEND_REQUEST,
  MANAGED_SEND_GIFT,
  MANAGED_CLAIM_GIFT,
} from "../../axios/POST_API";
import { REJECT_FRIEND_REQUEST } from "../../axios/POST_API";
import { useSpinner } from "../../context/loaderContext/globalSpinnerContext";
import { useWallet } from "../../context/wallet/WalletContext";
import { sendGift, claimGift } from "../../web3/interactions";
import CustomButton from "../../components/Button/button";
import rejectfriend from "../../assets/images/rejectfriend.svg"
import "./FriendButton.css"
function Friendbutton({
  did,
  is_friend,
  is_friend_requested_to,
  is_friend_requested_from,
}) {
  const [open, setOpen] = useState(false);
  const [friendToggle, setFriendToggle] = useState(false);
  const [addFriendToggle, setAddFriendToggle] = useState(false);
  const { account, active, activate } = useWeb3React();
  const wallet = useWallet();
  const spinner = useSpinner();
  console.log(
    did,
    is_friend,
    is_friend_requested_to,
    is_friend_requested_from,
    "did in button"
  );

  const handleAddFriendRequest = async () => {
    try {
      spinner.setLoadingState(true);
      const to = await GET_ACCOUNT(did, (err) => {
        throw err
      });
      console.log("sending to", to);
      if (wallet.selectedWallet == "DROPD") {
        const profileData = await USER_VIEW_PROFILE();
        await MANAGED_SEND_GIFT(profileData.data.did, to);
      } else {
        await sendGift(to, account);
      }
      FRIEND_REQUEST(did, true);
      setOpen(false)
      setFriendToggle(true);
      spinner.setLoadingState(false);
    } catch (error) {
      alert(error)
      console.log(error);
      alert(error)
      spinner.setLoadingState(false);
    } finally {
      setOpen(false)
    }
  };
  // useEffect(() => {
  //   activate(window.ethereum);
  // }, []);
  useEffect(() => {
    wallet.setSelectedWallet("DROPD");
  }, []);

  const handleAcceptFriendRequest = async () => {
    try {
      spinner.setLoadingState(true);
      const from = await GET_ACCOUNT(did);
      if (wallet.selectedWallet == "DROPD") {
        const profileData = await USER_VIEW_PROFILE();
        await MANAGED_CLAIM_GIFT(profileData.data.did, from);
      } else {
        await claimGift(from, account);
      }
      ACCEPT_FRIEND_REQUEST(did);
      setAddFriendToggle(true);
      spinner.setLoadingState(false);
    } catch (error) {
      alert(error)
      console.log(error);
      alert(error)
      spinner.setLoadingState(false);
    }
    finally {
      setOpen(false)
    }
  };

  const handleRejectFriendRequest = async () => {
    try {
      spinner.setLoadingState(true);
      const from = await GET_ACCOUNT(did);
      if (wallet.selectedWallet == "DROPD") {
        const profileData = await USER_VIEW_PROFILE();
        await MANAGED_REJECT_REQUEST(profileData.data.did, from);
      } else {
        const from = GET_ACCOUNT(did);
        await claimGift(from, account);
      }
      REJECT_FRIEND_REQUEST(did);
      spinner.setLoadingState(false);
    } catch (error) {
      alert(error)
      console.log(error);
      spinner.setLoadingState(false);
    }
  };
  const handleCancelFriendRequest = async () => {
    try {
      spinner.setLoadingState(true);
      const to = await GET_ACCOUNT(did);
      console.log("sending to", to);
      if (wallet.selectedWallet == "DROPD") {
        const profileData = await USER_VIEW_PROFILE();
        await MANAGED_CANCEL_REQUEST(profileData.data.did, to);
        await FRIEND_REQUEST(did, false);
        console.log("cancelled request")
        setFriendToggle(false);

      } else {
        //TODO finish this up
        // const from = GET_ACCOUNT(did);
        // await claimGift(from, account);
      }
      spinner.setLoadingState(false);
    } catch (error) {
      alert(error)
      console.log(error);
      spinner.setLoadingState(false);
    } finally {
      setOpen(false) //TODO find why gift popup is coming up
    }
  };

  const printFriendButton = () => {
    if (is_friend == true || addFriendToggle == true) {
      return <button className="add-friend-button">Friends</button>;
    } else if (is_friend_requested_to == true || friendToggle == true) {
      return (
        <button
        id="cursor"
          onClick={handleCancelFriendRequest}
          className="add-friend-button"
        >
          Cancel
        </button>
      );
    } else if (is_friend_requested_from == true) {
      return (
        <div style={{ display: 'flex' }}>
          <div><button
          id="cursor"
            onClick={handleAcceptFriendRequest}
            className="add-friend-button"
          >
            Accept
          </button></div>
          <div>
            <img id="cursor" style={{ position: 'relative', top: '15px', right: '5px' }}
              alt="img"
              src={rejectfriend}
              onClick={handleRejectFriendRequest}
            /></div>


        </div>
      );
    } else {
      return (
        <>
          {open ? (
            <div className="add-friend-popup-wrapper">
            <div className="add-friend-popup">
              <span>
                10 DRPD will be <br/> sent as a gift to this person
              </span>
              <CustomButton style={{ width: "50%" }} onClick={handleAddFriendRequest}>Send Request</CustomButton>
              <div style={{marginTop:'15px'}}><CustomButton style={{ width: "50%" }} onClick={() => setOpen(false)}>Cancel</CustomButton></div>
            </div>
            </div>
          ) : (
            ""
          )}
          
          <button id="cursor" onClick={() => setOpen(true)} className="add-friend-button">
            Add Friend
          </button>
          </>
      );
    }
  };

  return <div>{printFriendButton()}</div>;
}

export default Friendbutton;
