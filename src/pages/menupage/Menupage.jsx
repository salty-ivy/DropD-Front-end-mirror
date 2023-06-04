import React, { useState, useEffect } from 'react'
import TimelineNav from '../../components/timelinenav/timelineNav'
import { useHistory } from 'react-router-dom'
import FloatingToolbar from '../../components/FloatingToolbar'
import avatar from "../../assets/images/avatar.jpeg"
import flickslogo from "../../assets/images/flickslogo.svg"
import viewmatchicon from "../../assets/images/viewmatchicon.svg"
import dropdmenulogo from '../../assets/images/dropdmenulogo.svg'
import friendslogo from '../../assets/images/friendslogo.svg'
import "./Menupage.css"
import { USER_VIEW_PROFILE } from '../../axios/GET_API'
import { Grid } from '@mui/material'
const { REACT_APP_CDN_HOST } = process.env;

function Menupage() {
  const [menuNav, setMenuNav] = useState()
  const [profileData, setProfileData] = useState()
  const history = useHistory()

  const handleLogout = () => {
    localStorage.removeItem("token")
    history.push("/login")
  }

  const getProfile = async () => {
    let response = await USER_VIEW_PROFILE()
    console.log(response)
    setProfileData(response?.data)
  }

  useEffect(() => {
    setMenuNav(true)
    getProfile()
  }, [])

  let userProfileImage = "";
  if (profileData?.profile_pics != null) {
    userProfileImage = profileData?.profile_pics[0];
    userProfileImage =
      `${REACT_APP_CDN_HOST}` + userProfileImage.replace("//", "/");
  }


  return (
    <div className='menu-page-wrapper'>
      <TimelineNav />
      <div className='menu-profile-container'>
        <Grid container>
          <Grid item xs={3}><div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: "pink", position: 'relative', top: '20px', left: "15px" }}><img style={{ width: '60px', height: '60px', borderRadius: "50%", objectFit: 'cover' }} src={userProfileImage} /></div></Grid>
          <Grid item xs={9}>
            <div className='menu-profiledetail-box'>
              <div style={{ color: '#484848', fontSize: '16px', fontWeight: '600' }}>{profileData?.full_name}</div>
              <div style={{ color: '#6A7587', fontSize: '12px', fontWeight: '400' }}>Profile</div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid style={{ marginTop: '20px' }} container>
          <Grid className='menu-item-box' item xs={6}>
            <div onClick={() => { history.push("/friends") }} className='menu-item-box-inner'><div className='menu-item-text'><span className='menu-icon-alignment'><img src={friendslogo} /></span>Friends</div></div>
          </Grid>
          <Grid className='menu-item-box' item xs={6}>
            <div className='menu-item-box-inner'><div className='menu-item-text'><span className='menu-icon-alignment'><img src={dropdmenulogo} /></span>Wallet</div></div>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid style={{ marginTop: '20px' }} container>
          <Grid className='menu-item-box' item xs={6}>
            <div className='menu-item-box-inner'><div className='menu-item-text'><span className='menu-icon-alignment'><img src={viewmatchicon} /></span>Viewmatch</div></div>
          </Grid>
          <Grid className='menu-item-box' item xs={6}>
            <div className='menu-item-box-inner'><div className='menu-item-text'><span className='menu-icon-alignment'><img src={flickslogo} /></span>Flics</div></div>
          </Grid>
        </Grid>
      </div>
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='menu-line'></div>
        </div>
        <div className='menu-item-text-2'>Notifications</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='menu-line'></div>
        </div>
        <div onClick={() => { history.push("/edituserdetails") }} className='menu-item-text-2'>Settings</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='menu-line'></div>
        </div>
        <div onClick={handleLogout} className='menu-item-text-2'>Logout</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='menu-line'></div>
        </div>
      </>
      <FloatingToolbar menuNav={menuNav} />
    </div>
  )
}

export default Menupage