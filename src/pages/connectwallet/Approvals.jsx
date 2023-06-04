import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { USER_VIEW_PROFILE } from "../../axios/GET_API";
import TimelineNav from "../../components/timelinenav/timelineNav";
import { CREATE_ACCOUNT } from "../../axios/POST_API";
import { useHistory } from "react-router-dom";
import { useWallet } from "../../context/wallet/WalletContext";
import { updateInteractionApproval } from "../../web3/drpd";
import { useWeb3React } from "@web3-react/core";
import { Switch } from "@mui/material";
import { injected } from "../../utils/connector";
function WalletApprovals() {
  const wallet = useWallet();
  const history = useHistory();
  const { active, account, activate } = useWeb3React();
  const handleCreateAccount = async () => {
    const details = await USER_VIEW_PROFILE();
    const { did } = details.data;
    const res = await CREATE_ACCOUNT(did, (response) => {
      wallet.setAddress(response.data.address);
      history.push("/wallet");
    });
  };
  const handleToggle = () => {
    activate(injected);
    // updateInteractionApproval(account);
  };
  useEffect(() => {
    if (active) {
      updateInteractionApproval(account);
    }
  }, [account]);
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
          Please setup these approvals
        </span>
        <div className="tx-container">
          Interactions <Switch onChange={handleToggle} />
        </div>
      </div>
    </div>
  );
}

export default WalletApprovals;
