import React, { useState } from 'react'
import CustomButton from '../../../components/Button/button'
import Simpleinput from '../../../components/simpleinput/simpleinput'
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UPDATE_NICKNAME } from '../../../axios/POST_API';
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import "./name.css"

function Name({ setSliderPage }) {
    const spinner = useSpinner()
    const [name, setName] = useState()
    const [nameError,setNameError] = useState()

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleName = async () => {
        if(!name){
            setNameError("Please enter a nickname")
        }
        try {
            spinner.setLoadingState(true)
            await UPDATE_NICKNAME({ nickname: name })
            spinner.setLoadingState(false)
            setSliderPage("gender")
        } catch (error) {
            spinner.setLoadingState(false)
            setNameError(error.response.data.message)
            console.log(error, "this is the error in nickname updation")
        }

    }

    const handleBack = () => {
        setSliderPage("profile_pics")
    }

    const { t, i18n } = useTranslation();
    return (
        <div className='name-wrapper'>
            {/* <Userdetailsnav/> */}
            <div className='navbar-wrapper'>
                <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '-15px' }}><img src={leftarrow} alt="back" /></div>
                <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '0px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
            </div>

            <div class="main-wrap">
                <div class="entry-wrap">
                    <div className='name-text-container'>
                        <div className='name-text'>
                            {t('enter-your-nick-name.1')}
                        </div>
                    </div>
                </div>
                <div class="content-wrap">
                    <div className='simple_input-container'>
                        <div className='nickname-text'>{t('nick-name.1')}</div>
                        {/* <Simpleinput /> */}
                        <TextField style={{ backgroundColor: 'white', borderRadius: '10px' }}
                            id="outlined-basic"
                            variant="outlined"
                            size='small'
                            onChange={handleChange}
                            sx={{
                                width: '300px', "& .MuiOutlinedInput-root": {
                                    "& > fieldset": {
                                        border: "none"
                                    }
                                }
                            }}
                        />
                    </div>  
                    <div style={{color:"red",fontSize:"10px",paddingTop:'10px',paddingLeft:'20px'}}>{nameError}</div>
                </div>
              
                <div class="button-wrap">
                    <CustomButton onClick={handleName}>{t('proceed.1')}</CustomButton>
                </div>
            </div>
        </div>
    )
}
export default Name