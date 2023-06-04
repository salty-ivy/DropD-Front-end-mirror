import React,{useState} from 'react'
import CustomButton from '../../../components/Button/button'
import { useTranslation } from 'react-i18next';
import Genders from '../../../utils/gender';
import { UPDATE_PROFILE } from '../../../axios/POST_API';
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import tickcircle from "../../../assets/images/tickcircle.svg"
import "./genderpreferences.css"

function Genderpreferences({ setSliderPage,setGenderPreference}) {
  const spinner = useSpinner()
  const [selected,setSelected] = useState()
  const [partnerGenderError,setPartnerGenderError] = useState()
  const { t, i18n } = useTranslation();

  const handlePreferences = async() => {
    if(!selected){
      setPartnerGenderError("Please select atleast one option")
    }
    try {
      spinner.setLoadingState(true)
      await UPDATE_PROFILE("gender_preference", selected )
      spinner.setLoadingState(false)
      setSliderPage("person_kundli_attributes")
    } catch (error) {
      setPartnerGenderError(error.response.data.message)
      console.log(error, "this is the error in interests updation")
      spinner.setLoadingState(false)
    }
  }
  const handleBack=()=>{
    setSliderPage("gender")
  }

  return (
    <div className='genderpreferences-wrapper'>
      {/* <Userdetailsnav/> */}
      <div className='navbar-wrapper'>
        <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '-15px' }}><img src={leftarrow} alt="back" /></div>
        <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '0px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
      </div>

      <div class="main-wrap">
        <div class="entry-wrap">
          <div className='genderpreferences-text-container'>
            <div className='genderpreferences-text'>
              {t('your-gender-preferences.1')}
            </div>
          </div>
          <div className='genderpreferences-description'>{t('we-welcome-everyone.1')}</div>
        </div>

        <div class="content-wrap">
          <div className='gender-container'>
            {
              Genders.map((item, index) => {
                return (
                  <div onClick={() => {setSelected(item.gendertext)}} className={selected===item.gendertext ? "selectedgender" : "gender"}>
                    <span id="cursor" className='gender-text-style'>{item.gendertext}</span>
                    <div id="cursor" style={{float:'right',position:'relative',top:'10px',right:'10px'}}>{selected === item.gendertext?<img src={tickcircle}/>:""}</div></div>
                )
              })
            }
          </div>
          <div style={{color:"red",fontSize:"10px",paddingTop:'10px',paddingLeft:'20px'}}>{partnerGenderError}</div>
        </div>
        <div class="button-wrap">
          <CustomButton onClick={handlePreferences}>{t('proceed.1')}</CustomButton>
        </div>
      </div>

    </div>
  )
}

export default Genderpreferences