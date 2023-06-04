import React, { useState } from 'react'
import TimelineNav from '../timelinenav/timelineNav'
import "./CreatePost.css"
import { TextField } from '@mui/material'
import CustomButton from '../Button/button'
import photoupload from "../../assets/images/photoupload.svg"
import { CREATE_POST } from '../../axios/POST_API'
import { useHistory } from 'react-router-dom'
import opencamera from "../../assets/images/opencamera.svg"
import { useSpinner } from '../../context/loaderContext/globalSpinnerContext'

import axios from 'axios'
const { REACT_APP_API_HOST } = process.env;

function CreatePost({clubID, pageID}) {
  const spinner = useSpinner()
  const history=useHistory()
  const [selectedImage, setSelectedImage] = useState()
  const [postImage, setPostImage] = useState()
  const [postText, setPostText] = useState()
  const [postStatus,setPostStatus] = useState()
  const [statusClass,setStatusClass] = useState("error")


  // const imageUpload = (e) => {
  //   setPostImage(e.target.files)
  // }

  const handlePostMessage = (e) => {
    setPostText(e.target.value)
    console.log(postText)
  }
  const selectImage1 = (e) => {
    setPostImage(e.target.files)
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    setSelectedImage(e.target.files[0])
  };

  const handlePostPublish = async() => {
    console.log(pageID,clubID,"line 40")
    try{
      if(clubID !== false){
        spinner.setLoadingState(true)
        await CREATE_POST(postImage, postText, clubID, false)
        spinner.setLoadingState(false)
      }else if( pageID !== false ){
        spinner.setLoadingState(true)
        await CREATE_POST(postImage, postText, false, pageID)
        spinner.setLoadingState(false)
      }else{
        spinner.setLoadingState(true)
        await CREATE_POST(postImage, postText, false, false)
        spinner.setLoadingState(false)
      }
      setStatusClass("success")
      setPostStatus("Post created Successfully")
      setTimeout(()=>{
        history.push("/timeline")
      },2000)
    }catch(error){
      console.log(error,"post creation error")
      setStatusClass("error")
      setPostStatus("Post creation failed")
    }
  }

  return (
    <div className='create-post-wrapper'>
      {/* <TimelineNav /> */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", paddingTop: '20px', flexDirection: 'column' }}>
        <div>
          <TextField style={{ backgroundColor: 'white', borderRadius: '10px 10px 0px 0px' }}
            id="outlined-basic"
            variant="outlined"
            size='small'
            onChange={handlePostMessage}
            // value={postText}
            multiline
            sx={{
              width: '323px', height: '80px', "& .MuiOutlinedInput-root": {
                "& > fieldset": {
                  border: "none"
                }
              }
            }}
          />
        </div>
        <div style={{ width: '323px', height: '250px', backgroundColor: 'white', backgroundImage: selectedImage ? `url(${URL.createObjectURL(selectedImage)})` : 'white', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', borderRadius: '10px' }} className="img-btn boxed">
        </div>
        <div style={{ width: '323px', height: '40px', backgroundColor: 'white', borderRadius: '0px 0px 10px 10px' }}>
          <div style={{ color: '#AFAFAF', fontSize: '10px', fontWeight: '400', paddingLeft: '20px' }}>Popular #tags</div>

        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '323px',display:"flex",paddingLeft:'50px' }}>
          <div> 
            <label htmlFor="upload-document">
            <input
              style={{ display: "none" }}
              id="upload-document"
              name="upload-document"
              type="file"
              onChange={selectImage1}
            />
            <img
              style={{ position: 'relative', top: '10px' }}
              src={photoupload}
              alt=""
              className="arrow"
            />
          </label></div>
          <div>
          {/* <input type="file" accept="image/*" capture="camera"/> */}
            <img style={{ position: 'relative', top: '8px',left:'20px' }} src={opencamera} alt="img"/>
          </div>
        </div>
      </div>
      <div style={{ position:'absolute',transform:"translate(-50%,-50%)",left:'50%',top:'80%', width: '300px' }} className='button-wrap'>
        <CustomButton onClick={handlePostPublish}>Publish</CustomButton>
      </div>
      <div style={{ position:'absolute',transform:"translate(-50%,-50%)",left:'50%',top:'90%',fontSize:'12px'}} className={statusClass}>{postStatus}</div>
    </div>
  )
}

export default CreatePost