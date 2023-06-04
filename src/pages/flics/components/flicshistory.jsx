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

function FlicsHistory({setSliderPage}) {

  return(
      <div className='page-page-wrapper flics-page-container flics-history'>
        <div className="pnkbg">
          <TimelineNav />
        </div>

        <div className="inner-pages-container">

          <div class="half-pnk">
            <div className="inner-pages-container-wrap">
                <h1 className="page-title">FLICS History</h1>
            </div>
          </div>

          <div className="inner-pages-container-wrap flics-details">
              <div class="flics-popup-conainer">
                <div className="row">
                  <span className="lbl-12">With</span>
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
                  <span className="flics-his-drpd"><img src={dropdTokanIcon} />10,000</span>
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
                  <span className="lbl-12">Status</span>
                  <span className="flics-h-info">Terminated in 35 days</span>
                </div>
              </div>

              <div class="flics-popup-conainer">
                <div className="row">
                  <span className="lbl-12">With</span>
                  <span class="user-details">
                    <span className="img-circle"><img src={avatar} /></span>
                    <span className="user-name">Princes</span>
                  </span>
                </div>
                <div className="row">
                  <span className="lbl-12">FLICS ID</span>
                  <span className="flics-h-info">DRP00563798</span>
                </div>
                <div className="row">
                  <span className="lbl-12">Amount:</span>
                  <span className="flics-his-drpd"><img src={dropdTokanIcon} />10,000</span>
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
                  <span className="lbl-12">Status</span>
                  <span className="flics-h-info">Successful</span>
                </div>
              </div>

            </div>

        </div>
      </div> 
    );
}

export default FlicsHistory;
