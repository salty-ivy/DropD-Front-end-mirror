import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/Button/button";
import TimelineNav from "../../../components/timelinenav/timelineNav";
import { useTranslation } from "react-i18next";
import avatar from "../../../assets/images/avatar.jpeg";
import metaMaskIcon from "../../../assets/images/metamask.svg";
import walletConnectIcon from "../../../assets/images/walletconnecticon.svg";
import binanceIcon from "../../../assets/images/binance.svg";
import dropDwalletIcon from "../../../assets/images/dropdwalleticon.svg";
import leftarrow from "../../../assets/images/leftarrow.svg";
import logo from "../../../assets/images/dropdsmall.svg";
import "../connectwallet.css";
import { useWeb3React } from "@web3-react/core";
import { useWallet } from "../../../context/wallet/WalletContext";
function ConnectedWallet({ setSliderPage }) {
  const [address, setAddress] = useState("");
  const { t, i18n } = useTranslation();
  const wallet = useWallet();

  const handleBack = () => {
    setSliderPage("walletconnect");
  };
  const { account, active } = useWeb3React();
  useEffect(() => {
    if (wallet.selectedWallet === "DROPD") {
      setAddress(wallet.address);
    } else {
      setAddress(account);
    }
  });

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
        <div class="main-wrap">
          <div className="entry-wrap">
            <h1 className="page-title-big">Wallet Connected</h1>
          </div>
          <div class="content-wrap">
            <div className="wallet-congo-message">
              Congratulation <br /> You have successfully created your DropD
              Wallet <br />
              {address.slice(0, 6) + "..." + address.slice(-4)}
            </div>
          </div>

          <div class="button-wrap">
            <CustomButton
              onClick={() => {
                setSliderPage("subscription");
              }}
            >
              {t("proceed.1")}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectedWallet;
