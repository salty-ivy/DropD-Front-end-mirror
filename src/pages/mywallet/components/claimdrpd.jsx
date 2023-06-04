import React, { useState } from 'react'
import CustomButton from '../../../components/Button/button'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import { useTranslation } from 'react-i18next';
import avatar from "../../../assets/images/avatar.jpeg"
import addIconWhite from "../../../assets/images/addiconwhite.svg"
import activateIcon from "../../../assets/images/activateicon.svg"
import swapIcon from "../../../assets/images/swapicon.svg"
import upIcon from "../../../assets/images/upicon.svg"
import infoIcon from "../../../assets/images/informationcircle.svg"
import dropdTokanIcon from "../../../assets/images/dropdtokanicon.svg"

import "../mywallet.css"

function MyWallet({setSliderPage}) {

  const changeToClaimDrpd = () =>{
    setSliderPage("claimdrpd");
  }
  const changeToTransaction = () =>{
    setSliderPage("transaction");
  }

  return(
      <div className='page-page-wrapper flics-page-container'>
        <div className="pnkbg">
          <TimelineNav />
        </div>

        <div className="inner-pages-container">

          <div class="half-pnk">
            <div className="inner-pages-container-wrap">
                <div style={{fontSize: "12px", fontWeight: "16px", fontWeight: "400", color: "#6A7587", textAlign: "center"}}>You are about the claim</div>
            </div>
          </div>

          <div className="inner-pages-container-wrap">
            <div class="flics-popup-conainer">
              <div className="balance">
                <span><img src={dropdTokanIcon} /></span>
                <span>130</span>
              </div>

              <div className="reward-claimed-wrap">
                <div className="r-c-lbl">Total Earning</div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div className="this-month">
                    <div className="r-c-lbl">This Month</div>
                    <div className="balance">
                      <span><img src={dropdTokanIcon} /></span>
                      <span style={{fontSize: "20px", lineHeight: "28px"}}>87</span>
                    </div>
                  </div>

                  <div className="overall">
                    <div className="r-c-lbl">Overall</div>
                    <div className="balance">
                      <span><img src={dropdTokanIcon} /></span>
                      <span style={{fontSize: "20px", lineHeight: "28px"}}>1,276</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="button-wrap">
            <CustomButton>Claim</CustomButton>
          </div>

        </div>
      </div> 
    );
}

export default MyWallet;
