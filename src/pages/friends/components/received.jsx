import React, { useState } from 'react'
import CustomButton from '../../../components/Button/button'
import { Grid } from '@mui/material'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import avatar from "../../../assets/images/avatar.jpeg";
import verifiedIcon from "../../../assets/images/verified.svg"
import menukebabIcon from "../../../assets/images/menukebab.svg"
import search from "../../../assets/images/search.svg";
import CardData from '../../../utils/cardData'
import Postcard from '../../profilepage/components/postcard/postcard'
import Friendbutton from '../../../components/Friendbutton/Friendbutton';
import FriendsLoader from '../../../components/SkeletonLoader/Friendskeleton/Friendskeleton';
import { useHistory } from 'react-router-dom';
import "./style.css"
// import FloatingToolbar from '../../components/FloatingToolbar'

const { REACT_APP_CDN_HOST } = process.env;


function CreateClubDetails({ setSliderPage, friendRequestData, friendRequestError }) {
  const history = useHistory()
  const { t, i18n } = useTranslation();

  const changeToFriends = () => {
    setSliderPage("friendlist");
  }
  const changeToReceived = () => {
    setSliderPage("requestreceived");
  }
  const changeToSent = () => {
    setSliderPage("requestsent");
  }

  return (
    <div className='page-page-wrapper'>
      {friendRequestData ? <div>
        <TimelineNav />
      <div className="inner-pages-container">
        <div className="inner-pages-container-wrap">

          <div class="friends-tabs-wrap">
            <button id="cursor" onClick={changeToFriends}>Friends</button>
            <button id="cursor" class="active" onClick={changeToReceived}>Requests Received</button>
            <button id="cursor" onClick={changeToSent}>Sent</button>
            
          </div>
          <div className="friend-list-container">
          <div className='error'>{friendRequestError}</div>
            {friendRequestData?.friend_requests.map((item, index) => {
              let profileImage=""
              if (item.profile_pics != null) {
                profileImage = item.profile_pics[0];
                profileImage = `${REACT_APP_CDN_HOST}` + profileImage;
              }
              return (
                <div className="user-row">
                  <div className="u-thumb">
                    <img onClick={()=>{history.push(`/profile/${item.did}`)}} src={profileImage} alt="img" />
                  </div>
                  <div className="u-details">
                    <div onClick={()=>{history.push(`/profile/${item.did}`)}} className="u-name">{item.nickname} <span className="verified-icon"><img src={verifiedIcon} /></span></div>
                    <div className="a-r-btn-wrap">
                     <Friendbutton did={item.did} is_friend={false} is_friend_requested_to={false} is_friend_requested_from={true}/>
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
