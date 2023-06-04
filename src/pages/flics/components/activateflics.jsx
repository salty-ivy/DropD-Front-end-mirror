import React, { useState } from 'react'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import CustomButton from '../../../components/Button/button'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next';
import avatar from "../../../assets/images/avatar.jpeg"
import addIconWhite from "../../../assets/images/addiconwhite.svg"
import activateIcon from "../../../assets/images/activateicon.svg"
import swapIcon from "../../../assets/images/swapicon.svg"
import upIcon from "../../../assets/images/upicon.svg"
import infoIcon from "../../../assets/images/informationcircle.svg"
import dropdTokanIcon from "../../../assets/images/dropdtokanicon.svg"

import "../flics.css"

function ActivateFlics({setSliderPage}) {

  return(
      <div className='page-page-wrapper flics-page-container'>
        <div className="pnkbg">
          <TimelineNav />
        </div>

        <div className="inner-pages-container">

          <div class="half-pnk">
            <div className="inner-pages-container-wrap">
                <h1 className="page-title">Activate FLICS</h1>
                <div className="flics-wallet-balance">Wallet Balance <span><img src={dropdTokanIcon} />10,000</span></div>
            </div>
          </div>

          <div className="inner-pages-container-wrap">
              <div class="flics-popup-conainer">
                
                <div className="flics-txt">Enter FLICS amount you want to buy</div>

                <div className="amount-input-field">
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    size='small' 
                    sx={{
                        width: '100%', "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                                border: "none"
                            }
                        }
                    }}
                  />
                </div>
              </div>
            </div>

            <div class="button-wrap">
              <CustomButton>Activate FLICS</CustomButton>
            </div>
        </div>
      </div> 
    );
}

export default ActivateFlics;
