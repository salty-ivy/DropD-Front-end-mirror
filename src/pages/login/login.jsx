import React, { useState,useEffect } from 'react'
import "./login.css"
import EmailInput from '../../components/Input/input'
import MobileInput from '../../components/PhoneInput/PhoneInput'
import OtpInput from "react-otp-input";
import dropd from "../../assets/images/dropdlogo.svg"
import CustomButton from '../../components/Button/button'
import line from "../../assets/images/line.svg"
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import { LOGIN } from '../../axios/POST_API';
import { LOGIN_VERIFICATION } from '../../axios/POST_API';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { SEND_OTP_EMAIL } from '../../axios/POST_API';
import fail from "../../assets/images/fail.svg"
import { useSpinner } from '../../context/loaderContext/globalSpinnerContext';
import leftarrow from "../../assets/images/leftarrow.svg"

function Login() {
  const spinner = useSpinner()
  const history = useHistory()
  const { t, i18n } = useTranslation();
  const [loginError, setLoginError] = useState("")
  const [renderOtp, setRenderOtp] = useState(false)
  const [renderEmail, setRenderEmail] = useState(false)
  const [value, setValue] = useState(0)
  const [invalidMobile, setInvalidMobile] = useState(false)
  const [otp, setOtp] = useState()
  const [failure, setFailure] = useState(false)
  const [email, setEmail] = useState("")
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [sent,setSent] = useState(false)
  const [counter,setCounter] = useState()
  const [activateResend,setActivateResend] = useState(false)


  const performLogin = (loginData) => {

    if( loginData ){
      localStorage.setItem('token', loginData.token)
      spinner.setLoadingState(false)

      if(loginData.is_profile_complete == false){
        history.push("/userdetails/"+loginData.incomplete_profile_label)
      }else{
        history.push("/timeline")
      }
    }
  }

  const handleSubmitOtp = async (_otp) => {
    setOtp(_otp);
    let loginCredentials
    if( email ){
      loginCredentials = { Email: email, otp: _otp }
    }else{
      loginCredentials = { Phone: value, otp: _otp }
    }

    try {
      if (_otp.length === 6) {
        spinner.setLoadingState(true)
        const response = await LOGIN_VERIFICATION(loginCredentials)
        performLogin(response.data)
      }
    } catch (error) {
      spinner.setLoadingState(false)
      setLoginError(error.response.data.message)
      setFailure(true)
      console.log(error)
    }
  };


  const handleEmailOtp = async () => {
    if (email != "") {
      setInvalidEmail(false)
      try {
        setSent(true)
        spinner.setLoadingState(true)
        let response = await LOGIN({ Email: email })
        console.log(response)
        if(response?.data?.status === "error"){
          setInvalidMobile(true)
          setLoginError(response?.data.message)
      }else {
          setCounter(59);
      }
        spinner.setLoadingState(false)
        setRenderOtp(true)
        setFailure(false)
      } catch (error) {
        spinner.setLoadingState(false)
        setFailure(true)
        setLoginError(error.response.data.message)
        console.log(error, "this is the error")
      }
    }
    else {
      setInvalidEmail(true)
    }
  }

  const handleSendOtpMobile = async () => {
    if (value != 0) {
      setInvalidMobile(false)
      let response
      try {
        setSent(true)
        setActivateResend(false)
        spinner.setLoadingState(true)
        response = await LOGIN({ Phone: value })
        spinner.setLoadingState(false)
        if (response.status == "error") {
          setLoginError(response.message)
        }else{
          setCounter(59)
        }
        setRenderOtp(true)
      } catch (error) {
        spinner.setLoadingState(false)
        setLoginError(error.response.data.message)
        setFailure(true)
        console.log(error, "this is the error")
      }
    } else {
      setInvalidMobile(true)
    }
  }

  const handlePhoneRender = async () => {
    setInvalidMobile(false)
    setInvalidEmail(false)

    setRenderEmail(false)
    setRenderOtp(false)
    setOtp("")
  }
  const handleEmailRender = async () => {
    setInvalidMobile(false)
    setInvalidEmail(false)

    setRenderEmail(true)
    setRenderOtp(false)
    setFailure(false)
    setOtp("")
  }

  React.useEffect(() => {
    const timer =
    counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if(counter === 0){
        setActivateResend(true)
    }
    return () => clearInterval(timer);
}, [counter]);

  const renderSendOtpButton = () =>{
    if(sent && !activateResend) {
        return(<div id="cursor" style={{ position: 'relative', left: '15px', top: '12px', color: '#525252', fontSize: '12px', fontWeight: '400' }} >Resend <span>{counter}</span></div>)
    }
     if(activateResend){
        return(<div id="cursor" onClick={handleSendOtpMobile} style={{ position: 'relative', left: '20px', top: '12px', color: '#EC1C80', fontSize: '12px', fontWeight: '400' }} >Resend </div>)
    }
    else{
        return(<div id="cursor" onClick={handleSendOtpMobile} style={{ position: 'relative', left: '15px', top: '12px', color: '#EC1C80', fontSize: '12px', fontWeight: '400' }} >{t('send-otp.1')}</div>)
    }
}

const renderSendOtpButtonEmail = () =>{
  if(sent && !activateResend) {
      return(<div id="cursor" style={{ position: 'relative', left: '10px', color: '#525252', fontSize: '12px', fontWeight: '400' }} >Resend <span>{counter}</span></div>)
  }
   if(activateResend){
      return(<div id="cursor" onClick={handleEmailOtp} style={{ position: 'relative', left: '20px', color: '#EC1C80', fontSize: '12px', fontWeight: '400' }} >Resend </div>)
  }
  else{
      return(<span id="cursor" onClick={handleEmailOtp} style={{ position: 'relative', left: '10px', color: '#EC1C80', fontSize: '12px', fontWeight: '400' }} >{t('send-otp.1')}</span>)
  }
}

  return (
    <div className='login-page-wrapper'>
      <div style={{width:"100%"}}><img onClick={()=>{history.push("/")}} style={{position:"relative",left:'30px',top:'20px'}} src={leftarrow} alt="back" /></div>
      <div className='logo-container'>
        <img id='login-dropd-logo' src={dropd} alt="dropd-logo" />
      </div>
      <div className='login-field-wrapper'>
        <div className='login-text'>{t('lets-login.1')}</div>

        {
          renderEmail ?
            <>
              <div className='input-label'>{t('enter-your-email.1')}</div>
              <div>
                <TextField style={{ backgroundColor: 'white', borderRadius: '10px' }}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={(event) => { setEmail(event.target.value) }}
                  size='small'
                  sx={{
                    width: '300px', "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        border: "none"
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment:
                      <InputAdornment id="cursor" style={{ paddingLeft: '2px' }} position="start">
                        <img style={{ paddingRight: '8px' }} src={line} alt='separator' />
                        {/* <span onClick={handleEmailOtp} style={{ position: 'relative', left: '4px', color: '#525252', fontSize: '12px', fontWeight: '400' }}>{t('send-otp.1')}</span> */}
                        {renderSendOtpButtonEmail()}
                      </InputAdornment>,
                  }} />
                {
                  invalidEmail ? <div style={{ color: '#DF2040', fontSize: '10px', fontWeight: '400', paddingLeft: '18px', paddingTop: '5px' }}>
                    <span><img style={{ position: 'relative', bottom: '-3px' }} src={fail} alt="fail" /></span> { }
                  </div> : ""
                }
              </div>
            </> :
            <div>
              <div className='input-label'>{t('mobile-no.1')}</div>
              <div style={{ display: 'flex' }}>
                <div>
                  {/* <MobileInput /> */}
                  <div>
                    <PhoneInput
                      country={'in'}
                      value={value}
                      onChange={phone => setValue(phone)}
                      inputStyle={{ border: 'none', width: '210px', boxShadow: 'none', height: '42px', borderRadius: '10px 0px 0px 10px' }}
                      buttonStyle={{ backgroundColor: 'white', borderRadius: '10px', border: 'none' }}
                      dropdownStyle={{ borderRadius: '10px' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', backgroundColor: 'white', width: '90px', borderRadius: '0px 10px 10px 0px' }}>
                  <div> <img style={{ position: 'relative', top: '9px', left: '2px' }} src={line} alt="line" /></div>
                  {/* <span onClick={handleSendOtpMobile} style={{ position: 'relative', left: '15px', top: '12px', color: '#525252', fontSize: '12px', fontWeight: '400' }} >{t('send-otp.1')}</span> */}
                  {renderSendOtpButton()}
                </div>
              </div>
              {
                invalidMobile ? <div style={{ color: '#DF2040', fontSize: '10px', fontWeight: '400', paddingLeft: '18px', paddingTop: '5px' }}>
                  <span><img style={{ position: 'relative', bottom: '-3px' }} src={fail} alt="fail" /></span> Please enter valid Mobile no.
                </div> : ""
              }
            </div>

        }

        {renderOtp ?
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <OtpInput
              className="otp-wrapper"
              containerStyle={{
                width:300,
                justifyContent: 'space-between',
              }}
              inputStyle={{
                width: 35,
                height: 40,
                background: "white",
                fontSize: "1rem",
                borderRadius: 8,
                border: "none",
              }}
              value={otp}
              onChange={handleSubmitOtp}
              isInputNum={true}
              numInputs={6}
            // separator={<span></span>}
            />
          </div> : ""
        }
        {
          failure ? <div style={{ color: '#DF2040', fontSize: '10px', fontWeight: '400', paddingLeft: '18px', paddingTop: '5px' }}>
            <span><img style={{ position: 'relative', bottom: '-3px' }} src={fail} alt="fail" /></span> {loginError}
          </div> : ""
        }

      </div>

      <div style={{ width: "300px" }} class="button-wrap">
        {
          renderEmail ?
            <CustomButton onClick={handlePhoneRender}>{t('Login With Mobile')}</CustomButton>
            :
            <CustomButton onClick={handleEmailRender}>{t('login-with-email.1')}</CustomButton>
        }
      </div>

    </div>
  )
}
export default Login;