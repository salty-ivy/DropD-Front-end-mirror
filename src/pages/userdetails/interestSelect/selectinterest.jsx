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

function Selectinterest({ setSliderPage }) {
  const spinner = useSpinner()
  const { t, i18n } = useTranslation();
  const [attributes, setAttributes] = useState();
  const [selectInterestError,setSelectInterestError] = useState()
  const [interestArray, setInterestArray] = useState([])
  const [interestError,setInterestError] = useState(false)
  const [interests,setInterests] = useState()
  let selectedArray = [];


  const getInterests = async () => {
    const response = await GET_INTERESTS()
    setInterests(response.data)
    
}

  useEffect(() => {
      getInterests()
  }, [])

  useEffect(() => {
    updateInterests()
  }, [interests])

  const selectInterest = async (text) => {
    if (selectedArray.includes(text)) {
      selectedArray = selectedArray.filter((element) => {
        if (element != text) return element
      })
    } else {
      if (selectedArray.length < 8){
        selectedArray.push(text)
      }else{
        setInterestError(true)
        setSelectInterestError("Maximum 8 interests can be selected")
      }
    }
    console.log(selectedArray)
    if (selectedArray.length <= 8) {
      setInterestArray(selectedArray)
      updateInterests() 
    }
  }

  let length = interestArray.length

  const handleInterest = async () => {
    if (length < 8 || length > 8) {
      setInterestError(true)
    }
    else{
      setInterestError(false)
    }
    try {
      spinner.setLoadingState(true)
      await UPDATE_PROFILE("interests", interestArray)
      spinner.setLoadingState(false)
      setSliderPage("profile_pics")
    } catch (error) {
      spinner.setLoadingState(false)
      setSelectInterestError(error.response.data.message)
      console.log(error, "this is the error in interests updation")
    }
  }

  const handleBack = () => {
    setSliderPage("email")
  }

  const updateInterests = () => {
    console.log("updated list", interests)
    const _attributes = interests?.map((item, index) => {
      return (
        <div style={{ display: "inline-flexbox" }}>
          <div id="cursor" className={(selectedArray.includes(item.name)) ? 'selectedInterest' : 'selectInterest'} onClick={() => selectInterest(item.name)}>
            {item.name}
          </div>
        </div>
      )

    })
    setAttributes(_attributes)
  }


  return (
    <div className='wrapper'>
       <div className='navbar-wrapper'>
        <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '-5px' }}><img src={leftarrow} alt="back" /></div>
        <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '10px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
      </div>
       <div className='select-interest-wrapper'>
      {/* <Userdetailsnav/> */}
      <div class="main-wrap">
        <div class="entry-wrap">
          <div className='select-text'>{t('select-interest.1')}</div>
          <div className='select-description'>{t('select-interest-description.1')}</div>
        </div>

        <div  class="content-wrap">
          <Grid id="cursor" className='interest-container-box' container spacing={0}>
            {attributes}
          </Grid>
          {
              interestError ? <div style={{ color: '#DF2040', fontSize: '10px', fontWeight: '400', marginTop: '10px'}}>
                  <span><img style={{ position: 'relative', bottom: '-3px' }} src={fail} alt="fail" /></span>{selectInterestError}
              </div> : ""
          }
        </div>

        <div className="button-wrap">
          <CustomButton onClick={handleInterest}>{t('proceed.1')} <span style={{ paddingLeft: '20px' }}>{length}/8</span></CustomButton>
        </div>
      </div>

    </div>
    </div>
   
  )
}

export default Selectinterest;