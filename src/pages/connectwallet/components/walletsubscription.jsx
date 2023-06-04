import React, { useState } from "react";
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
import Userdetailsnav from "../../../components/UserDetailsNav/userdetailsnav";
import dropdTokanIcon from "../../../assets/images/dropdtokanicon.svg";
import "../connectwallet.css";
import { useWallet } from "../../../context/wallet/WalletContext";
import { CLAIM_DRPD, PAY_SUBSCRIPTION } from "../../../axios/POST_API";
import { USER_VIEW_PROFILE } from "../../../axios/GET_API";
import { useSpinner } from "../../../context/loaderContext/globalSpinnerContext";
import { useHistory } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { claimDRPD } from "../../../web3/claim";
import { paySubscription } from "../../../web3/interactions";
function SubscriptionWallet({ setSliderPage }) {
  const { t, i18n } = useTranslation();
  const [popupVisiblity, setPopupVisiblity] = useState(false);
  const history = useHistory();
  const spinner = useSpinner();
  const { active, account, activate, deactivate, connector, library } =
    useWeb3React();
  const wallet = useWallet();
  const handleBack = () => {
    setSliderPage("connectedwallet");
  };

  const popupClaimed = async () => {
    setPopupVisiblity(true);
  };
  const handleClaimDRPD = async () => {
    spinner.setLoadingState(true);
    if (wallet?.selectedWallet == "DROPD") {
      const profileData = await USER_VIEW_PROFILE();
      await CLAIM_DRPD(profileData.data.did, (res) => {
        console.log("claim", res);
        setPopupVisiblity(true);
      });
    } else {
      await claimDRPD(window.ethereum, account);
    }
    spinner.setLoadingState(false);
  };
  const handlePaySubscription = async () => {
    spinner.setLoadingState(true);
    if (wallet?.selectedWallet == "DROPD") {
      const profileData = await USER_VIEW_PROFILE();
      await PAY_SUBSCRIPTION(profileData.data.did, (res) => {
        console.log("paid subscription", res);
        history.push("/timeline")
      });
    } else {
      await paySubscription(window.ethereum, account);
    }
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
        <div class="main-wrap">
          <div className="entry-wrap" style={{ marginTop: "0px" }}>
            <h1 className="page-title-big">Subscription</h1>
            <div className="page-desc">
              <p>
                10 DRPD per month subscription fee will be deducted from your
                wallet to access selected features
              </p>
            </div>
          </div>
          <div class="content-wrap">
            <div className="annual-sub-block">
              <span className="lbl">Monthly Subscription</span>

              <div className="sub-amount-wrap">
                <span>
                  {" "}
                  <img src={dropdTokanIcon} />
                  <span
                    style={{
                      fontSize: "32px",
                      lineHeight: "40px",
                      fontWeight: 600,
                      color: "#4E3292",
                    }}
                  >
                    10
                  </span>
                  <span> / Month</span>
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    lineHight: "16px",
                    fontWeight: "400",
                    color: "#C4C4C4",
                  }}
                >
                  Unlock multiple features
                </span>
              </div>
            </div>
            {popupVisiblity ? (
              ""
            ) : (
              <div className="claim-subscription-popup">
                <span>
                  Congratulations! As a joining bonus you have received 200 DRPD
                </span>
                <CustomButton onClick={handleClaimDRPD}>Claim</CustomButton>
              </div>
            )}
          </div>

          <div class="button-wrap">
            <CustomButton
              onClick={handlePaySubscription}
            >
              {t("proceed.1")}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionWallet;
