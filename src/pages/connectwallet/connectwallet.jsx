import React, { useEffect, useState } from "react";
import TimelineNav from "../../components/timelinenav/timelineNav";
import { useTranslation } from "react-i18next";
import avatar from "../../assets/images/avatar.jpeg";
import metaMaskIcon from "../../assets/images/metamask.svg";
import walletConnectIcon from "../../assets/images/walletconnect-circle-blue.svg";
import dropdlogo from "../../assets/images/dropdlogo.svg";
import {
  // Web3ReactProvider,
  useWeb3React,
  // UnsupportedChainIdError,
} from "@web3-react/core";
import { useWallet } from "../../context/wallet/WalletContext";
import "./connectwallet.css";
import { injected, walletconnect } from "../../utils/connector";
import { useHistory } from "react-router-dom";
import { USER_VIEW_PROFILE } from "../../axios/GET_API";
import { GET_ACCOUNT } from "../../axios/POST_API";
import { useSpinner } from "../../context/loaderContext/globalSpinnerContext";
function ConnectWallet() {
  const history = useHistory();
  const spinner = useSpinner();
  const { active, account, activate, deactivate, connector, library } =
    useWeb3React();
  const wallet = useWallet();
  useEffect(() => {
    if (active || wallet.selectedWallet == "DROPD") {
      if (wallet.selectedWallet !== "DROPD") {
        wallet.setAddress(account);
      }
      history.push("/wallet");
    }
  }, [active]);
  return (
    <div className="page-page-wrapper">
      <div className="pnkbg">
        <TimelineNav />
      </div>

      <div className="inner-pages-container">
        <div class="half-pnk">
          <div className="inner-pages-container-wrap">
            <h1 className="page-title">Connect Your Wallet</h1>

            <div class="page-desc">
              <p>
                Connect with one of our available wallet providers or create a
                new one.
              </p>
            </div>
          </div>
        </div>

        <div className="inner-pages-container-wrap">
          <div className="connect-wallet-container">
            <div className="wallet-options">
              <button
                onClick={() => {
                  activate(injected);
                  wallet.setSelectedWallet("Metamask");
                }}
              >
                <span className="wallet-option-icon">
                  <img src={metaMaskIcon} alt="metamask" />
                </span>
                <span>Metamask</span>
              </button>
              <button
                onClick={() => {
                  activate(walletconnect);
                  wallet.setSelectedWallet("WalletConnect");
                }}
              >
                <span className="wallet-option-icon">
                  <img src={walletConnectIcon} alt="metamask" />
                </span>
                <span>WalletConnect</span>
              </button>
              <p style={{ textAlign: "center" }}>OR</p>
              <button
                onClick={async () => {
                  spinner.setLoadingState(true);
                  const profileData = await USER_VIEW_PROFILE();
                  console.log("profileData", profileData);
                  const address = await GET_ACCOUNT(
                    profileData.data.did,
                    () => {
                      console.log("redirecting to wallet create");
                      history.push("/wallet/create");
                      spinner.setLoadingState(false);
                      return;
                    }
                  );
                  if (address) {
                    wallet.setSelectedWallet("DROPD");
                    wallet.setAddress(address);

                    history.push("/wallet");
                    spinner.setLoadingState(false);
                  }
                }}
              >
                <span className="wallet-option-icon">
                  <img src={dropdlogo} alt="metamask" />
                </span>
                <span>Use DROPD wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectWallet;
