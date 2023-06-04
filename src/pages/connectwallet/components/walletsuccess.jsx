import React, { useState } from 'react'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import CustomButton from '../../../components/Button/button'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import avatar from "../../../assets/images/avatar.jpeg"
import metaMaskIcon from "../../../assets/images/metamask.svg"
import walletConnectIcon from "../../../assets/images/walletconnecticon.svg"
import binanceIcon from "../../../assets/images/binance.svg"
import dropDwalletIcon from "../../../assets/images/dropdwalleticon.svg"
import leftarrow from "../../../assets/images/leftarrow.svg"
import { useHistory } from 'react-router-dom';
import logo from "../../../assets/images/dropdsmall.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import "../connectwallet.css"

function ConnectWalletSuccess({setSliderPage}) {
const history=useHistory()
  const handleBack = () => {
      setSliderPage("subscription")
  }

  return(
      <div style={{width:'100vw',backgroundColor:'#E1D7F0'}} className='page-page-wrapper connect-wallet-screen'>
        <div className='navbar-wrapper'>
            <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '15px' }}><img src={leftarrow} alt="back" /></div>
            <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '30px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
        </div>

        <div className="inner-pages-container-wrap">
          <div class="main-wrap">
            <div className="entry-wrap">
              <h1 className="page-title-big">WellDone!</h1>  
              <div className="page-desc">
                <p>Your profile is 70% complete</p>
              </div>
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
            
            <div class="button-wrap w-s-button-wrap">
              <CustomButton onClick={()=> {history.push("/timeline")}}>Complete Profile</CustomButton>
            
              <CustomButton onClick={()=> {history.push("/timeline")}} >Lets get started</CustomButton>
            </div>
          </div>
        </div>
      </div> 
    );
}

export default ConnectWalletSuccess;
