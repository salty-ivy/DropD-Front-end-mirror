import React, { useEffect, useState } from 'react'
import "./editdatingprofile.css"
import CustomButton from '../../../components/Button/button'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { GET_INTERESTS } from '../../../axios/GET_API'
import { Button } from '@mui/material'
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import { UPDATE_PROFILE } from '../../../axios/POST_API'
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import fail from "../../../assets/images/fail.svg"
import { useHistory } from 'react-router-dom';
import editIcon from "../../../assets/images/edittransparent.svg"
import funny from "../../../assets/images/attributeIcons/caregiver.svg"
import GenderFluid from "../../../assets/images/attributeIcons/GenderFluid.svg"
import GoodParent from "../../../assets/images/attributeIcons/GoodParent.svg"
import HomeMaker from "../../../assets/images/attributeIcons/HomeMaker.svg"
import Homosexual from "../../../assets/images/attributeIcons/Homosexual.svg"
import coupleImageIcon from "../../../assets/images/coupleimage.svg"
import leader from "../../../assets/images/attributeIcons/leader.svg"
import BreadEarner from "../../../assets/images/attributeIcons/BreadEarner.svg"
import caregiver from "../../../assets/images/attributeIcons/caregiver.svg"
import nomad from "../../../assets/images/attributeIcons/nomad.svg"
import passionatelover from "../../../assets/images/attributeIcons/passionatelover.svg"
import Straight from "../../../assets/images/attributeIcons/Straight.svg"
import Thinker from "../../../assets/images/attributeIcons/Thinker.svg"
import TimelineNav from '../../../components/timelinenav/timelineNav'
import seniors from "../../../assets/images/seniors.svg";
import openmarriage from "../../../assets/images/openmarriage.svg";
import coupleimage from "../../../assets/images/openmarriage.svg";
import Money from "../../../assets/images/money.svg";
import notification from "../../../assets/images/notification.svg";
import search from "../../../assets/images/search.svg";



const PersonAttributes = {
  leader: { image: leader, text: "Leader" },
  "bread earner": { image: BreadEarner, text: "Bread Earner" },
  "care giver": { image: caregiver, text: "Care Giver" },
  funny: { image: funny, text: "Funny" },
  "gender fluid": { image: GenderFluid, text: "Gender Fluid" },
  "good parent": { image: GoodParent, text: "Good Parent" },
  homemaker: { image: HomeMaker, text: "Home Maker" },
  homosexual: { image: Homosexual, text: "Homosexual" },
  nomad: { image: nomad, text: "Nomad" },
  "passionate lover": { image: passionatelover, text: "Passionate Lover" },
  thinker: { image: Thinker, text: "Thinker" },
  straight: { image: Straight, text: "Straight" },
};

const zones = {
  "love grounds": coupleimage,
  "open marriage communes": openmarriage,
  "seniors in love again": seniors,
};
function EditDatingProfile({ setSliderPage, interests, setInterests, profileData }) {
  const history = useHistory()
  const [kundliAttributes,setKundliAttributes] = useState()

  const changeGenderPreferences = () => {
    setSliderPage("genderpreferences");
  }
  const changeYourAttribute = () => {
    setSliderPage("attributes");
  }
  const changePartnerAttribute = () => {
    setSliderPage("partnerattributes");
  }
  const changeYourZone = () => {
    setSliderPage("zone");
  }

  const handleNotifications = () => {
    history.push("/notifications")
  }

  const handleWallet = () => {
    history.push("/connectwallet")
  }
  const handleClick = () => {
    // console.log("timeline click",history)
    setSliderPage("index")
  }

  return (
    <div className='page-page-wrapper edit-user-details-page'>
      {/* <TimelineNav /> */}
      <div
        style={{ width: "100vw", height: "65px", backgroundColor: "white" }}
        className="navbar-wrapper"
      >
        <div style={{ display: "flex", width: "60vw" }}>
          <div onClick={handleClick} style={{ position: "relative", top: "20px", left: "15px" }}>
            <img src={leftarrow} alt="back" />
          </div>
          <div style={{ width: "auto" }}>
            <img
              style={{ position: "relative", left: "30px", top: "12px" }}
              id="dropd-logo"
              src={logo}
              alt="dropd-logo"
            />
          </div>
        </div>
        <div style={{ width: "40vw" }}>
          <div
            style={{
              display: "flex",
              float: "right",
              width: "100px",
              justifyContent: "space-evenly",
              position: "relative",
              top: "20px",
            }}
          >
            <div>
              <img onClick={handleNotifications} src={notification} alt="money" />
            </div>
            <div>
              <img onClick={handleWallet} src={Money} alt="money" />
            </div>
            <div>
              <img src={search} alt="money" />
            </div>
          </div>
        </div>
      </div>
      <div className="inner-pages-container">

        <div className="inner-pages-container-wrap">

          <div class="main-wrap">
            <div class="entry-wrap">
              <h1 className="page-title">Edit Dating Profile</h1>
            </div>

            <div class="content-wrap">
              <div className="edit-dating-option-wrap edit-gender-preferences">
                <div className="section-label">Your Gender Preferences</div>
                <div className="selected-dating-option">{profileData?.gender_preference}</div>
                <div className="edit-icon" onClick={changeGenderPreferences}><img src={editIcon} /></div>
              </div>

              <div className="edit-dating-option-wrap edit-your-attr">
                <div className="section-label">Attributes That Carve You</div>

                <div className="attr-row">
                {profileData?.person_kundli_attributes?.map((attribute) => {
                  return (
                    <div class="selected-attr"><img src={PersonAttributes[attribute].image} /> <span>{PersonAttributes[attribute].text}</span></div>
                  );
                })}
                  </div>
                
                <div className="edit-icon" onClick={changeYourAttribute}><img src={editIcon} /></div>
              </div>

              <div className="edit-dating-option-wrap edit-partner-attr">
                <div className="section-label">Attributes of Partner</div>

                <div className="attr-row">
                  {profileData.partner_kundli_attributes.map((attribute)=>{
                    return(<div class="selected-attr"><img src={PersonAttributes[attribute].image} /> <span>{PersonAttributes[attribute].text}</span></div>
                    )
                  })}
                </div>
                <div className="edit-icon" onClick={changePartnerAttribute}><img src={editIcon} /></div>
              </div>

              <div className="edit-dating-option-wrap edit-your-zone">
                <div className="section-label">Mark Your Zone</div>

                <div className="selected-zone">
                  <span className="selected-dating-option">{profileData?.zone}</span>
                  <span><img src={zones[profileData.zone]} /></span>
                </div>
                <div className="edit-icon" onClick={changeYourZone}><img src={editIcon} /></div>
              </div>
            </div>

            <div className="action-button-wrap">
              <CustomButton onClick={() => {setSliderPage("index")}}>Cancel</CustomButton>
              <CustomButton onClick={()=> {setSliderPage("index")}}>Update</CustomButton>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EditDatingProfile;