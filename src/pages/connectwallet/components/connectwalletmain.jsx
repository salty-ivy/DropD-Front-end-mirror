import React, { useState } from "react";
import TimelineNav from "../../../components/timelinenav/timelineNav";
import { useTranslation } from "react-i18next";
import avatar from "../../../assets/images/avatar.jpeg";
import metaMaskIcon from "../../../assets/images/metamask.svg";
import walletConnectIcon from "../../../assets/images/walletconnecticon.svg";
import binanceIcon from "../../../assets/images/binance.svg";
import dropDwalletIcon from "../../../assets/images/dropdwalleticon.svg";
import leftarrow from "../../../assets/images/leftarrow.svg";
import logo from "../../../assets/images/dropdsmall.svg";
import CustomButton from "../../../components/Button/button";
import "../connectwallet.css";
import { injected, walletconnect } from "../../../utils/connector";
import { useHistory } from "react-router-dom";
import { USER_VIEW_PROFILE } from "../../../axios/GET_API";
import { GET_ACCOUNT,CREATE_ACCOUNT } from "../../../axios/POST_API";
import { useSpinner } from "../../../context/loaderContext/globalSpinnerContext";
import {
  // Web3ReactProvider,
  useWeb3React,
  // UnsupportedChainIdError,
} from "@web3-react/core";
import { useWallet } from "../../../context/wallet/WalletContext";
function ConnectWalletDropd({ setSliderPage }) {
  const { active, account, activate, deactivate, connector, library } =
    useWeb3React();
  const spinner = useSpinner();
  const history = useHistory();
  const wallet = useWallet();
  const handleBack = () => {
    setSliderPage("connectedwallet");
  };
  const handleCreateAccount = async (did) => {
    spinner.setLoadingState(true);
    await CREATE_ACCOUNT(did, (address) => {
      console.log("wallet creation response",address);
      wallet.setAddress(address);
      wallet.setSelectedWallet("DROPD");
      spinner.setLoadingState(false);
      setSliderPage("connectedwallet");
    });
    spinner.setLoadingState(false);
  };

  return (
    <div
      style={{ width: "100vw",backgroundColor:'#E1D7F0' }}
      className="page-page-wrapper connect-wallet-screen"
    >
      <div className="navbar-wrapper">
        <div
          onClick={handleBack}
          style={{ position: "relative", top: "20px", left: "15px" }}
        >
          <img src={leftarrow} alt="back" />
        </div>
        <div style={{ width: "auto" }}>
          <img
            style={{ position: "relative", left: "30px", top: "12px" }}
            id="dropd-logo"
            src={logo}
            alt="dropd-logo"
          />
        </div>
      </div>

      <div className="inner-pages-container-wrap">
        <h1 className="page-title-big">Wallet Connect</h1>

        <div class="page-desc">
          <p>
            Connect with one of our available wallet providers or create a new
            one (wallet creation can take from 1 to 10 minutes).
          </p>
        </div>

        <div className="connect-wallet-container">
          <div className="wallet-options">
            <span className="wallet-connect-lbl">Connect</span>
            <button
              onClick={async () => {
                spinner.setLoadingState(true);
                await activate(injected);
                wallet.setSelectedWallet("Metamask");
                setSliderPage("connectedwallet");
                spinner.setLoadingState(false);
              }}
            >
              <span className="wallet-option-icon">
                <img src={metaMaskIcon} alt="metamask" />
              </span>
              <span>Metamask</span>
            </button>
            <button
              onClick={() => {
                spinner.setLoadingState(false);
                activate(walletconnect);
                wallet.setSelectedWallet("WalletConnect");
                setSliderPage("connectedwallet");
              }}
            >
              <span className="wallet-option-icon">
                <img src={walletConnectIcon} alt="metamask" />
              </span>
              <span>WalletConnect</span>
            </button>

            <span className="wallet-connect-lbl">Or Create</span>
            <button
              onClick={async () => {
                spinner.setLoadingState(true);
                const profileData = await USER_VIEW_PROFILE();
                console.log("profileData", profileData);
                const address = await GET_ACCOUNT(profileData.data.did, () => {
                  return false;
                });
                if (address) {
                  wallet.setSelectedWallet("DROPD");
                  wallet.setAddress(address);
                  spinner.setLoadingState(false);
                  setSliderPage("connectedwallet");
                } else {
                  console.log("redirecting to wallet create");
                  
                  await handleCreateAccount(profileData.data.did);
                  spinner.setLoadingState(false);
                  //TODO call wallet create api
                }
              }}
            >
              <span className="wallet-option-icon">
                <img src={dropDwalletIcon} alt="metamask" />
              </span>
              <span>DropD Wallet</span>
            </button>
          </div>
        </div>
        <div class="button-wrap">
          <CustomButton
            onClick={() => {
              setSliderPage("connectedwallet");
            }}
          >
            Proceed
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default ConnectWalletDropd;
