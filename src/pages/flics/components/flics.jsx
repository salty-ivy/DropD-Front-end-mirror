import React, { useState } from 'react'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import { useTranslation } from 'react-i18next';
import avatar from "../../../assets/images/avatar.jpeg"
import addIconWhite from "../../../assets/images/addiconwhite.svg"
import activateIcon from "../../../assets/images/activateicon.svg"
import swapIcon from "../../../assets/images/swapicon.svg"
import upIcon from "../../../assets/images/upicon.svg"
import infoIcon from "../../../assets/images/informationcircle.svg"
import dropdTokanIcon from "../../../assets/images/dropdtokanicon.svg"

import "../flics.css"

function Flics({setSliderPage}) {

  const changeToActivateFlics = () =>{
    setSliderPage("activateflics");
  }
  const changeToBuyDrpd = () =>{
    setSliderPage("buydrpd");
  }
  const changeToConnectWallet = () =>{
    setSliderPage("connectwallet");
  }
  const changeToDeleteFlics = () =>{
    setSliderPage("deleteflics");
  }
  const changeToDeployedFlics = () =>{
    setSliderPage("flicsmain");
  }
  const changeToFlicsMain = () =>{
    setSliderPage("flicsmain");
  }
  const changeToFlicsHistory = () =>{
    setSliderPage("flicshistory");
  }
  const changeToSharedFlics = () =>{
    setSliderPage("sharedflics");
  }
  const changeToShareFlics = () =>{
    setSliderPage("shareflics");
  }


  return(
      <div className='page-page-wrapper flics-page-container'>
        <div className="pnkbg">
          <TimelineNav />
        </div>

        <div className="inner-pages-container">

          <div class="half-pnk">
            <div className="inner-pages-container-wrap">
                <h1 className="page-title">FLICS</h1>
                <div className="flics-wallet-balance">Wallet Balance <span><img src={dropdTokanIcon} />10,000</span></div>
            </div>
          </div>

          <div className="inner-pages-container-wrap">
              <div class="flics-popup-conainer">
                
                <div className="add-drpd-btn-wrap">
                  <span>Active</span>
                  <span className="add-drpd-btn" onClick={changeToBuyDrpd}>
                    <span className="plus-icon"><img src={addIconWhite} /></span>
                    Add DRPD
                  </span>
                </div>

                <div className="balance">
                  <span><img src={dropdTokanIcon} /></span>
                  <span>100,000</span>
                </div>

                <div className="lock-in">Lock in 45/90 days</div>

                <div className="info-banner">
                  <span>Deployed <span className="deployed-drpd">400,000</span></span>
                  <span>150/180 days</span>
                </div>
              </div>

              <div className="flics-tabs-container">
                <div className="flics-options">
                  <button onClick={changeToActivateFlics} ><span>Activate FLICS</span> <span className="tab-icon"><img src={activateIcon}/></span></button>
                  <button onClick={changeToShareFlics}><span>Share FLICS</span> <span className="tab-icon"><img src={swapIcon}/></span></button>
                  <button onClick={changeToFlicsHistory}><span>FLICS History</span> <span className="tab-icon"><img src={upIcon}/></span></button>
                  <button><span>Know your FLICS</span> <span className="tab-icon"><img src={infoIcon}/></span></button>
                </div>

              </div>
            </div>

        </div>
      </div> 
    );
}

export default Flics;
