import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

// import components
import Wallet from './components/wallet'
import Transaction from './components/transaction'
import ClaimDrpd from './components/claimdrpd'
import TimelineNav from '../../components/timelinenav/timelineNav';
import "./mywallet.css"

function MyWallet() {

  const [sliderPage, setSliderPage] = useState()

  useEffect(() => {
      setSliderPage("wallet");
  }, []);


  const renderSlider = () => {
      switch (sliderPage) {

          case "wallet":
              return (
                  <Wallet
                    setSliderPage={setSliderPage}
                  />
              );
          case "transaction":
              return (
                  <Transaction
                    setSliderPage={setSliderPage}
                  />
              );
          case "claimdrpd":
              return (
                  <ClaimDrpd
                    setSliderPage={setSliderPage}
                  />
              );
          default:
              return "foo";
      }
  }
  return (
      <div style={{display: 'flex', flexDirection: 'column',}}>
          {/* <div className='navbar-wrapper'>
              <div style={{ position: 'relative', top: '20px', left: '15px' }}><img src={leftarrow} alt="back" /></div>
              <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '30px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
          </div> */}
          {/* <Userdetailsnav/> */}
          {renderSlider()}
      </div>
  )
}

export default MyWallet;
