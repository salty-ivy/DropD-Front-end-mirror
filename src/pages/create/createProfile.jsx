import React, { useState, useEffect } from 'react'
import "./createProfile.css";
import dropd from "../../assets/images/dropdlogo.svg"
import MobileInput from '../../components/PhoneInput/PhoneInput'
import line from "../../assets/images/line.svg"
import OtpInput from "react-otp-input";
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useHistory } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import { SEND_OTP_MOBILE } from '../../axios/POST_API';
import { SIGNUP_POST } from '../../axios/POST_API';
import { useSpinner } from '../../context/loaderContext/globalSpinnerContext';
import fail from "../../assets/images/fail.svg"

function CreateProfile() {
    const spinner = useSpinner()
    const history=useHistory()
    const [renderOtp, setRenderOtp] = useState(false)
    const [signupError,setSignupError] = useState()
    const { t, i18n } = useTranslation();
    const [otp, setOtp] = useState()
    const [value, setValue] = useState(0)
    const [invalidMobile, setInvalidMobile] = useState(false)
    const [sent,setSent] = useState(false)
    const [counter,setCounter] = useState()
    const [activateResend,setActivateResend] = useState(false)
    // const [phone, setPhone] = useState()

    React.useEffect(() => {
        const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if(counter === 0){
            setActivateResend(true)
        }
        return () => clearInterval(timer);
    }, [counter]);

    console.log(activateResend,"acivation record")
    
    const handleSendOtp = async () => { 
        // startTimer()
        if(!value){setSignupError("Please enter a valid number")}
        if (value != 0) {
            try {
                setSent(true)
                setActivateResend(false)
                spinner.setLoadingState(true)
                setRenderOtp(true)
                const response = await SEND_OTP_MOBILE({ Phone: value })
                console.log("response", response.data.status)
                if(response?.data?.status === "error"){
                    setInvalidMobile(true)
                    setSignupError(response?.data.message)
                }else {
                    setCounter(59);
                }
                spinner.setLoadingState(false)
            } catch (error) {
                spinner.setLoadingState(false)
                console.log(error, "this is the error") 
                setActivateResend(true)
                setSignupError(error.response.data.message)
            }
        }
        else{
            setInvalidMobile(true)
        }
    }
  
    const renderSendOtpButton = () =>{
        if(sent && !activateResend) {
            return(<div id="cursor" style={{ position: 'relative', left: '15px', top: '12px', color: '#525252', fontSize: '12px', fontWeight: '400' }} >Resend <span>{counter}</span></div>)
        }
         if(activateResend){
            return(<div id="cursor" onClick={handleSendOtp} style={{ position: 'relative', left: '20px', top: '12px', color: '#EC1C80', fontSize: '12px', fontWeight: '400' }} >Resend </div>)
        }
        else{
            return(<div id="cursor" onClick={handleSendOtp} style={{ position: 'relative', left: '15px', top: '12px', color: '#EC1C80', fontSize: '12px', fontWeight: '400' }} >{t('send-otp.1')}</div>)
        }
    }

   
    const handleChange = async (_otp) => {
        try {
            setOtp(_otp);
            if (_otp.length === 6) {
                spinner.setLoadingState(true)
                const response = await SIGNUP_POST({ Phone: value, otp: _otp })
                spinner.setLoadingState(false)
                localStorage.setItem('token',`${response?.data?.token}`)                
                history.push("/userdetails")

            }
        } catch (error) {
            spinner.setLoadingState(false)
            setInvalidMobile(true)
            setSignupError(error.response.data.message)
            console.log(error)
        }

    };


    return (
        <div className='create-page-wrapper'>
            <div className='logo-container'>
                <img id='login-dropd-logo' src={dropd} alt="dropd-logo" />
            </div>
            <div className='login-field-wrapper'>
                <div className='login-text'>{t('create.1')}</div>
                <div className='input-label'>{t('mobile-no.1')}</div>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <PhoneInput
                                country={'in'}
                                value={value}
                                onChange={phone => setValue(phone)}
                                inputStyle={{ border: 'none', width: '210px', boxShadow: 'none', height: '42px', borderRadius: '10px 0px 0px 10px' }}
                                buttonStyle={{ backgroundColor: 'white', borderRadius: '10px', border: 'none' }}
                                dropdownStyle={{ borderRadius: '10px' }}
                                InputProps={{
                                    endAdornment: <InputAdornment id="cursor"  position="start">send otp </InputAdornment>,
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', backgroundColor: 'white', width: '90px', borderRadius: '0px 10px 10px 0px' }}>
                        <div> <img style={{ position: 'relative', top: '9px', left: '2px' }} src={line} alt="line" /></div>
                        {/* {sent ? 

                         <div onClick={handleSendOtp} style={{ position: 'relative', left: '15px', top: '12px', color: '#525252', fontSize: '12px', fontWeight: '400' }} >Resend <span>{counter}</span></div>:
                        <div><span onClick={handleSendOtp} style={{ position: 'relative', left: '15px', top: '12px', color: '#C387C3', fontSize: '12px', fontWeight: '400' }} >{t('send-otp.1')}</span></div>
                        } */}
                        {renderSendOtpButton()}
                    </div>
                </div>
                {
                  invalidMobile ? <div style={{ color: '#DF2040', fontSize: '10px', fontWeight: '400', paddingLeft: '18px', paddingTop: '5px' }}>
                    <span><img style={{ position: 'relative', bottom: '-3px' }} src={fail} alt="fail" /></span> {signupError}
                  </div> : ""
                }

                {renderOtp ?
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <OtpInput
                            className="otp-wrapper"
                            containerStyle={{
                                flex: 1,
                                justifyContent: 'space-between',
                            }}
                            inputStyle={{
                                flex: 1,
                                width: '40px',
                                height: "40px",
                                background: "white",
                                fontSize: "1rem",
                                borderRadius: 8,
                                border: "none",
                            }}
                            value={otp}
                            onChange={handleChange}
                            isInputNum={true}
                            numInputs={6}
                            separator={<span></span>}
                        />
                    </div> : ""
                }
            </div>
        </div>
    )
}

export default CreateProfile