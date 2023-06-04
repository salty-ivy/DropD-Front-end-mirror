import React, { useState, useEffect } from 'react'
import CustomButton from '../../../components/Button/button'
import { UPDATE_PROFILE_IMAGES } from '../../../axios/POST_API'
import "./style.css"
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext'
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav'
import { Grid } from '@mui/material'
import avatar from "../../../assets/images/avatar.jpeg";
import photoUploadIcon from "../../../assets/images/photouploadplaceholder.svg"
import uploadIcon from "../../../assets/images/uploadicon.svg"
import { useHistory } from 'react-router-dom'
import Money from "../../../assets/images/money.svg";
import notification from "../../../assets/images/notification.svg";
import search from "../../../assets/images/search.svg";
// import logo from "../../assets/images/dropdsmall.svg";
import deleteIcon from "../../../assets/images/deleteattr.svg"
import editIcon from "../../../assets/images/editicon.svg"
import addIcon from "../../../assets/images/addicon.svg"
import TimelineNav from '../../../components/timelinenav/timelineNav'

const { REACT_APP_CDN_HOST } = process.env;


function IndexPage({ setSliderPage, profileData }) {
  const history = useHistory()
  const spinner = useSpinner()
  const [coverImage, setCoverImage] = useState()
  const [coverImageUrl,setCoverImageUrl] = useState()
  const [uploadError, setUploadError] = useState()
  const [profileImage, setProfileImage] = useState()
  const [profileImageUrl, setProfileImageUrl] = useState()
  const allowedImageType = ['image/jpg', 'image/jpeg', 'image/png']
  const [selectedImage1, setSelectedImage1] = useState()
  const [selectedImage1Url,setSelectedImage1Url] = useState()
  const [selectedImage2, setSelectedImage2] = useState()
  const [selectedImage2Url,setSelectedImage2Url] = useState()
  const [selectedImage3, setSelectedImage3] = useState()
  const [selectedImage3Url,setSelectedImage3Url] = useState()
  const [selectedImage4, setSelectedImage4] = useState()
  const [selectedImage4Url,setSelectedImage4Url] = useState()
  const [selectedImage5, setSelectedImage5] = useState()
  const [selectedImage5Url,setSelectedImage5Url] = useState()
  const [selectedImage6, setSelectedImage6] = useState()
  const [selectedImage6Url,setSelectedImage6Url] = useState()
  const [selectedImage7, setSelectedImage7] = useState()
  const [selectedImage7Url,setSelectedImage7Url] = useState()
  const [selectedImage8, setSelectedImage8] = useState()
  const [selectedImage8Url,setSelectedImage8Url] = useState()
  const [selectedImage9, setSelectedImage9] = useState()
  const [selectedImage9Url,setSelectedImage9Url] = useState()
  const [selectedImage10, setSelectedImage10] = useState()
  const [selectedImage10Url,setSelectedImage10Url] = useState()


  const changeInformation = () => {
    setSliderPage("knowbetter");
  }
  const changeIntrests = () => {
    setSliderPage("selectinterest");
  }
  const changeDatingProfile = () => {
    setSliderPage("editdatingprofile");
  }

  const displayUserProfile = () => {
    console.log(profileData, "Line 53")
    let userProfileImage = "";
    let userCoverImage = ""
    let userImage1 = ""
    let userImage2 = ""
    let userImage3 = ""
    let userImage4 = ""
    let userImage5 = ""
    let userImage6 = ""
    let userImage7 = ""
    let userImage8 = ""
    let userImage9 = ""
    let userImage10 = ""

    if (profileData.profile_pics != null) {
      userProfileImage = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[0];
      userCoverImage = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[1];
      userImage1 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[2];
      userImage2 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[3];
      userImage3 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[4];
      userImage4 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[5];
      userImage5 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[6];
      userImage6 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[7];
      userImage7 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[8];
      userImage8 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[9];
      userImage9 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[10];
      userImage10 = `${REACT_APP_CDN_HOST}` + profileData.profile_pics[11];

      setProfileImageUrl(userProfileImage)
      setCoverImageUrl(userCoverImage)
      setSelectedImage1Url(userImage1)
      setSelectedImage2Url(userImage2)
      setSelectedImage3Url(userImage3)
      setSelectedImage4Url(userImage4)
      setSelectedImage5Url(userImage5)
      setSelectedImage6Url(userImage6)
      setSelectedImage7Url(userImage7)
      setSelectedImage8Url(userImage8)
      setSelectedImage9Url(userImage9)
      setSelectedImage10Url(userImage10)
    }

  }

  useEffect(() => {
    if (profileData) {
      displayUserProfile()
    }
  }, [profileData])


  const checkImageFile = (f) => {
    if (f.size > 2000000) { //check size of the file max 2mb
      setUploadError('Image size should be less than 2mb')
      return false
    }

    if (allowedImageType.indexOf(f.type) < 0) {
      setUploadError('Only JPEG and PNG files are allowed')
      return false
    }
    setUploadError('')
    return true
  }

  const selectCoverImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let coverImageUrl = URL.createObjectURL(e.target.files[0])
      setCoverImageUrl(coverImageUrl)
      setCoverImage(e.target.files[0])
    }else{
      alert("invalid file")
    }
    console.log("coverImage",e.target.files)

  };

  const selectProfileImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let profileImageURL = URL.createObjectURL(e.target.files[0])
      setProfileImageUrl(profileImageURL)
      setProfileImage(e.target.files[0])
    }else{
      alert("invalid file")
    }
    console.log("profileimage",e.target.files)
  };

  // console.log(profileImage)
  const selectImage1 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage1Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage1Url(selectedImage1Url)
      setSelectedImage1(e.target.files[0])
    }else{
      alert("invalid file")
    }

  };
  const selectImage2 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage2Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage2Url(selectedImage2Url)
      setSelectedImage2(e.target.files[0])
    }else{
      alert("invalid file")
    }

  };
  const selectImage3 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage3Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage3Url(selectedImage3Url)
      setSelectedImage3(e.target.files[0])
    }else{
      alert("invalid file")
    }
  };

  const selectImage4 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage4Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage4Url(selectedImage4Url)
      setSelectedImage4(e.target.files[0])
    }else{
      alert("invalid file")
    }
  };

  const selectImage5 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage5Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage5Url(selectedImage5Url)
      setSelectedImage5(e.target.files[0])
    }else{
      alert("invalid file")
    }
  };

  const selectImage6 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage6Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage6Url(selectedImage6Url)
      setSelectedImage6(e.target.files[0])
    }else{
      alert("invalid file")
    }
  };

  const selectImage7 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage7Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage7Url(selectedImage7Url)
      setSelectedImage7(e.target.files[0])
    }else{
      alert("invalid file")
    }
  };

  const selectImage8 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage8Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage8Url(selectedImage8Url)
      setSelectedImage8(e.target.files[0])
    }else{
      alert("invalid file")
    }
  };

  const selectImage9 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage9Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage9Url(selectedImage9Url)
      setSelectedImage9(e.target.files[0])
    }else{
      alert("invalid file")
    }
  };

  const selectImage10 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      let selectedImage10Url = URL.createObjectURL(e.target.files[0])
      setSelectedImage10Url(selectedImage10Url)
      setSelectedImage10(e.target.files[0])
    }else{
      alert("invalid file")
    }
  };

  const updateProfilePhotos = async () => {
    let imageFiles = [];
    if (profileImage)
      imageFiles.push(profileImage)
    if (coverImage)
      imageFiles.push(coverImage)
    if (selectedImage1)
      imageFiles.push(selectedImage1);
    if (selectedImage2)
      imageFiles.push(selectedImage2);
    if (selectedImage3)
      imageFiles.push(selectedImage3);
    if (selectedImage4)
      imageFiles.push(selectedImage4);
    if (selectedImage5)
      imageFiles.push(selectedImage5);
    if (selectedImage6)
      imageFiles.push(selectedImage6);
    if (selectedImage7)
      imageFiles.push(selectedImage7);
    if (selectedImage8)
      imageFiles.push(selectedImage8);
    if (selectedImage9)
      imageFiles.push(selectedImage9);
    if (selectedImage10)
      imageFiles.push(selectedImage10);

    if (imageFiles.length > 0) {
      try {
        spinner.setLoadingState(true)
        await UPDATE_PROFILE_IMAGES(imageFiles);
        spinner.setLoadingState(false)
        setSliderPage("index")
      } catch (error) {
        spinner.setLoadingState(false)
        setUploadError(error.response.data.message)
        setUploadError('Something went wrong')
        console.log(error, "upload photo error")
      }
    }
    setUploadError('Select atleast one profile image')
  }

  const handleNotifications = () => {
    history.push("/notifications")
  }

  const handleWallet = () => {
    history.push("/connectwallet")
  }
  const handleClick = () => {
    // console.log("timeline click",history)
    history.push("/menu")
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

          <h1 className="page-title">Edit Profile</h1>

          {/* Edit cover image start*/}
          <div className="upload-cover-image img-btn boxed" style={{ backgroundImage: coverImageUrl ? `url(${coverImageUrl})` : "" }} >
            <div className="edit-icon">
              <label htmlFor="upload-cover-image">
                <img src={editIcon} />
                <input
                  style={{ display: "none" }}
                  id="upload-cover-image"
                  name="upload-cover-image"
                  type="file"
                  onChange={selectCoverImage}
                />
              </label>
            </div>
          </div>
          {/* Edit cover image end*/}

          {/* Edit profile image start*/}
          <div className="upload-profile-image-container">
            <label htmlFor="upload-profile-image">
              <div className="upload-profile-image img-btn boxed" style={{ backgroundImage: profileImageUrl ? `url(${profileImageUrl})` : 'white', }} >
                <div className="photo-icons-wrap">
                  <div style={{position:'relative',top:'40px',left:'20px'}} className="edit-icon">
                    <img src={editIcon} />
                  </div>
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

            <div className="name-wrap" >
              <span className="nick-name">Nick Name</span>
              <span className="name">TheQueen</span>
            </div>
          </div>
          {/* Edit profile image start*/}

          {/* upload gallery image start*/}
          <div className="upload-gallery-images-wrap">
            <span className="section-label">Gallery images</span>
            <div className="row">
              {/* 1 start */}
              <label htmlFor="upload-gallery-image1">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage1Url ? `url(${selectedImage1Url}` : "" }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage1 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image1"
                    name="upload-gallery-image1"
                    type="file"
                    onChange={selectImage1}
                  />
                </div>
              </label>
              {/* 1 end */}

              {/* 2 start */}
              <label htmlFor="upload-gallery-image2">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage2 ? `url(${selectedImage2Url})` : "white", }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage2 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image2"
                    name="upload-gallery-image2"
                    type="file"
                    onChange={selectImage2}
                  />
                </div>
              </label>
              {/* 2 end */}

              {/* 3 start */}
              <label htmlFor="upload-gallery-image3">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage3 ? `url(${selectedImage3Url})` : 'white', }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage3 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image3"
                    name="upload-gallery-image3"
                    type="file"
                    onChange={selectImage3}
                  />
                </div>
              </label>
              {/* 3 end */}

              {/* 4 start */}
              <label htmlFor="upload-gallery-image4">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage4 ? `url(${selectedImage4Url})` : 'white', }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage4 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image4"
                    name="upload-gallery-image4"
                    type="file"
                    onChange={selectImage4}
                  />
                </div>
              </label>
              {/* 4 end */}

              {/* 5 start */}
              <label htmlFor="upload-gallery-image5">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage5 ? `url(${selectedImage5Url})` : 'white', }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage5 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image5"
                    name="upload-gallery-image5"
                    type="file"
                    onChange={selectImage5}
                  />
                </div>
              </label>
              {/* 5 end */}
            </div>
            {/* row one end */}

            <div className="row">
              {/* 1 start */}
              <label htmlFor="upload-gallery-image6">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage6 ? `url(${selectedImage6Url})` : 'white', }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage6 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image6"
                    name="upload-gallery-image6"
                    type="file"
                    onChange={selectImage6}
                  />
                </div>
              </label>
              {/* 1 end */}

              {/* 2 start */}
              <label htmlFor="upload-gallery-image7">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage7 ? `url(${selectedImage7Url})` : 'white', }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage7 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image7"
                    name="upload-gallery-image7"
                    type="file"
                    onChange={selectImage7}
                  />
                </div>
              </label>
              {/* 2 end */}

              {/* 3 start */}
              <label htmlFor="upload-gallery-image8">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage8 ? `url(${selectedImage8Url})` : 'white', }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage8 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image8"
                    name="upload-gallery-image8"
                    type="file"
                    onChange={selectImage8}
                  />
                </div>
              </label>
              {/* 3 end */}

              {/* 4 start */}
              <label htmlFor="upload-gallery-image9">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage9 ? `url(${selectedImage9Url})` : 'white', }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage9 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image9"
                    name="upload-gallery-image9"
                    type="file"
                    onChange={selectImage9}
                  />
                </div>
              </label>
              {/* 4 end */}

              {/* 5 start */}
              <label htmlFor="upload-gallery-image10">
                <div className="upload-gallery-image img-btn boxed" style={{ backgroundImage: selectedImage10 ? `url(${selectedImage10Url})` : 'white', }} >
                  <div className="image-icons-wrap">
                    {
                      selectedImage10 ? <div className="remove-img"><img src={deleteIcon} /></div> : <div className="plus-icon"><img src={addIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-gallery-image10"
                    name="upload-gallery-image10"
                    type="file"
                    onChange={selectImage10}
                  />
                </div>
              </label>
              {/* 5 end */}
            </div>
            {/* row two end */}

          </div>
          {/* upload gallery image start*/}



          <div className="edit-profile-nav-menu">
            <button onClick={changeInformation}>Personal Information</button>
            <button onClick={changeIntrests}>Interests</button>
            <button onClick={changeDatingProfile}>Dating Profile</button>
            <button>Delete Profile</button>
          </div>

          <div className="action-button-wrap">
            <CustomButton onClick={() => { setSliderPage("index") }}>Cancel</CustomButton>
            <CustomButton onClick={updateProfilePhotos}>Update</CustomButton>
          </div>
        </div>

      </div>
    </div>
  )
}

export default IndexPage