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
import CardData from '../../../utils/cardData'
import Postcard from '../../profilepage/components/postcard/postcard'
import { useHistory } from 'react-router-dom';
import FriendsLoader from '../../../components/SkeletonLoader/Friendskeleton/Friendskeleton';
import "./style.css"

const { REACT_APP_CDN_HOST } = process.env;

function CreateClubDetails({setSliderPage,friendListData,friendListError}) {
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
        {friendListData ? <div>
          <TimelineNav />
          
          <div className="inner-pages-container">

            <div className="inner-pages-container-wrap">

              <div class="friends-tabs-wrap">
                <button id="cursor" class="active" onClick={changeToFriends}>Friends</button>
                <button id="cursor" onClick={changeToReceived}>Requests Received</button>
                <button id="cursor" onClick={changeToSent}>Sent</button>
                {/* <button onClick={changeToSent}>Sent</button> */}

              </div>

              {/* <div className="friend-search-form">
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
              </div> */}

              <div className="friend-list-container">
              <div className='error'>{friendListError}</div>
              {friendListData?.friend_list?.map((item,index) => {
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
                    <div onClick={()=> {history.push(`/profile/${item.did}`)}} className="u-name">{item.nick_name}<span className="verified-icon"><img src={verifiedIcon} /></span></div>
                  </div>
                  <div className="menu-btn">
                    <button><img src={menukebabIcon}/></button>
                  </div>

                  <div className="friend-action-menu-container">
                    <p>Friend since 24th January 2021</p>
                    <div className="friend-action-menu-wrap">
                      <div>Share FLICS with TheQueen</div>
                      <div>Message TheQueen</div>
                      <div>Unfriend TheQueen</div>
                      <div>Unfriend TheQueen</div>
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
