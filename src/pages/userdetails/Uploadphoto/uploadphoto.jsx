import React, { useState } from 'react'
import CustomButton from '../../../components/Button/button'
import { UPDATE_PROFILE_IMAGES } from '../../../axios/POST_API'
import "./uploadphoto.css"
import { useSpinner } from '../../../context/loaderContext/globalSpinnerContext'
import leftarrow from "../../../assets/images/leftarrow.svg"
import logo from "../../../assets/images/dropdsmall.svg"
import Userdetailsnav from '../../../components/UserDetailsNav/userdetailsnav'
import { Grid } from '@mui/material'
import photoUploadIcon from "../../../assets/images/photouploadplaceholder.svg"
import uploadIcon from "../../../assets/images/uploadicon.svg"
import deleteIcon from "../../../assets/images/deleteicon.svg"


function Uploadphoto({ setSliderPage }) {
  const spinner = useSpinner()
  const [selectedImage1, setSelectedImage1] = useState()
  const [selectedImage2, setSelectedImage2] = useState()
  const [selectedImage3, setSelectedImage3] = useState()
  const [selectedImage4, setSelectedImage4] = useState()
  const [uploadError, setUploadError] = useState()
  const allowedImageType = ['image/jpg', 'image/jpeg', 'image/png']


  const checkImageFile = (f) => {
    if (f.size > 5000000) { //check size of the file max 2mb
      setUploadError('Image size should be less than 5mb')
      return false
    }

    if (allowedImageType.indexOf(f.type) < 0) {
      setUploadError('Only JPEG and PNG files are allowed')
      return false
    }
    setUploadError('')
    return true
  }

  const selectImage1 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }


    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      setSelectedImage1(e.target.files[0])
    }

  };
  const selectImage2 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      setSelectedImage2(e.target.files[0])
    }

  };
  const selectImage3 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      setSelectedImage3(e.target.files[0])
    }
  };
  const selectImage4 = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    if (checkImageFile(e.target.files[0]) === true) { //check size of the file max 2mb
      setSelectedImage4(e.target.files[0])
    }
  };

  const uploadPhoto = async () => {
    // spinner.setLoadingState(true)
    let imageFiles = [];
    if (selectedImage1)
      imageFiles.push(selectedImage1);
    if (selectedImage2)
      imageFiles.push(selectedImage2);
    if (selectedImage3)
      imageFiles.push(selectedImage3);
    if (selectedImage4)
      imageFiles.push(selectedImage4);

    if (imageFiles.length > 0) {
      try {
        spinner.setLoadingState(true)
        await UPDATE_PROFILE_IMAGES(imageFiles);
        spinner.setLoadingState(false)
        setSliderPage("nick_name")
      } catch (error) {
        console.log(error, "upload photo error")
        spinner.setLoadingState(false)
        if (error.response) {
          setUploadError(error.response.data.message)
        } else {
          setUploadError('There is an error in uploading the image. Please select a different image or contact our support staff.')
        }
      }
    }

  }
  const handleBack = () => {
    setSliderPage("interests")
  }

  return (
    <div className='uploadphoto-wrapper'>
      {/* <Userdetailsnav/> */}
      <div className='navbar-wrapper'>
        <div onClick={handleBack} style={{ position: 'relative', top: '20px', left: '-15px' }}><img src={leftarrow} alt="back" /></div>
        <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '0px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
      </div>

      <div class="main-wrap">
        <div class="entry-wrap">
          <div className='uploadphoto-text-container'>
            <div className='uploadphoto-text'>
              Upload Photo
            </div>
          </div>

          <div className='uploadphoto-description'>Upload profile photo. Multiple photos will have more advantage</div>
        </div>

        <div class="content-wrap">
          <div className='upload-photo-container'>

            <div id="cursor" class="upload-photo-wrap">
              <label htmlFor="upload-document1">
                <div className="upload-img-btn img-btn boxed" style={{ backgroundColor: "white", backgroundImage: selectedImage1 ? `url(${URL.createObjectURL(selectedImage1)})` : '', }} >
                  <div style={{ position: 'relative', top: '35%' }} className="photo-icons-wrap">
                    {
                      selectedImage1 ? "" : <div class="placeholder-icon"><img src={photoUploadIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-document1"
                    name="upload-document1"
                    type="file"
                    onChange={selectImage1}
                  />
                  {
                    !selectedImage1 ? <div class="upload-img-icon icon-btm-right"><img style={{ float: 'right', position: 'relative', top: '125px', right: '10px' }} src={uploadIcon} /></div> : ""
                  }
                </div>
              </label>
              <div style={{ position: "relative", bottom: '50px', float: 'right', right: "10px" }} className="photo-icons">
                {
                  selectedImage1 ? <div class="delete-img-icon icon-btm-right"><img onClick={() => { setSelectedImage1(null) }} src={deleteIcon} /></div> : ""
                }
              </div>
            </div>

            <div id="cursor" class="upload-photo-wrap">
              <label htmlFor="upload-document2">
                <div className="upload-img-btn img-btn boxed" style={{ backgroundColor: "white", backgroundImage: selectedImage2 ? `url(${URL.createObjectURL(selectedImage2)})` : '', }}>
                  <div style={{ position: 'relative', top: '35%' }} className="photo-icons-wrap">
                    {
                      selectedImage2 ? "" : <div class="placeholder-icon"><img src={photoUploadIcon} /></div>
                    }
                  </div>

                  <input
                    style={{ display: "none" }}
                    id="upload-document2"
                    name="upload-document2"
                    type="file"
                    onChange={selectImage2}
                  />
                  {
                    !selectedImage2 ? <div class="upload-img-icon icon-btm-right"><img style={{ float: 'right', position: 'relative', top: '125px', right: '10px' }} src={uploadIcon} /></div> : ""
                  }
                </div>
              </label>
              <div style={{ position: "relative", bottom: '50px', float: 'right', right: "10px" }} className="photo-icons">
                {
                  selectedImage2 ? <div class="delete-img-icon icon-btm-right"><img onClick={() => { setSelectedImage2(null) }} src={deleteIcon} /></div> : ""
                }
              </div>
            </div>

            <div id="cursor" class="upload-photo-wrap">
              <label htmlFor="upload-document3">
                <div className="upload-img-btn img-btn boxed" style={{ backgroundImage: selectedImage3 ? `url(${URL.createObjectURL(selectedImage3)})` : "", }}>
                  <div style={{ position: 'relative', top: '35%' }} className="photo-icons-wrap">
                    {
                      selectedImage3 ? "" : <div class="placeholder-icon"><img src={photoUploadIcon} /></div>
                    }
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-document3"
                    name="upload-document3"
                    type="file"
                    onChange={selectImage3}
                  />
                  {
                    !selectedImage3 ? <div class="upload-img-icon icon-btm-right"><img style={{ float: 'right', position: 'relative', top: '125px', right: '10px' }} src={uploadIcon} /></div> : ""
                  }
                  <div onClick={() => { setSelectedImage3(null) }} style={{ position: "relative", top: '170px', float: 'right', right: "10px" }} className="photo-icons">
                    {
                      selectedImage3 ? <div class="delete-img-icon icon-btm-right"><img onClick={() => { setSelectedImage3(null) }} src={deleteIcon} /></div> : ""
                    }
                  </div>
                </div>
              </label>
            </div>
            <div id="cursor" class="upload-photo-wrap">
              <label htmlFor="upload-document4">
                <div className="upload-img-btn img-btn boxed" style={{ backgroundImage: selectedImage4 ? `url(${URL.createObjectURL(selectedImage4)})` : "", }}>
                  <div style={{ position: 'relative', top: '35%' }} className="photo-icons-wrap">
                    {
                      selectedImage4 ? "" : <div class="placeholder-icon"><img src={photoUploadIcon} /></div>
                    }
                  </div>
                  <div>{!selectedImage4 ? <div style={{ position: 'relative', float: 'right', top: "125px", right: '10px' }} class="upload-img-icon icon-btm-right"><img src={uploadIcon} /></div> : ""}
                  </div>
                  <input
                    style={{ display: "none" }}
                    id="upload-document4"
                    name="upload-document4"
                    type="file"
                    onChange={selectImage4}
                  />
                  <div onClick={() => { setSelectedImage4(null) }} style={{ position: "relative", top: '170px', float: 'right', right: "10px" }} className="photo-icons">
                    {
                      selectedImage4 ? <div class="delete-img-icon icon-btm-right"><img onClick={() => { setSelectedImage4(null) }} src={deleteIcon} /></div> : ""
                    }
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className='error'>{uploadError}</div>
        </div>

        <div class="button-wrap">
          <CustomButton onClick={uploadPhoto}>proceed</CustomButton>
        </div>

      </div>

    </div>
  )
}

export default Uploadphoto