import React, { useState, useEffect } from 'react'
import TimelineNav from '../../components/timelinenav/timelineNav'
import { useTranslation } from 'react-i18next';
import avatar from "../../assets/images/avatar.jpeg"
import addIconWhite from "../../assets/images/addiconwhite.svg"
import activateIcon from "../../assets/images/activateicon.svg"
import swapIcon from "../../assets/images/swapicon.svg"
import upIcon from "../../assets/images/upicon.svg"
import infoIcon from "../../assets/images/informationcircle.svg"
import dropdTokanIcon from "../../assets/images/dropdtokanicon.svg"

// import components
import ActivateFlics from './components/activateflics'
import BuyDrpd from './components/buydrpd'
import ConnectWallet from './components/connectwallet'
import DeleteFlics from './components/deleteflics'
import DeployedFlics from './components/deployedflics'
import FlicsMain from './components/flics'
import FlicsHistory from './components/flicshistory'
import SharedFlics from './components/sharedflics'
import ShareFlics from './components/shareflics'

import "./flics.css"

function Flics() {
  const [sliderPage, setSliderPage] = useState()
  // const [clubName,setClubName] = useState();
  // const [description,setDescription] = useState()

  useEffect(() => {
      setSliderPage("flicsmain");
  }, []);


  const renderSlider = () => {
      switch (sliderPage) {

          case "activateflics":
              return (
                  <ActivateFlics
                    setSliderPage={setSliderPage}
                  />
              );
          case "buydrpd":
              return (
                  <BuyDrpd
                    setSliderPage={setSliderPage}
                  />
              );
          case "connectwallet":
              return (
                  <ConnectWallet
                    setSliderPage={setSliderPage}
                  />
              );
          case "deleteflics":
              return (
                  <DeleteFlics
                    setSliderPage={setSliderPage}
                  />
              );
          case "flicsmain":
              return (
                  <FlicsMain
                    setSliderPage={setSliderPage}
                  />
              );
          case "flicshistory":
              return (
                  <FlicsHistory
                    setSliderPage={setSliderPage}
                  />
              );
          case "sharedflics":
              return (
                  <SharedFlics
                    setSliderPage={setSliderPage}
                  />
              );
          case "shareflics":
              return (
                  <ShareFlics
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

export default Flics;
