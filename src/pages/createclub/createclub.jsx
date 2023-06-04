import React, { useState, useEffect } from 'react'
import Postcard from '../profilepage/components/postcard/postcard'
import { CREATE_CLUB } from '../../axios/POST_API'
// import "./createclub.css"
import CreateClubDetails from './components/createclubdetails'
import CreateClubPhoto from './components/createclubphoto'
import { GET_INTERESTS } from '../../axios/GET_API'
import FloatingToolbar from '../../components/FloatingToolbar'

function CreateClub() {

  const [sliderPage, setSliderPage] = useState()
  const [clubName,setClubName] = useState();
  const [description,setDescription] = useState()
  const [interests,setInterests] = useState()


  useEffect(() => {
      setSliderPage("details");
  }, []);

  console.log(clubName)
  console.log(description)
  const renderSlider = () => {
      switch (sliderPage) {

          case "details":
              return (
                  <CreateClubDetails
                      setSliderPage={setSliderPage}
                      setClubName={setClubName}
                      clubName={clubName}
                      description={description}
                      setDescription={setDescription}
                      setInterests={setInterests}
                      interests = {interests}
                      
                  />
              );
          case "photo":
              return (
                  <CreateClubPhoto
                      clubName={clubName}
                      interests={interests}
                      description={description}
                      setSliderPage={setSliderPage}
                  />
              );
          default:
              return "foo";
      }
  }
  return (
      <div style={{display: 'flex', flexDirection: 'column',}}>
          {/* <div className='navbar-wrapper'>
              <div style={{ position: 'relative', top: '20px', left: '15px' }}><img src={leftarrow} alt="back" /></div>
              <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '30px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
          </div> */}
          {/* <Userdetailsnav/> */}
          {renderSlider()}
      </div>
  )
}

export default CreateClub;
