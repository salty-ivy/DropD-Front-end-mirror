import React, { useState } from 'react'
import CustomButton from '../../../components/Button/button'
import { Grid, InputBase } from '@mui/material'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import search from "../../../assets/images/search.svg";
import CardData from '../../../utils/cardData'
import Postcard from '../../profilepage/components/postcard/postcard'
import "./createpagedetails.css"
// import FloatingToolbar from '../../components/FloatingToolbar'

function CreatePageDetails({ setSliderPage, setPageName, setDescription, pageName, description }) {
  const { t, i18n } = useTranslation();
  const [detailsError,setDetailsError] = useState()

  const handleClubPhoto = () => {
    if(pageName==null || description==null){
      setDetailsError("Please enter both name and description")
    }else{
      setSliderPage("pagephoto")
    }
  }

  return (
    <div className='page-page-wrapper'>
      <TimelineNav />
      <div className="inner-pages-container">
        <div className="inner-pages-container-wrap">
          <h1 className="page-title">Create a Page</h1>
          <div class="create-club-progress-wrap">
            <div className="active"></div>
            <div className="inactive"></div>
          </div>
          <div className="create-club-container">
            <div className="create-club-form">
              <div className="c-field">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size='small'
                  onChange={(e) => setPageName(e.target.value)}
                  placeholder="Name of the page"
                  sx={{
                    width: '340px', "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        border: "none"
                      }
                    }
                  }}
                />
              </div>
              <div className="desc-field">
                <InputBase
                  id="outlined-basic"
                  variant="outlined"
                  size='small'
                  multiline
                  rows={5}
                  placeholder="Short description"
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    width: '340px', "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        border: "none"
                      }
                    }
                  }}
                />
              </div>

              <div className="cc-categories-wrap">
                <span>Crypto</span>
                <span>Love</span>
                <span>Entrepreneur</span>
                <span>Dating</span>
                <span>Fitness Freak</span>
                <span>Traveller </span>
              </div>
                  <div style={{position:'relative',bottom:'25px',left:'15px'}} className="error">{detailsError}</div>
              <div style={{ paddingTop: '35%' }} className="button-wrap">
                <CustomButton onClick={handleClubPhoto}>{t('proceed.1')}</CustomButton>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default CreatePageDetails;
