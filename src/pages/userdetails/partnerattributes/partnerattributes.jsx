
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
      setSliderPage("zone");
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
    setSliderPage("person_kundli_attributes")
  }

  return (
    <div className="attribute-wrapper">
      {/* <Userdetailsnav/> */}
      <div className='navbar-wrapper'>
        <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '-15px' }}><img src={leftarrow} alt="back" /></div>
        <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '0px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
      </div>

      <div class="main-wrap">
        <div class="entry-wrap">
          <div className="attribute-text-container">
            <div className="attribute-text">Attributes Of Partner</div>
          </div>
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
                    id="cursor"
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
                  <div class="delete-attr-icon"><img id="cursor" src={deleteIcon} /></div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{marginTop:'40px'}} class="button-wrap">
          <CustomButton onClick={handlePartnerAttributes}>{t("proceed.1")}</CustomButton>
        </div>
      </div>

      {/* <div>{attributePreview}</div> */}
    </div>
  );
}

export default Partnerattributes;