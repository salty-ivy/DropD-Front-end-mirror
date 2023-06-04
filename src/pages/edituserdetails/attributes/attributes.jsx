import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/Button/button'
import attributes from '../../../utils/attributes';
import kundali from "../../../assets/images/kundali.svg"
import { UPDATE_PROFILE } from '../../../axios/POST_API';
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import leader from "../../../assets/images/attributeIcons/leader.svg"
import BreadEarner from "../../../assets/images/attributeIcons/BreadEarner.svg"
import caregiver from "../../../assets/images/attributeIcons/caregiver.svg"
import funny from "../../../assets/images/attributeIcons/caregiver.svg"
import GenderFluid from "../../../assets/images/attributeIcons/GenderFluid.svg"
import GoodParent from "../../../assets/images/attributeIcons/GoodParent.svg"
import HomeMaker from "../../../assets/images/attributeIcons/HomeMaker.svg"
import Homosexual from "../../../assets/images/attributeIcons/Homosexual.svg"
import nomad from "../../../assets/images/attributeIcons/nomad.svg"
import passionatelover from "../../../assets/images/attributeIcons/passionatelover.svg"
import Straight from "../../../assets/images/attributeIcons/Straight.svg"
import Thinker from "../../../assets/images/attributeIcons/Thinker.svg"
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import deleteIcon from "../../../assets/images/deleteattr.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav';
import "./attributes.css"
import { useHistory } from 'react-router-dom';
import TimelineNav from '../../../components/timelinenav/timelineNav'
import Money from "../../../assets/images/money.svg";
import notification from "../../../assets/images/notification.svg";
import search from "../../../assets/images/search.svg";


const PersonAttributes = {
  Leader: leader,
  "Bread Earner": BreadEarner,
  "Care Giver": caregiver,
  Funny: funny,
  "Gender Fluid": GenderFluid,
  "Good Parent": GoodParent,
  "Homemaker": HomeMaker,
  Homosexual: Homosexual,
  Nomad: nomad,
  "Passionate Lover": passionatelover,
  Thinker: Thinker,
  Straight,
};

function Attributes({ setSliderPage,profileData }) {
  const history = useHistory()
  const spinner = useSpinner()
  const { t, i18n } = useTranslation();
  const [personkundliattributes, setPersonkundliattributes] = useState([]);
  const [attributePreview, setAttributePreview] = useState([]);
  const [attributeError,setAttributeError] = useState()

  let items = [];
  const handleChange = (e) => {
    items.push(e.target.value);
    console.log(items);
  };
  const handlePersonAttributes = async () => {
    try {
      spinner.setLoadingState(true)
      await UPDATE_PROFILE(
        "person_kundli_attributes",
        personkundliattributes
      );
      spinner.setLoadingState(false)
      setSliderPage("index");
    } catch (error) {
      spinner.setLoadingState(false)
      setAttributeError(error.response.data.message)
      console.log(
        error,
        "this is the error in person attributes updation updation"
      );
    }
  };

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


  console.log(personkundliattributes,"ye person attributes hai")
  const updatePreview = () => {
    console.log("Starting update", personkundliattributes)
    const _preview = personkundliattributes.map((item) => {
      return (
        <div className="attribute-icons">
          <img src={PersonAttributes[item]} />
        </div>
      );
    });
    console.log("Apna preview", _preview);
    setAttributePreview(_preview);
  };

  const handleBack = () => {
    setSliderPage("genderpreferences")
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
                <h1 className="page-title">Edit Attributes That Carve You</h1>
                <div className="attribute-description">
                  Select 5 attributes you are looking in your partners kundali
                </div>
              </div>
              <div class="content-wrap">
                <div className="attribute-container">
                  <img src={kundali} alt="kundali" usemap="#image-map" />
                  <map name="image-map">
                    {attributes.map((item, index) => {
                      return (
                        <area
                          onClick={() => {
                            const _attributesArray = personkundliattributes;
                            if (_attributesArray.includes(item.text)) return;
                            if (_attributesArray.length < 5) {
                              _attributesArray.push(item.text);
                            }
                            console.log("Hi friends", personkundliattributes);
                            updatePreview();
                            setPersonkundliattributes(_attributesArray);
                            // partnerkundliattributes.push(item.text)
                          }}
                          alt={item.text}
                          title=""
                          value={item.text}
                          coords={item.coordinates}
                          shape="poly"
                        />
                      );
                    })}
                  </map>
                  <div style={{color:"red",fontSize:"10px",paddingLeft:'20px'}}>{attributeError}</div>
                </div>
                
                {/* todo map these according to the items clicked */}
                <div className="attributeicons-position">
                  {personkundliattributes.map((item) => {
                    return (
                      <div className="attribute-icons"
                        onClick={() => {
                          if (personkundliattributes.includes(item)) {
                            let updatedAttributes = personkundliattributes.filter((element) => {
                              if (element != item) return element
                            })
                            setPersonkundliattributes(updatedAttributes)
                          } 
                        }}
                      >
                        <img src={PersonAttributes[item]} />
                        <div class="delete-attr-icon"><img src={deleteIcon} /></div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="action-button-wrap">
                <CustomButton onClick={()=>{setSliderPage("index")}}>Cancel</CustomButton>
                <CustomButton onClick={handlePersonAttributes}>Update</CustomButton>
              </div>
            </div>
          </div>

        </div>
    </div> 

  );


}

export default Attributes