import React, { useState } from 'react'
import CustomButton from '../../../components/Button/button'
import { useTranslation } from 'react-i18next';
import Genders from '../../../utils/gender';
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import { UPDATE_PROFILE } from '../../../axios/POST_API';
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import tickcircle from "../../../assets/images/tickcircle.svg"
import "./gender.css"

function Gender({ setSliderPage, setGender }) {
  const spinner = useSpinner()
  const [selected, setSelected] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const { t, i18n } = useTranslation();

  const handleGenderPreferences = async () => {
    // if (selected) {
      if(!selected){
        setErrorMessage("please select an option")
      }
      try {
        spinner.setLoadingState(true)
        await UPDATE_PROFILE("gender", selected)
        spinner.setLoadingState(false)
        setSliderPage("gender_preference")

      } catch (error) {
        spinner.setLoadingState(false)
        setErrorMessage(error.response.data.message)
        console.log(error, "this is the error in interests updation")
      // }
      setGender(selected)
    }
    setErrorMessage("please select an option")
  }


  const handleBack = () => {
    setSliderPage("nick_name")
  }
  console.log(errorMessage)

  return (
    <div className='gender-wrapper'>
      {/* <Userdetailsnav/> */}
      <div className='navbar-wrapper'>
        <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '-15px' }}><img src={leftarrow} alt="back" /></div>
        <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '0px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
      </div>

      <div class="main-wrap">
        <div class="entry-wrap">
          <div className='gender-text-container'>
            <div className='gender-text'>
              {t('your-gender.1')}
            </div>
          </div>
          <div className='gender-description'>{t('we-welcome-everyone.1')}</div>
        </div>
        <div class="content-wrap">
          <div className='gender-container'>
            {
              Genders.map((item, index) => {
                return (
                  <div onClick={() => {setSelected(item.gendertext)}} className={selected===item.gendertext ? "selectedgender" : "gender"}>
                    <span id="cursor" className='gender-text-style'>{item.gendertext}</span>
                    <div id="cursor" style={{float:'right',position:'relative',top:'10px',right:'10px'}}>{selected === item.gendertext?<img src={tickcircle}/>:""}</div>
                    </div>
                )
              })
            }
          </div>
          <div style={{color:'red',fontSize:'10px',paddingTop:'10px'}}>{errorMessage}</div>

        </div>
        <div class="button-wrap">
          <CustomButton onClick={handleGenderPreferences}>{t('proceed.1')}</CustomButton>
        </div>
      </div>

    </div>
  )
}

export default Gender