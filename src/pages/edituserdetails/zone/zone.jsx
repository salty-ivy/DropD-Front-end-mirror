import React, { useState ,useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/Button/button'
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import zoneData from '../../../utils/zoneData';
import { UPDATE_PROFILE } from '../../../axios/POST_API';
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import coupleImageIcon from "../../../assets/images/coupleimage.svg"
import openMarriageIcon from "../../../assets/images/openmarriage.svg"
import seniorsIcon from "../../../assets/images/seniors.svg"
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import "./zone.css"
import { Slider } from '@mui/material'
import { useHistory } from 'react-router-dom';
import Money from "../../../assets/images/money.svg";
import notification from "../../../assets/images/notification.svg";
import search from "../../../assets/images/search.svg";
import TimelineNav from '../../../components/timelinenav/timelineNav'




const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

function Zone({ setSliderPage,profileData }) {
  const history = useHistory()

  const seekBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
  const SeekSlider = styled(Slider)(({ theme }) => ({
    // color: theme.palette.mode === 'dark' ? '#3880ff' : '#3880ff',
    color: '#E1D7F0',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 47,
      width: 47,
      backgroundColor: '#fff',
      boxShadow: seekBoxShadow,
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: seekBoxShadow,
        },
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 1,
      backgroundColor: '#E1D7F0',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#E1D7F0',
      height: 8,
      width: 1,
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: '#E1D7F0',
      },
    },
  }));

  const spinner = useSpinner()
  // const[zone,setZone]= useState()
  const [zone, setZone] = useState()
  const [loveGrounds, setLoveGrounds] = useState(0);
  const [openMarriage, setOpenMarriage] = useState(0);
  const [seniorsLove, setSeniorsLove] = useState(0);
  const [zoneError,setZoneError] = useState()

  const { t, i18n } = useTranslation();

  // const handleChange = async(e) => {
  //   setZone(e.target.value)
  //   console.log("line 87",e.target.value);
  // }

  // const displayLoveGrounds = () => {
  //   if (profileData) {
  //     if(profileData.zone == "open marriage commune"){
  //       setOpenMarriage(100)
  //       setLoveGrounds(0)
  //       setSeniorsLove(0)
  //       setZone("Open Marriage Commune")
  //     }
  //   }
  // }

  // useEffect(() => {
  //   displayLoveGrounds()
  // }, [zone])
  

  const slideLoveGrounds = async(e) => {
    if (e.target.value == 100 ) {
      setLoveGrounds(100)
      setOpenMarriage(0)
      setSeniorsLove(0)
      setZone("Love Grounds")
    }else{
      setLoveGrounds(0); 
      setZone("")
    }
  }
  const slideOpenMarriage = (e) => {
    if (e.target.value == 100 ) {
      setOpenMarriage(100)
      setLoveGrounds(0)
      setSeniorsLove(0)
      setZone("Open Marriage Commune")
    }else{
      setLoveGrounds(0); 
      setZone("")
    }
  }
  const slideSeniorsLove = (e) => {
    if (e.target.value == 100 ) {
      setSeniorsLove(100)
      setOpenMarriage(0)
      setLoveGrounds(0)
      setZone("Seniors In Love Again")
    }else{
      setLoveGrounds(0); 
      setZone("")
    }
  }
  const handleNotifications = () => {
    history.push("/notifications")
  }

  const handleWallet = () => {
    history.push("/connectwallet")
  }
  const handleClick = () => {
    // console.log("timeline click",history)
    setSliderPage("index")
  }


  const handleZone = async () => {
    if(!zone){
      setZoneError("Please select atleast one option")
    }
    try {
      spinner.setLoadingState(true)
      await UPDATE_PROFILE("zone", zone)
      spinner.setLoadingState(false)
      setSliderPage("index")
    } catch (error) {
      setZoneError(error.response.data.message)
      spinner.setLoadingState(false)
      console.log(error, "this is the error in zone updation")
    }
  }
  

  return (
    <div className='page-page-wrapper edit-user-details-page'>
        {/* <TimelineNav /> */}
        <div
        style={{ width: "100vw", height: "65px", backgroundColor: "white" }}
        className="navbar-wrapper"
      >
        <div style={{ display: "flex", width: "60vw" }}>
          <div onClick={handleClick} style={{ position: "relative", top: "20px", left: "15px" }}>
            <img src={leftarrow} alt="back" />
          </div>
          <div style={{ width: "auto" }}>
            <img
              style={{ position: "relative", left: "30px", top: "12px" }}
              id="dropd-logo"
              src={logo}
              alt="dropd-logo"
            />
          </div>
        </div>
        <div style={{ width: "40vw" }}>
          <div
            style={{
              display: "flex",
              float: "right",
              width: "100px",
              justifyContent: "space-evenly",
              position: "relative",
              top: "20px",
            }}
          >
            <div>
              <img onClick={handleNotifications} src={notification} alt="money" />
            </div>
            <div>
              <img onClick={handleWallet} src={Money} alt="money" />
            </div>
            <div>
              <img src={search} alt="money" />
            </div>
          </div>
        </div>
      </div>
        
        
        <div className="inner-pages-container">

          <div className="inner-pages-container-wrap">

            <div class="main-wrap">
              <div class="entry-wrap">
                <h1 className="page-title">Edit Your Zone</h1>
              </div>

              <div class="content-wrap">    
                <div className='zone-container'>
                  <div className="zoneOptionLabel">Love Grounds</div>
                  
                  <div className={(zone =="Love Grounds") ? 'selectedSlide' : ''}>
                    <div className="zoneOptionWrap">
                      <div class="zoneIconWrap">
                        <img src={coupleImageIcon} alt="Love Grounds" />
                      </div>
                      <div class="sliderWrap">
                        <div>
                          <SeekSlider
                            min={0}
                            max={100}
                            step={100}
                            value={loveGrounds}
                            onChange={value => [slideLoveGrounds(value)]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={(zone == "Open Marriage Commune") ? 'selectedSlide' : ''}>
                    <div className="zoneOptionLabel">Open Marriage Communes</div>
                    <div className="zoneOptionWrap">
                      <div class="zoneIconWrap">
                        <img src={openMarriageIcon} alt="Open Marriage Communes" />
                      </div>

                      <div class="sliderWrap">
                        <div>
                          <SeekSlider
                            min={0}
                            max={100}
                            step={100}
                            value={openMarriage}
                            onChange={value => [slideOpenMarriage(value)]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={(zone == "Seniors In Love Again") ? 'selectedSlide' : ''}>
                    <div className="zoneOptionLabel">Seniors In Love Again</div>
                    <div className="zoneOptionWrap">
                      <div class="zoneIconWrap">
                        <img src={seniorsIcon} alt="Seniors In Love Again" />
                      </div>
                      <div class="sliderWrap">
                        <div>
                          <SeekSlider
                            min={0}
                            max={100}
                            step={100}
                            value={seniorsLove}
                            onChange={value => [slideSeniorsLove(value)]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>  
                <div style={{color:"red",fontSize:"10px",paddingTop:'10px',paddingLeft:'20px'}}>{zoneError}</div> 
              </div>

              <div className="action-button-wrap">
                <CustomButton onClick={()=>{setSliderPage("index")}}>Cancel</CustomButton>
                <CustomButton onClick={handleZone}>Update</CustomButton>
              </div>
            </div>
          </div>

        </div>
    </div> 
  )
}

export default Zone