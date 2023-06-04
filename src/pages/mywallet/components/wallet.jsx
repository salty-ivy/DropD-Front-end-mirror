import React, { useState, useEffect } from "react";
import TimelineNav from "../../../components/timelinenav/timelineNav";
import { useTranslation } from "react-i18next";
import avatar from "../../../assets/images/avatar.jpeg";
import addIconWhite from "../../../assets/images/addiconwhite.svg";
import activateIcon from "../../../assets/images/activateicon.svg";
import swapIcon from "../../../assets/images/swapicon.svg";
import upIcon from "../../../assets/images/upicon.svg";
import infoIcon from "../../../assets/images/informationcircle.svg";
import dropdTokanIcon from "../../../assets/images/dropdtokanicon.svg";
import dropdCircle from "../../../assets/images/dropdcircle.svg";
import incomeGiver from "../../../assets/images/incomegiver.svg";
import tickCircleIcon from "../../../assets/images/tickcircle.svg";
import unlockIcon from "../../../assets/images/unlockicon.svg";
import lockIcon from "../../../assets/images/lockicon.svg";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import "../mywallet.css";
import Web3 from "web3";
import { claimDRPD } from "../../../web3/claim";
import { getDRPDBalance } from "../../../web3/drpd";
import { internationalNumberFormat } from "../../../utils/numberFormat";
import { useWallet } from "../../../context/wallet/WalletContext";
import { CLAIM_DRPD, GET_ACCOUNT } from "../../../axios/POST_API";
import { USER_VIEW_PROFILE } from "../../../axios/GET_API";
import { useSpinner } from "../../../context/loaderContext/globalSpinnerContext";


