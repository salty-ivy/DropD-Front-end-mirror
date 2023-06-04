import React, { useState } from 'react'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import { useTranslation } from 'react-i18next';
import metaMaskIcon from "../../../assets/images/metamask.svg"
import coinBaseIcon from "../../../assets/images/coinbase.svg"
import binanceIcon from "../../../assets/images/binance.svg"
import { Button } from '@mui/material';

import "../flics.css"

function ConnectWalletPage({setSliderPage}) {

  return(
      <div className='page-page-wrapper'>
        <div className="pnkbg">
          <TimelineNav />
        </div>

        <div className="inner-pages-container">

          <div class="half-pnk">
            <div className="inner-pages-container-wrap">
                <h1 className="page-title">Connect Your Wallet</h1>
                
                <div class="page-desc">
                  <p>Connect with one of our available wallet providers or create a new one.</p>
                </div>
            </div>
          </div>

          <div className="inner-pages-container-wrap">
              <div className="connect-wallet-container">

                <div className="wallet-options">
                  <button><span className="wallet-option-icon"><img src={metaMaskIcon} alt="metamask" /></span><span>Metamask</span></button>
                  <button><span className="wallet-option-icon"><img src={coinBaseIcon} alt="metamask" /></span><span>Coinbase</span></button>
                  <button><span className="wallet-option-icon"><img src={binanceIcon} alt="metamask" /></span><span>Binance</span></button>
                </div>

              </div>
            </div>
            <div class="button-wrap">
                    <Button onClick={()=>{setSliderPage("subscription")}} variant='contained' style={{ width: '300px', color: 'white', backgroundColor: '#C387C3', borderRadius: '12px', marginTop: '10px', marginBottom: '10px', boxShadow: 'none' }}>proceed</Button>
                </div>
        </div>
      </div> 
    );
}

export default ConnectWalletPage;
