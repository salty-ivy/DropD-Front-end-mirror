import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/Button/button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import "./success.css"

function Success({setSliderPage}) {
    const history = useHistory()
    const { t, i18n } = useTranslation();
    const [progress, setProgress] = useState()

    const handleClick = () => {
        history.push("/timeline")
    }
    const handleBack = () => {
        setSliderPage("knowbetter")
    }

    return (
        <div className='success-wrapper'>
            {/* <Userdetailsnav/> */}
            <div className='navbar-wrapper'>
                <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '-15px' }}><img src={leftarrow} alt="back" /></div>
                <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '0px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
            </div>

            <div class="main-wrap">
                <div class="entry-wrap">
                    <div className='success-text-container'>
                        <div className='success-text'>
                            Well Done
                        </div>
                    </div>
                    <div className='success-description'>Your profile is 70% complete</div>
                </div>
                <div class="content-wrap">
                    <div className='success-container'>
                        <Box style={{ position: 'absolute', top: '50%', left: '20%', width: '200px', transform: 'translate(-50%,-0%)' }} sx={{}}>
                            <CircularProgress style={{ width: '200px', }} sx={{ color: "rgba(112, 18, 206, 1)", width: '200px' }} variant="determinate" value={70} />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography style={{ position: 'relative', left: '80px', color: 'black', fontSize: '40px', fontWeight: '500' }} variant="caption" component="div" color="text.secondary">
                                    70%
                                </Typography>
                            </Box>
                        </Box>
                    </div>
                </div>
                <div class="button-wrap">
                    <CustomButton onClick={handleClick}>{t('proceed.1')}</CustomButton>
                    <div><Button variant='contained' style={{ backgroundColor: '#C387C3', width: '300px', borderRadius: '19px', boxShadow: 'none',marginTop:'20px' }}>complete profile</Button></div>

                </div>
            </div>
            
        </div>
    )
}

export default Success