function Wallet({ setSliderPage }) {
  const history = useHistory();
  const spinner = useSpinner();
  const { active, account, activate, deactivate, connector, library } =
    useWeb3React();
  const wallet = useWallet();
  const [balance, setBalance] = useState(parseFloat(0));
  const [expected, setExpected] = useState(parseFloat(0));
  const getBalance = async () => {
    const web3 = new Web3(
      "https://rinkeby.infura.io/v3/249ade10d1654c31a077253a72842946"
    );
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
    spinner.setLoadingState(true);
    if (wallet?.selectedWallet == "DROPD") {
      const profileData = await USER_VIEW_PROFILE();
      await CLAIM_DRPD(profileData.data.did, (res) => {
        console.log("claim", res);
        getBalance();
      });
    } else {
      await claimDRPD(window.ethereum, account);
    }
    spinner.setLoadingState(false);
  };
  const update = async ()=>{
    if (wallet?.selectedWallet == "DROPD") {
      const profileData = await USER_VIEW_PROFILE();
      const _address = await GET_ACCOUNT(profileData.data.did,(err)=>{
        alert(err)
      })
      wallet.setAddress(_address);
      getBalance();
      return
    };
  }
  useEffect(() => {
    console.log(wallet);
    update()
    if (!active&&wallet?.selectedWallet != "DROPD") {
      history.push("/connectwallet");
    }
    getBalance();
  },[]);
  useEffect(() => {
    if (active || wallet.selectedWallet == "DROPD") {
      getBalance();
    }
  }, [account, wallet]);

  const changeToClaimDrpd = () => {
    setSliderPage("claimdrpd");
  };
  const changeToTransaction = () => {
    setSliderPage("transaction");
  };

  return (
    <div className="page-page-wrapper flics-page-container">
      <div className="pnkbg">
        <TimelineNav />
      </div>

      <div className="inner-pages-container">
        <div class="half-pnk">
          <div className="inner-pages-container-wrap">
            <h1 className="page-title">My Wallet</h1>
          </div>
        </div>

        <div className="inner-pages-container-wrap">
          <div class="wallet-popup-conainer">
            <div className="add-drpd-btn-wrap">
              <span>Balance</span>
              <span className="add-drpd-btn">
                <span className="plus-icon">
                  <img src={addIconWhite} />
                </span>
                Add DRPD
              </span>
            </div>

            <div className="balance">
              <span>
                <img src={dropdTokanIcon} />
              </span>
              <span>
                {internationalNumberFormat.format(
                  parseFloat(balance / 1e18).toFixed(2)
                )}
              </span>
            </div>
          </div>

          {/* <div className="drpd-reward-container">
                <span className="r-title">DRPD Reward</span>
                <div className="drpd-reward-wrap">
                  <div className="reward-claimed">
                    <span>50 DRPD</span>
                    <span className="r-c-icon"><img src={tickCircleIcon}/></span>
                  </div>
                  <div className="reward-unlocked">
                    <span>50 DRPD</span>
                    <span className="r-c-icon"><img src={unlockIcon} /></span>
                  </div>
                  <div className="reward-locked">
                    <span>50 DRPD</span>
                    <span className="r-c-icon"><img src={lockIcon} /></span>
                  </div>
                  <div className="reward-locked">
                    <span>50 DRPD</span>
                    <span className="r-c-icon"><img src={lockIcon} /></span>
                  </div>
                </div>
              </div> */}

          {/* <div className="wallet-tabs-container">
                <button className="claimDrpd" onClick={changeToClaimDrpd} >
                  <span>
                    <span className="pt-14">Claim DRPD</span>
                    <span><span className="pt-12">50 DRPD</span> available, claim anytime</span>
                  </span> 
                  <span className="tab-icon"><img src={dropdCircle}/></span>
                </button>
                <button className="transaction" onClick={changeToTransaction} ><span>Transactions</span> <span className="tab-icon"><img src={swapIcon}/></span></button>
              </div> */}

          <div className="income-card-container">
            <div class="income-popup-conainer">
              <div className="add-drpd-btn-wrap">
                <span>My Expected Income</span>
                <span></span>
              </div>

              <div className="balance">
                <span>
                  <img src={dropdTokanIcon} />
                </span>
                <span>773</span>
              </div>

              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: "#6A7587",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                <span>this month</span>
              </div>

              <div className="income-formula">
                <span>Likes</span>
                <span className="txt-blue sign">+</span>
                <span>Time Spent</span>
                <span className="txt-blue sign">=</span>
                <span style={{ marginRight: "10px" }}>
                  <img src={dropdTokanIcon} />
                </span>
                <span className="txt-blue">773</span>
              </div>
            </div>

            <div className="wallet-monthly-table">
              <table>
                <tbody>
                  <tr style={{ backgroundColor: "#ffffff" }}>
                    <th colspan="3">This month</th>
                    <th>Avg. Unit value</th>
                    <th>Total</th>
                  </tr>
                  <tr style={{ backgroundColor: "#FAF3FF" }}>
                    <td className="lbl">Likes</td>
                    <td className="val">256</td>
                    <td className="lbl">x</td>
                    <td className="val">0.5</td>
                    <td className="total">128</td>
                  </tr>
                  <tr style={{ backgroundColor: "#FAF3FF" }}>
                    <td className="lbl">Time Spent</td>
                    <td className="val">860 mins</td>
                    <td className="lbl">x</td>
                    <td className="val">0.75</td>
                    <td className="total">645</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                backgroundColor: "#ffffff",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <span
                style={{ fontSize: 14, lineHeight: "20px", color: "#46164D" }}
              >
                Expected Income
              </span>
              <span
                style={{
                  fontSize: 14,
                  lineHeight: "16px",
                  fontWeight: "600",
                  display: "flex",
                  flexDirction: "row",
                }}
              >
                <img
                  style={{
                    width: "12px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginRight: "10px",
                  }}
                  src={dropdTokanIcon}
                />
                <span style={{ marginTop: "auto", marginBottom: "auto" }}>
                  773
                </span>
              </span>
            </div>
            <div className="monthly-income-wrp">
              <span>
                <img src={incomeGiver} />
              </span>
              <span>
                <span className="lbl">Feb</span>
                <span>
                  <img src={dropdTokanIcon} />
                  356
                </span>
              </span>
              <span>
                <span className="lbl">Mar</span>
                <span>
                  <img src={dropdTokanIcon} />
                  432
                </span>
              </span>
              <span>
                <span className="lbl">Apr</span>
                <span>
                  <img src={dropdTokanIcon} />
                  863
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
