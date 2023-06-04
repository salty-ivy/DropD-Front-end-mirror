import React,{useState,useEffect} from 'react'
import CustomButton from '../../../components/Button/button'
import { useTranslation } from 'react-i18next';
import Genders from '../../../utils/gender';
import { UPDATE_PROFILE } from '../../../axios/POST_API';
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import "./genderpreferences.css"
import { useHistory } from 'react-router-dom';
import TimelineNav from '../../../components/timelinenav/timelineNav'
import Money from "../../../assets/images/money.svg";
import notification from "../../../assets/images/notification.svg";
import search from "../../../assets/images/search.svg";


function Genderpreferences({ setSliderPage,setGenderPreference,profileData}) {
  const history = useHistory()
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
      setSliderPage("index")
    } catch (error) {
      setPartnerGenderError(error.response.data.message)
      console.log(error, "this is the error in interests updation")
      spinner.setLoadingState(false)
    }
  }
  const handleBack=()=>{
    setSliderPage("gender")
  }

  console.log(profileData,"profileData i gender page")
  useEffect(() => {
   if(profileData && !selected){
     setSelected(profileData.gender_preference)
   }
   
  }, [selected])

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
                <div className='genderpreferences-text-container'>
                  <div className='genderpreferences-text'>
                    {t('your-gender-preferences.1')}
                  </div>
                </div>
                <div className='genderpreferences-description'>{t('we-welcome-everyone.1')}</div>
              </div>

              <div className="content-wrap">
                <div className='gender-container'>
                  {
                    Genders.map((item, index) => {
                      return (
                        <div key={item.gendertext} onClick={() => {setSelected(item.gendertext.toLowerCase())}} className={selected===item.gendertext.toLowerCase() ? "selectedgender" : "gender"}><span className='gender-text-style'>{item.gendertext}</span></div>
                      )
                    })
                  }
                </div>
                <div style={{color:"red",fontSize:"10px",paddingTop:'10px',paddingLeft:'20px'}}>{partnerGenderError}</div>
              </div>
              <div className="action-button-wrap">
                <CustomButton onClick={()=>{setSliderPage("index")}}>Cancel</CustomButton>
                <CustomButton onClick={handlePreferences}>Update</CustomButton>
              </div>
            </div>
          </div>

        </div>
    </div> 

  )
}

export default Genderpreferences