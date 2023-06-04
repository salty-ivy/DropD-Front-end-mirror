import React, { useEffect, useState } from 'react'
import "./selectinterest.css"
import CustomButton from '../../../components/Button/button'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { GET_INTERESTS } from '../../../axios/GET_API'
import { Button } from '@mui/material'
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import { UPDATE_PROFILE } from '../../../axios/POST_API'
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import fail from "../../../assets/images/fail.svg"
import { useHistory } from 'react-router-dom';
import TimelineNav from '../../../components/timelinenav/timelineNav'
import Money from "../../../assets/images/money.svg";
import notification from "../../../assets/images/notification.svg";
import search from "../../../assets/images/search.svg";

function Selectinterest({ setSliderPage, interests, setInterests,profileData }) {
  const history = useHistory()
  const spinner = useSpinner()
  const { t, i18n } = useTranslation();
  const [attributes, setAttributes] = useState();
  const [selectInterestError,setSelectInterestError] = useState()
  const [interestError,setInterestError] = useState(false)
  const [selectedArray,setSelectedArray] = useState([])
  // let selectedArray = [];



  const fetchInterests =  () =>{
    if(profileData && selectedArray.length == 0){
      setSelectedArray(profileData.interests)
    }
  }

  useEffect(() => {
    fetchInterests()
    updateInterests()
  }, [selectedArray])
  
 
  const selectInterest = async (text) => {
    let tempSelectedArray = selectedArray

    if (tempSelectedArray.includes(text)) {
      tempSelectedArray = tempSelectedArray.filter((element) => {
        if (element != text) return element
      })
    } else {
      if (tempSelectedArray.length < 8){
        tempSelectedArray.push(text)
      }else{
        setInterestError(true)
        setSelectInterestError("Maximum 8 interests can be selected")
      }
    }
    console.log(tempSelectedArray)
    if (tempSelectedArray.length <= 8) {
      setSelectedArray(tempSelectedArray)
      updateInterests() 
    }
  }

  const handleInterest = async () => {
    let selectedInterstsLength = selectedArray.length
    if (selectedInterstsLength < 8 || selectedInterstsLength > 8) {
      setInterestError(true)
    }
    else{
      setInterestError(false)
    }
    try {
      spinner.setLoadingState(true)
      await UPDATE_PROFILE("interests", selectedArray)
      spinner.setLoadingState(false)
      setSliderPage("index")
    } catch (error) {
      spinner.setLoadingState(false)
      setSelectInterestError(error.response.data.message)
      console.log(error, "this is the error in interests updation")
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

  const updateInterests = () => {
    console.log(selectedArray, interests, "updated list")
    const _attributes = interests?.data?.map((item, index) => {
      return (
        <div key={item.name} style={{ display: "inline-flexbox" }}>
          <div className={(selectedArray.includes(item.name)) ? 'selectedInterest' : 'selectInterest'} onClick={() => selectInterest(item.name)}>
            {item.name}
          </div>
        </div>
      )

    })
    setAttributes(_attributes)
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

            <div className="main-wrap">
              <div className="entry-wrap">
                <h1 className="page-title">Edit Profile</h1>
                <div className='select-description'>{t('select-interest-description.1')}</div>
              </div>

              <div  className="content-wrap">
                <Grid className='interest-container' container spacing={0}>
                  {attributes}
                </Grid>
                {
                    interestError ? <div style={{ color: '#DF2040', fontSize: '10px', fontWeight: '400', marginTop: '10px'}}>
                        <span><img style={{ position: 'relative', bottom: '-3px' }} src={fail} alt="fail" /></span>{selectInterestError}
                    </div> : ""
                }
              </div>

              <div className="action-button-wrap">
                <CustomButton onClick={()=>{setSliderPage("index")}}>Cancel</CustomButton>
                <CustomButton onClick={handleInterest}>Update</CustomButton>
              </div>
            </div>
          </div>

        </div>
    </div> 
  )
}

export default Selectinterest;