import React, { useState } from 'react'
import CustomButton from '../../../components/Button/button'
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import line from "../../../assets/images/line.svg"
import { SEND_OTP_EMAIL } from '../../../axios/POST_API';
import { EMAIL_OTP_VERIFICATION } from '../../../axios/POST_API';
import { useHistory } from 'react-router-dom';
import fail from "../../../assets/images/fail.svg"
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import "./email.css"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import OtpInput from 'react-otp-input';

function Email({ setSliderPage }) {
    const history = useHistory()
    const spinner = useSpinner()
    const { t, i18n } = useTranslation();
    const [failure, setFailure] = useState()
    const [renderOtp, setRenderOtp] = useState(false)
    const [emailError,setEmailError] = useState()
    const [value, setValue] = useState()
    const [otp, setOtp] = useState()
    const [email, setEmail] = useState("")
    const [invalidEmail, setInvalidEmail] = useState(false)

    const handleClick = () => {
        setSliderPage("selectinterest")
    }
    const handleBack = () => {
        history.push("/create")
    }

    const handleChange = async (_otp) => {
        // setOtp(otp);
        spinner.setLoadingState(true)

        setOtp(_otp);
        if (_otp.length === 6) {
            try {
                spinner.setLoadingState(true)
                let response = await EMAIL_OTP_VERIFICATION({ email: email, otp: _otp })
                spinner.setLoadingState(false)
                setSliderPage("interests")
            } catch (error) {
                spinner.setLoadingState(false)
                setEmailError(error.response.data.message)
                setFailure(true)
                console.log(error)
            }
        }

    };

    const handlerender = async () => {
        setFailure(false)
        if (email != "") {
            setInvalidEmail(false)
            try {
                spinner.setLoadingState(true)
                const response = await SEND_OTP_EMAIL({ Email: email })
                spinner.setLoadingState(false)

                if(response?.data?.status=="error"){
                    setFailure(true)
                    setEmailError(response.data.message)
                }
                setRenderOtp(true)
            } catch (error) {
                spinner.setLoadingState(false)
                setEmailError(error.response.data.message)
                console.log(error, "this is the error")
            }
        }
        else{
            setInvalidEmail(true)
            setRenderOtp(false)
        }
    }


    return (
        <div className='wrapper'>
            {/* <Userdetailsnav/> */}
            <div className='navbar-wrapper'>
                <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '0px' }}><img src={leftarrow} alt="back" /></div>
                <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '15px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
            </div>

            <div class="main-wrap">
                <div class="entry-wrap">
                    <div className='email-text-container'><div className='email-text'>{t('share-email.1')}</div></div>
                    <div className='email-description'>{t('share-email-description.1')}</div>
                </div>

                <div class="content-wrap">
                    <div style={{ position: 'relative', }}>
                        <div>
                        <TextField style={{ backgroundColor: 'white', borderRadius: '10px' }}
                            id="email"
                            variant="outlined"
                            required
                            size='small'
                            onChange={(event) => { setEmail(event.target.value) }}
                            sx={{
                                 "& .MuiOutlinedInput-root": {
                                    "& > fieldset": {
                                        border: "none"
                                    }
                                },
                            }}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment id="cursor" style={{ paddingLeft: '2px' }} position="start">
                                        <img style={{ paddingRight: '8px' }} src={line} alt='separator' />
                                        <span onClick={handlerender} style={{ position: 'relative', left: '4px', color: '#525252', fontSize: '12px', fontWeight: '400' }}>Send OTP</span>
                                    </InputAdornment>,
                            }} />

                            {
                              invalidEmail ? <div style={{ color: '#DF2040', fontSize: '10px', fontWeight: '400', paddingLeft: '18px', paddingTop: '5px' }}>
                                <span><img style={{ position: 'relative', bottom: '-3px' }} src={fail} alt="fail" /></span> Please enter your Email
                              </div> : ""
                            }
                        </div>
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
                        {
                            failure ? <div style={{ color: '#DF2040', fontSize: '10px', fontWeight: '400', paddingLeft: '20px',paddingTop:'10px' }}>
                                <span><img style={{ position: 'relative', bottom: '-3px' }} src={fail} alt="fail" /></span> {emailError}
                            </div> : ""
                        }
                    </div>
                </div>

                
            </div>
            
        </div>
    )
}

export default Email