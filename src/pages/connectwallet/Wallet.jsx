import React, { useEffect, useState } from "react";
import TimelineNav from "../../components/timelinenav/timelineNav";
import { useTranslation } from "react-i18next";
import avatar from "../../assets/images/avatar.jpeg";
import metaMaskIcon from "../../assets/images/metamask.svg";
import walletConnectIcon from "../../assets/images/walletconnect-circle-blue.svg";
import dropdlogo from "../../assets/images/dropdlogo.svg";
import { useHistory } from "react-router-dom";
import {
  // Web3ReactProvider,
  useWeb3React,
  // UnsupportedChainIdError,
} from "@web3-react/core";
import "./connectwallet.css";
import { injected, walletconnect } from "../../utils/connector";
import { Paper } from "@mui/material";
import Web3 from "web3";
import { claimDRPD } from "../../web3/claim";
import { getDRPDBalance } from "../../web3/drpd";
import { internationalNumberFormat } from "../../utils/numberFormat";
import { useWallet } from "../../context/wallet/WalletContext";
import { CLAIM_DRPD } from "../../axios/POST_API";
import { USER_VIEW_PROFILE } from "../../axios/GET_API";
import { useSpinner } from "../../context/loaderContext/globalSpinnerContext";
function ConnectWallet() {
  const history = useHistory();
  const spinner = useSpinner();
  const { active, account, activate, deactivate, connector, library } =
    useWeb3React();
  const wallet = useWallet();
  const [balance, setBalance] = useState(parseFloat(0));
  const [expected, setExpected] = useState(parseFloat(0));
  const getBalance = async () => {
    const web3 = new Web3("https://rinkeby.infura.io/v3/249ade10d1654c31a077253a72842946");
    let _address;
    if (wallet.selectedWallet == "DROPD") {
      _address = wallet.address;
    } else {
      _address = account;
    }
    console.log("fetching balance for ", _address);
    const _balance = await getDRPDBalance(_address);
    console.log("balance", balance);
    setBalance(_balance);
  };
  const handleClaimDRPD = async () => {
    spinner.setLoadingState(true)
    if (wallet?.selectedWallet == "DROPD") {
      const profileData = await USER_VIEW_PROFILE();
      await CLAIM_DRPD(profileData.data.did, (res) => {
        console.log("claim", res);
        getBalance();
      });
    } else {
      await claimDRPD(window.ethereum, account);
    }
    spinner.setLoadingState(false)
  };
  useEffect(() => {
    console.log(wallet);
    if (wallet?.selectedWallet == "DROPD") return;
    if (!active) {
      history.push("/connectwallet");
    }
  });
  useEffect(() => {
    if (active || wallet.selectedWallet == "DROPD") {
      getBalance();
    }
  }, [account, wallet]);
  return (
    <div className="page-page-wrapper">
      <div className="pnkbg">
        <TimelineNav />
      </div>

      <div className="inner-pages-container">
        <div class="half-pnk">
          <div className="inner-pages-container-wrap">
            <Paper
              className="balance"
              style={{ textAlign: "center", padding: "20px" }}
            >
              <span className="dropd-pink">Balance</span>
              <h1
                style={{
                  color: "#4E3292",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {internationalNumberFormat.format(
                  parseFloat(balance / 1e18).toFixed(2)
                )}
              </h1>
            </Paper>
          </div>
        </div>

        <div className="inner-pages-container-wrap">
          <div className="connect-wallet-container">
            <div className="transactions">
              <button
                onClick={() => {
                  history.push("/wallet/transactions");
                }}
              >
                <div className="tx-item-left dropd-purple">Transactions</div>
                <div className="tx-item-right dropd-purple">| |</div>
              </button>
            </div>
          </div>
          <div class="half-pnk full-pnk">
            <div className="inner-pages-container-wrap">
              <div style={{ color: "#46164D", fontSize: "1em" }}>
                My Expected Income
              </div>
              <h1
                style={{
                  color: "#4E3292",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {internationalNumberFormat.format(
                  parseFloat(expected / 1e18).toFixed(2)
                )}
              </h1>
              <div className="like-split">
                Likes <span className="dropd-pink">+</span> Time Spent ={" "}
                <span className="dropd-pink">DRPD</span>
              </div>
            </div>
          </div>
          <div className="claim">
            <button onClick={handleClaimDRPD}>
              <span style={{ color: "#46164D", fontSize: "1em" }}>
                Claim 200 DRPD
              </span>
            </button>
          </div>
          <div className="disconnect" style={{ display: "inline-block" }}>
            <div className="tx-item-left">
              Connected with{" "}
              {wallet.address.slice(0, 6) +
                "...." +
                wallet.address.slice(38, 42)}
            </div>
            <div className="tx-item-right">{wallet.selectedWallet}</div>
          </div>
          <div className="disconnect">
            <button
              onClick={() => {
                alert("sending subscribe transaction");
              }}
            >
              <span>Subscribe</span>
            </button>
          </div>
          <div className="disconnect">
            <button
              onClick={() => {
                alert(
                  "create popup to withdraw funds to a given address from dropd wallet"
                );
              }}
            >
              <span>Withdraw</span>
            </button>
          </div>
          <div className="disconnect">
            <button
              onClick={() => {
                wallet.setSelectedWallet("");
                deactivate();
              }}
            >
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;
