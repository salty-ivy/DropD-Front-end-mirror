import React, { useState } from 'react'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import CustomButton from '../../../components/Button/button'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styled } from '@mui/material/styles'
import avatar from "../../../assets/images/avatar.jpeg"
import addIconWhite from "../../../assets/images/addiconwhite.svg"
import activateIcon from "../../../assets/images/activateicon.svg"
import swapIcon from "../../../assets/images/swapicon.svg"
import upIcon from "../../../assets/images/upicon.svg"
import infoIcon from "../../../assets/images/informationcircle.svg"
import dropdTokanIcon from "../../../assets/images/dropdtokanicon.svg"
import { Slider } from '@mui/material'
import "../flics.css"

function BuyDrpd({setSliderPage}) {
  const [drpdAmount, setDrpdAmount] = useState(0);

  const seekBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
  const marks = [
    {
      value: 0,
    },
    {
      value: 20,
    },
    {
      value: 37,
    },
    {
      value: 100,
    },
  ];
  const SeekSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#EC1C80' : '#EC1C80',
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
      height: 28,
      width: 28,
      backgroundColor: '#fff',
      boxShadow: seekBoxShadow,
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: seekBoxShadow,
        },
      },
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 12,
      fontWeight: 'normal',
      top: 60,
      backgroundColor: 'unset',
      color: theme.palette.text.primary,
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor',
      },
    },
  }));

  const changeToConnectWallet = () =>{
    setSliderPage("connectwallet");
  }

  return(
      <div className='page-page-wrapper flics-page-container'>
        <div className="pnkbg">
          <TimelineNav />
        </div>

        <div className="inner-pages-container">

          <div class="half-pnk">
            <div className="inner-pages-container-wrap">
                <h1 className="page-title">FLICS</h1>
                <div className="flics-wallet-balance">Wallet Balance <span><img src={dropdTokanIcon} />10,000</span></div>
            </div>
          </div>

          <div className="inner-pages-container-wrap">
              <div class="flics-popup-conainer">
                <div className="flics-txt">Enter DRPD amount you want to buy</div>

                <div className="amount-input-field">
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    size='small' 
                    sx={{
                        width: '100%', "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                                border: "none"
                            }
                        }
                    }}
                  />
                </div>
              </div>

              <div className="buy-drpd-range-conainter">
                <div className="buy-drpd-range-lbl">
                  <span className="flics-lbl">Min :10,000</span>
                  <span className="flics-lbl">Max: 1,000,000</span>
                </div>

                <div className="drpd-range-wrap">
                  <SeekSlider
                        min={10000}
                        max={1000000}
                        marks={marks}
                        valueLabelDisplay="on"
                      />
                </div>
              </div>
             
            </div>

            <div class="button-wrap">
              <CustomButton onClick={changeToConnectWallet}>Buy</CustomButton>
            </div>

        </div>
      </div> 
    );
}

export default BuyDrpd;
