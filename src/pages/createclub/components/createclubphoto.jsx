import React, { useState } from "react";
import CustomButton from "../../../components/Button/button";
import TimelineNav from "../../../components/timelinenav/timelineNav";
import photoUploadIcon from "../../../assets/images/photouploadplaceholder.svg";
import uploadIcon from "../../../assets/images/uploadicon.svg";
import deleteIcon from "../../../assets/images/deleteicon.svg";
import { CREATE_CLUB } from "../../../axios/POST_API";
import { USER_VIEW_PROFILE } from "../../../axios/GET_API";
import { useHistory } from "react-router-dom";
import { useSpinner } from "../../../context/loaderContext/globalSpinnerContext";
import "./createclubphoto.css";
// import FloatingToolbar from '../../components/FloatingToolbar'

function CreateClubPhoto({clubName,description,interests}) {
  const spinner = useSpinner()
  const history = useHistory()
  const [profileImage, setProfileImage] = useState()
  const [coverImage, setCoverImage] = useState()
  const [uploadError, setUploadError] = useState()
  const [clubId,setClubId] = useState()
  const allowedImageType = ['image/jpg', 'image/jpeg', 'image/png']
  const [open,setOpen] = useState(false)
  const checkImageFile = (f) => {
    if (f.size > 2000000) {
      //check size of the file max 2mb
      setUploadError("Image size should be less than 2mb");
      return false;
    }

    if (allowedImageType.indexOf(f.type) < 0) {
      setUploadError("Only JPEG and PNG files are allowed");
      return false;
    }
    setUploadError("");
    return true;
  };

  const selectProfileImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (checkImageFile(e.target.files[0]) === true) {
      //check size of the file max 2mb
      setProfileImage(e.target.files[0]);
    }
  };

  const selectCoverImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (checkImageFile(e.target.files[0]) === true) {
      //check size of the file max 2mb
      setCoverImage(e.target.files[0]);
    }
  };
   
  const createClub = async () => {
    if (coverImage == null) {
      setUploadError("Please upload cover image");
    } else if (profileImage == null) {
      setUploadError("Please upload profile image");
    } else {
      try {
        spinner.setLoadingState(true);
        let profileData = await USER_VIEW_PROFILE();
        let response = await CREATE_CLUB(
          profileData.data.did,
          clubName,
          description,
          profileImage,
          coverImage,
          interests
        );
        console.log(response, "this is the respone of club create");
        setClubId(response?.data?.club_info?.club_id);
        spinner.setLoadingState(false);
        history.push(`club/${response?.data?.club_info?.club_id}`);
      } catch (error) {
        setUploadError(error?.response?.data.message);
        spinner.setLoadingState(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="page-page-wrapper">
      <TimelineNav />
      {open ? (
            <div style={{position:'absolute',right:'5vw'}} className="claim-subscription-popup">
              <span>
                Pay 10 DRPD to create club
              </span>
              <CustomButton style={{width:"50%"}} onClick={createClub}>Create Club</CustomButton>
            </div>
          ) : (
            ""
          )}
      <div className="inner-pages-container">

<div className="inner-pages-container-wrap">

  <h1 className="page-title">Create a Club</h1>

  <div class="create-club-progress-wrap">
    <div className="active"></div>
    <div className="active"></div>
  </div>

  <div className="create-club-container">

    <div className="upload-club-photo-wrap">

      <div class="upload-profile-image-container">
        <label htmlFor="upload-profile-image">
          <div className="upload-profile-image img-btn boxed" style={{ backgroundImage: profileImage ? `url(${URL.createObjectURL(profileImage)})` : 'white',}} >
            <div className="photo-icons-wrap">
                {
                  profileImage ? "" : <div style={{position:'relative',top:'15px'}} class="upload-img-icon"><img src={uploadIcon} /></div>
                }
            </div>

            <input
              style={{ display: "none" }}
              id="upload-profile-image"
              name="upload-profile-image"
              type="file"
              onChange={selectProfileImage}
            />

          </div>
        </label>

        <span id="club-pro-upload-lbl">Upload Profile Image</span>
      </div>

      <label htmlFor="upload-cover-image">
        <div className="upload-cover-image img-btn boxed" style={{ backgroundImage: coverImage ? `url(${URL.createObjectURL(coverImage)})` : 'white',}} >
          <div style={{position:"relative",top:'100px'}} className="photo-icons-wrap">
              {
                coverImage ? "" : <div class="placeholder-icon"><img src={photoUploadIcon} /></div>
              }
              {
                coverImage ? <div class="delete-img-icon icon-btm-right"><img style={{position:'relative',top:'100px'}} src={deleteIcon} /></div> : <div id="club-cover-upload-lbl"><img src={uploadIcon} /><span>Upload cover image</span></div>
              }
          </div>

          <input
            style={{ display: "none" }}
            id="upload-cover-image"
            name="upload-cover-image"
            type="file"
            onChange={selectCoverImage}
          />

        </div>
      </label>
      <div className='error'>{uploadError}</div>
    </div>
  </div>
  <div className="button-wrap">
      <CustomButton onClick={()=>{setOpen(true)}}>Create Club</CustomButton>
  </div>
</div>

</div>
</div> 
);
}

export default CreateClubPhoto;
