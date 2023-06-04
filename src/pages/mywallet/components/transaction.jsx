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

import claimDrpdIcon from "../../../assets/images/claimdrpdicon.svg"
import deductedDrpdIcon from "../../../assets/images/deducteddrpdicon.svg"

import transOutIcon from "../../../assets/images/transouticon.svg"
import transInIcon from "../../../assets/images/transinicon.svg"

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
        <TimelineNav />

        <div className="inner-pages-container">

          <div className="inner-pages-container-wrap">

            <h1 className="page-title">Transactions</h1>

            <div className="transaction-container">
              
              {/*Change in the the below block*/}
              <div className="transaction-row">
                <div className="trans-details-wrap">
                  <div className="trans-title"><span>Page like</span></div>
                  <div className="trans-date">02-04-2022 at 08:15</div>
                </div>
                <div className="trans-bal">
                  <span><img src={dropdTokanIcon} /></span>
                  <span>20</span>
                  <span><img src={transOutIcon} /></span>
                </div>
              </div>

              <div className="transaction-row">
                <div className="trans-details-wrap">
                  <div className="trans-title"><span>Claimed</span></div>
                  <div className="trans-date">02-04-2022 at 08:15</div>
                </div>

                <div className="trans-bal">
                  <span><img src={dropdTokanIcon} /></span>
                  <span>20</span>
                  <span><img src={transInIcon} /></span>
                </div>
              </div>

              <div className="transaction-row">
                <div className="trans-details-wrap">
                  <div className="trans-title"><span>Friend request</span></div>
                  <div className="trans-date">02-04-2022 at 08:15</div>
                </div>
                <div className="trans-bal">
                  <span><img src={dropdTokanIcon} /></span>
                  <span>20</span>
                  <span><img src={transOutIcon} /></span>
                </div>
              </div>

              <div className="transaction-row">
                <div className="trans-details-wrap">
                  <div className="trans-title"><span>Group Join</span></div>
                  <div className="trans-date">02-04-2022 at 08:15</div>
                </div>
                <div className="trans-bal">
                  <span><img src={dropdTokanIcon} /></span>
                  <span>20</span>
                  <span><img src={transInIcon} /></span>
                </div>
              </div>

              <div className="transaction-row">
                <div className="trans-details-wrap">
                  <div className="trans-title"><span>Claimed</span></div>
                  <div className="trans-date">02-04-2022 at 08:15</div>
                </div>
                <div className="trans-bal">
                  <span><img src={dropdTokanIcon} /></span>
                  <span>20</span>
                  <span><img src={transOutIcon} /></span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div> 
    );
}

export default MyWallet;
