import React,{useState} from 'react'
import CustomButton from '../../../components/Button/button'
import { Grid } from '@mui/material'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import avatar from "../../../assets/images/avatar.jpeg";
import verifiedIcon from "../../../assets/images/verified.svg"
import menukebabIcon from "../../../assets/images/menukebab.svg"
import search from "../../../assets/images/search.svg";
import FriendsLoader from '../../../components/SkeletonLoader/Friendskeleton/Friendskeleton';
import Friendbutton from '../../../components/Friendbutton/Friendbutton';
import { useHistory } from 'react-router-dom';
import "./style.css"

const { REACT_APP_CDN_HOST } = process.env;

function CreateClubDetails({setSliderPage,sentList,sentError}) {
  const { t, i18n } = useTranslation();
  const history = useHistory()

  const changeToFriends = () =>{
    setSliderPage("friendlist");
  }
  const changeToReceived = () =>{
    setSliderPage("requestreceived");
  }
  const changeToSent = () =>{
    setSliderPage("requestsent");
  }

  return(
      <div className='page-page-wrapper'>
        {sentList ? <div>
          <TimelineNav />        
          <div className="inner-pages-container">
            <div className="inner-pages-container-wrap">

              <div class="friends-tabs-wrap">
                <button id="cursor" onClick={changeToFriends}>Friends</button>
                <button id="cursor" onClick={changeToReceived}>Requests Received</button>
                {/* <button onClick={changeToSent}>Sent</button> */}
                <button id="cursor" class="active" onClick={changeToSent}>Sent</button>
              </div>

              <div className="friend-search-form">
                <div className="c-field firend-search-field">
                  <TextField 
                    id="outlined-basic" 
                    variant="outlined"
                    size='small' 
                    placeholder="Search friends"
                    sx={{
                        width: '340px', "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                                border: "none"
                            }
                        }
                    }}
                  /> 
                  <span className="friend-search-button"><img src={search} alt="search icon" /></span>
                </div> 
              </div>

              <div className="friend-list-container">
                <div className='error'>{sentError}</div>
                {sentList?.friend_requests_sent?.map((item,index)=> {
                   let profileImage = ""
                   if (item.profile_pics != null) {
                     profileImage = item.profile_pics[0];
                     profileImage = `${REACT_APP_CDN_HOST}` + profileImage;
                   }
                  return(
                    <div className="user-row">
                    <div className="u-thumb">
                      <img onClick={()=> {history.push(`/profile/${item.did}`)}} src={profileImage} alt="TheQueen"/>
                    </div>
                    <div className="u-details">
                      <div onClick={()=> {history.push(`/profile/${item.did}`)}} className="u-name">{item.nickname}</div>
                      <div className="a-r-btn-wrap">
                      <Friendbutton did={item.did} is_friend={false} is_friend_requested_to={true} is_friend_requested_from={false}/>

                      </div>
                    </div>
                  </div>  
                  )
                })}
              </div>
            </div>
          </div>
        </div>:<FriendsLoader/>}
          
      </div> 
    );
}

export default CreateClubDetails;
