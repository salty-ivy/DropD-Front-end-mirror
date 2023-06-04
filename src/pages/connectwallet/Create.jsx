import { Button } from "@mui/material";
import React from "react";
import { USER_VIEW_PROFILE } from "../../axios/GET_API";
import TimelineNav from "../../components/timelinenav/timelineNav";
import { CREATE_ACCOUNT } from "../../axios/POST_API";
import { useHistory } from "react-router-dom";
import { useWallet } from "../../context/wallet/WalletContext";
import { useSpinner } from "../../context/loaderContext/globalSpinnerContext";
function CreateWallet() {
  const wallet = useWallet();
  const history = useHistory();
  const spinner = useSpinner();
  const handleCreateAccount = async () => {
    spinner.setLoadingState(true);
    const details = await USER_VIEW_PROFILE();
    const { did } = details.data;
    const res = await CREATE_ACCOUNT(did, (response) => {
      console.log(res);
      wallet.setAddress(res);
      wallet.setSelectedWallet("DROPD");
      spinner.setLoadingState(false);
      history.push("/wallet");
    });
    spinner.setLoadingState(false);
  };
  return (
    <div className="page-page-wrapper">
      <TimelineNav />
      <div className="inner-pages-container">
        <span
          className="dropd-purple"
          style={{
            width: "100%",
            textAlign: "left",
            marginTop: "10px",
            marginLeft: "10px",
          }}
        >
          You don't have an wallet with us
        </span>
        <div className="tx-container">
          <Button type="outlined" onClick={handleCreateAccount}>
            Create Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
