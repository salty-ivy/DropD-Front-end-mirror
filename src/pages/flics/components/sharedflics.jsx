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
import watchIcon from "../../../assets/images/watchicon.svg"
import connectionIcon from "../../../assets/images/connectionicon.svg"

import "../flics.css"

function SharedFlics({setSliderPage}) {

  return(
      <div className='page-page-wrapper flics-page-container'>
        <div className="pnkbg">
          <TimelineNav />
        </div>

        <div className="inner-pages-container">

          <div class="half-pnk">
            <div className="inner-pages-container-wrap">
                <h1 className="page-title">Shared FLICS</h1>
            </div>
          </div>

          <div className="inner-pages-container-wrap flics-details">
              <div class="flics-popup-conainer">
                
                <div className="row shared-flics-between">
                  <span class="user-details">
                    <span className="img-circle"><img src={avatar} /></span>
                    <span className="user-name">You</span>
                  </span>

                  <span className="connection-icon"><img src={connectionIcon} /></span>

                  <span class="user-details">
                    <span className="img-circle"><img src={avatar} /></span>
                    <span className="user-name">Humming Bird</span>
                  </span>
                </div>
                <div className="row">
                  <span className="lbl-12">FLICS ID</span>
                  <span className="flics-h-info">DRP00563798</span>
                </div>
                <div className="row">
                  <span className="lbl-12">Amount:</span>
                  <span className="shared-flics flics-his-drpd"><img src={dropdTokanIcon} />10,000</span>
                </div>
                <div className="row">
                  <span className="lbl-12">Activated on:</span>
                  <span className="flics-h-info">12-03-2022  |  12:45 pm</span>
                </div>
                <div className="row">
                  <span className="lbl-12">Ended on: </span>
                  <span className="flics-h-info">11-04-2022  |  12:44 pm</span>
                </div>
                <div className="row">
                  <span className="lbl-12" style={{textAlign: 'center'}}><img src={watchIcon} /></span>
                  <span><span style={{fontSize: '20px', lineHeight: '32px', fontWeight: '600', color: '#4E3292'}}>180/</span> 180 Days </span>
                </div>
                <div className="row">
                  <span className="lbl-12">Status</span>
                  <span className="flics-h-info">Successful</span>
                </div>

                <div className="row signed-row">
                  <span className="signed"><span>Signed by</span> You</span>
                  <span className="signed-pending"><span>Pending from</span> Humming Bird</span>
                </div>

                <div className="row">
                  <div className="flics-h-info">Automatic Withdraw after:</div>
                </div>

                <div style={{fontSize: '12px', lineHeight: '16px', fontWeight: '600', textAlign: 'center', marginTop: '30px'}}>DRP00563798</div>
              </div>

            </div>

        </div>
      </div> 
    );
}

export default SharedFlics;
