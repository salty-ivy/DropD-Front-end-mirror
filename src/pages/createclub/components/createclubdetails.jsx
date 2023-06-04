import React,{useState} from 'react'
import CustomButton from '../../../components/Button/button'
import { Grid, InputBase } from '@mui/material'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import search from "../../../assets/images/search.svg";
import "./createclubdetails.css"
import interest from '../../../utils/interests/interest';
// import FloatingToolbar from '../../components/FloatingToolbar'

function CreateClubDetails({setSliderPage,setClubName,setDescription,clubName,description,setInterests,interests}) {
  const { t, i18n } = useTranslation();
  const [detailsError,setDetailsError] = useState()

  const handleClubPhoto = () => {
    if(clubName==null || description==null ){
      setDetailsError("Please enter name and description")
    }else{
      setDetailsError("")
      setSliderPage("photo")

    }
  }
 console.log(interests)
  return(
      <div className='page-page-wrapper'>
        
          <TimelineNav />
          
          <div className="inner-pages-container">

            <div className="inner-pages-container-wrap">

              <h1 className="page-title">Create a Club</h1>

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
                      size='medium' 
                      onChange={(e)=>setClubName(e.target.value)}
                      placeholder="Name of the club"
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
                      placeholder="Short description"
                      multiline
                      rows={4}
                      onChange={(e)=>setDescription(e.target.value)}
                      sx={{
                          width: '340px', "& .MuiOutlinedInput-root": {
                              "& > fieldset": {
                                  border: "none"
                              }
                          },
                      }}
                    /> 
                  </div> 

                  <div className="c-field">
                  <select style={{width:"340px",border:'1px solid grey'}} onChange={(e) => { setInterests(e.target.value) }} className='marital-status' name="cars" id="cars">
                            {interest.map((item,index)=>{
                              return(<option value={item.text}>{item.text}</option>)
                            })}
                            </select>
                   
                  </div> 

                  <div className="c-field club-search-field">
                    <TextField 
                      id="outlined-basic" 
                      variant="outlined"
                      size='small' 
                      placeholder="Catgories that describes best"
                      sx={{
                          width: '340px', "& .MuiOutlinedInput-root": {
                              "& > fieldset": {
                                  border: "none"
                              }
                          }
                      }}
                    /> 
                    <span className="club-cat-search-button"><img src={search} alt="search icon" /></span>
                  </div> 

                  <div className="cc-categories-wrap">
                    <span>Crypto</span>
                    <span>Love</span>
                    <span>Entrepreneur</span>
                    <span>Dating</span>
                    <span>Fitness Freak</span>
                    <span>Traveller </span>
                  </div>
                      <div style={{fontSize:'14px',position:'relative',bottom:'30px',left:'15px'}} className='error'>{detailsError}</div>
                  <div className="button-wrap">
                      <CustomButton onClick={handleClubPhoto}>{t('proceed.1')}</CustomButton>
                  </div>
                </div>
                
              </div>
            </div>

          </div>
      </div> 
    );
}

export default CreateClubDetails;
