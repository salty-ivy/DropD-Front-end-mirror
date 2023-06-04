import React, { useState, useEffect } from 'react'
// import Postcard from '../profilepage/components/postcard/postcard'
// import { CREATE_Page } from '../../axios/POST_API'
// import "./createclub.css"
import CreatePageDetails from '../createpage/createpagedetails'
import CreatePagePhoto from '../createpage/createpagephotos'


function CreatePage() {

  const [sliderPage, setSliderPage] = useState()
  const [pageName,setPageName] = useState();
  const [description,setDescription] = useState()

  useEffect(() => {
      setSliderPage("pagedetails");
  }, []);

  console.log(pageName)
  console.log(description)
  const renderSlider = () => {
      switch (sliderPage) {

          case "pagedetails":
              return (
                  <CreatePageDetails
                      pageName={pageName}
                      description={description}
                      setSliderPage={setSliderPage}
                      setPageName={setPageName}
                      setDescription={setDescription}
                  />
              );
          case "pagephoto":
              return (
                  <CreatePagePhoto
                      pageName={pageName}
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

export default CreatePage;
