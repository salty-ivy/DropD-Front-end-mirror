import React, { useState } from 'react'
import CustomButton from '../../../components/Button/button'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import photoUploadIcon from "../../../assets/images/photouploadplaceholder.svg"
import uploadIcon from "../../../assets/images/uploadicon.svg"
import deleteIcon from "../../../assets/images/deleteicon.svg"
import { CREATE_PAGE } from '../../../axios/POST_API';
import { useHistory } from 'react-router-dom';
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext';
import "./createpagephoto.css"
// import FloatingToolbar from '../../components/FloatingToolbar'

function CreatePagePhoto({ pageName, description }) {
  const spinner = useSpinner()
  const history = useHistory()
  const [profileImage, setProfileImage] = useState()
  const [coverImage, setCoverImage] = useState()
  const [uploadError, setUploadError] = useState()
  const [clubId, setClubId] = useState()
  const allowedImageType = ['image/jpg', 'image/jpeg', 'image/png']

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

  const selectProfileImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      setProfileImage(e.target.files[0])
    }
  };

  const selectCoverImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      setCoverImage(e.target.files[0])
    }
  };


  const createPage = async () => {
    if (coverImage == null) {
      setUploadError("Please upload the cover image")
    } else if (profileImage == null) {
      setUploadError("Please upload profile image")
    } else {
      try {
        spinner.setLoadingState(true)
        let response = await CREATE_PAGE(pageName, description, profileImage, coverImage)
        console.log(response, "this is the respone of page create")
        console.log(response?.data?.page.page_id)
        spinner.setLoadingState(false)
        history.push(`/page/${response?.data?.page?.page_id}`)

      } catch (error) {
        setUploadError(error?.response.data.message)
        spinner.setLoadingState(false)
        console.log(error)
      }
    }
  }

  return (
    <div className='page-page-wrapper'>
      <TimelineNav />
      <div className="inner-pages-container">
        <div className="inner-pages-container-wrap">
          <h1 className="page-title">Create a Page</h1>
          <div class="create-club-progress-wrap">
            <div className="active"></div>
            <div className="active"></div>
          </div>
          <div className="create-club-container">
            <div className="upload-club-photo-wrap">
              <div class="upload-profile-image-container">
                <label htmlFor="upload-profile-image">
                  <div className="upload-profile-image img-btn boxed" style={{ backgroundImage: profileImage ? `url(${URL.createObjectURL(profileImage)})` : "" }} >

                    <input
                      style={{ display: "none" }}
                      id="upload-profile-image"
                      name="upload-profile-image"
                      type="file"
                      onChange={selectProfileImage}
                    />
                    {
                      profileImage ? "" : <div class="upload-img-icon"><img style={{ position: 'relative', right: '0px', top: '20px', zIndex: '1000' }} src={uploadIcon} /></div>
                    }
                  </div>
                </label>
                <div className="photo-icons-wrap">
                  {
                    profileImage ? <div style={{ position: "relative", top: '40px', left: '-15px' }} className="delete-img-icon icon-btm-right"><img onClick={() => { setProfileImage(null) }} src={deleteIcon} /></div> : ""
                  }
                </div>
                <span id="club-pro-upload-lbl">Upload Profile Image</span>
              </div>
              <div>
                <label htmlFor="upload-cover-image">
                  <div className="upload-cover-image img-btn boxed" style={{ backgroundImage: coverImage ? `url(${URL.createObjectURL(coverImage)})` : '', }} >
                    <input
                      style={{ display: "none" }}
                      id="upload-cover-image"
                      name="upload-cover-image"
                      type="file"
                      onChange={selectCoverImage}
                    />
                    <div style={{position:'relative',top:'100px'}} className="photo-icons-wrap">
                    {
                      coverImage ? "" : <div style={{ position: 'relative' }} className="placeholder-icon"><img src={photoUploadIcon} /></div>
                    }
                    {
                      !coverImage ? <div id="club-cover-upload-lbl"><img src={uploadIcon} /><span>Upload cover image</span></div>:""
                    }
                  </div>  
                  </div>              
                </label>
                <div className="photo-icons-wrap">
                  {
                    coverImage ? <div style={{ position: "relative", bottom: "50px", left: "140px" }} className="delete-img-icon icon-btm-right"><img onClick={() => { setCoverImage(null) }} src={deleteIcon} /></div> : ""
                  }
                </div>
              </div>

              <div style={{ paddingLeft: '10px' }} className='error'>{uploadError}</div>
            </div>
          </div>
          <div className="button-wrap">
            <CustomButton onClick={createPage}>Create Page</CustomButton>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CreatePagePhoto;
