
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../components/Button/button";
import attributes from "../../../utils/attributes";
import kundali from "../../../assets/images/kundali.svg";
import { UPDATE_PROFILE } from "../../../axios/POST_API";
import leader from "../../../assets/images/attributeIcons/leader.svg";
import BreadEarner from "../../../assets/images/attributeIcons/BreadEarner.svg";
import caregiver from "../../../assets/images/attributeIcons/caregiver.svg";
import funny from "../../../assets/images/attributeIcons/caregiver.svg";
import GenderFluid from "../../../assets/images/attributeIcons/GenderFluid.svg";
import GoodParent from "../../../assets/images/attributeIcons/GoodParent.svg";
import HomeMaker from "../../../assets/images/attributeIcons/HomeMaker.svg";
import Homosexual from "../../../assets/images/attributeIcons/Homosexual.svg";
import nomad from "../../../assets/images/attributeIcons/nomad.svg";
import passionatelover from "../../../assets/images/attributeIcons/passionatelover.svg";
import Straight from "../../../assets/images/attributeIcons/Straight.svg";
import Thinker from "../../../assets/images/attributeIcons/Thinker.svg";
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import deleteIcon from "../../../assets/images/deleteattr.svg"
import { useSpinner } from "../../../context/loaderContext/globalSpinnerContext";
import Userdetailsnav from "../../../components/UserDetailsNav/userdetailsnav";
import "./partnerattributes.css";
import { useHistory } from "react-router-dom";
import Money from "../../../assets/images/money.svg";
import notification from "../../../assets/images/notification.svg";
import search from "../../../assets/images/search.svg";
import TimelineNav from '../../../components/timelinenav/timelineNav'


const PartnerAttributes = {
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

function Partnerattributes({ setSliderPage }) {
  const history = useHistory()
  const spinner = useSpinner()
  const [partnerkundliattributes, setPartnerkundliattributes] = useState([]);
  const [attributePreview, setAttributePreview] = useState([]);
  const [attrError,setAttrError] = useState(false)
  const { t, i18n } = useTranslation();

  let items = [];
  const handleChange = (e) => {
    items.push(e.target.value);
    console.log(items);
  };
  
  // let length = partnerkundliattributes.length

  const handlePartnerAttributes = async () => {
    try {
      spinner.setLoadingState(true)
      await UPDATE_PROFILE(
        "partner_kundli_attributes",
        partnerkundliattributes
      );
      spinner.setLoadingState(false)
      setSliderPage("index");
    } catch (error) {
      setAttrError(error.response.data.message)
      spinner.setLoadingState(false)
      console.log(
        error,
        "this is the error in partner attributes updation updation"
      );
    }
  };
  const updatePreview = () => {
    console.log("Starting update", partnerkundliattributes)
    const _preview = partnerkundliattributes.map((item) => {
      return (
        <div className="attribute-icons">
          <img src={PartnerAttributes[item]} />
        </div>
      );
    });
    console.log("Apna preview", _preview);
    setAttributePreview(_preview);
  };
  // useEffect(() => {
  //   updatePreview();
  // }, [partnerkundliattributes]);

  const handleBack =() => {
    setSliderPage("attributes")
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
                <h1 className="page-title">Edit Attributes Of Partner</h1>
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
                            const _attributesArray = partnerkundliattributes;
                            if (_attributesArray.includes(item.text)) return;
                            
                            if (_attributesArray.length < 5) {
                              _attributesArray.push(item.text);
                            }
                            console.log("Hi friends", partnerkundliattributes);
                            updatePreview();
                            setPartnerkundliattributes(_attributesArray);
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
                  <div style={{color:"red",fontSize:"10px",paddingTop:'10px'}}>{attrError}</div>
                </div>
                {/* todo map these according to the items clicked */}
                <div className="attributeicons-position">
                  {partnerkundliattributes.map((item) => {
                    return (
                      <div className="attribute-icons"
                        onClick={() => {
                          if (partnerkundliattributes.includes(item)) {
                            let updatedAttributes = partnerkundliattributes.filter((element) => {
                              if (element != item) return element
                            })
                            setPartnerkundliattributes(updatedAttributes)
                          } 
                        }}
                      >
                        <img src={PartnerAttributes[item]} />
                        <div class="delete-attr-icon"><img src={deleteIcon} /></div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="action-button-wrap">
                <CustomButton onClick={()=>{setSliderPage("index")}}>Cancel</CustomButton>
                <CustomButton onClick={handlePartnerAttributes}>Update</CustomButton>
              </div>
            </div>

          </div>
        </div>
    </div> 

  );
}

export default Partnerattributes;