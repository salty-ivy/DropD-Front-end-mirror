import React, { useState, useEffect } from 'react'
import { Grid, skeletonClasses } from '@mui/material'
import TimelineNav from '../../components/timelinenav/timelineNav'
import plusIcon from "../../assets/images/plus.svg"
import CardData from '../../utils/cardData'
import Postcard from '../profilepage/components/postcard/postcard'
import { useHistory } from 'react-router-dom'
import { VIEW_ALL_PAGES, VIEW_MY_PAGES } from '../../axios/GET_API'
import "./pages.css"
import FloatingToolbar from '../../components/FloatingToolbar'
import ClubLoader from '../../components/SkeletonLoader/Clubskeleton/Clubskeleton'

const { REACT_APP_CDN_HOST } = process.env;


function Pages() {
  const history = useHistory()
  const [allPageData, setAllPageData] = useState()
  const [myPageData, setMyPageData] = useState()
  const [myPage, setMyPage] = useState(false)
  const [myPageError, setMyPageError] = useState()
  const [allPageError,setAllPageError] = useState()
  const [skeletonLoader, setSkeletonLoader] = useState(false)
  const [pageNav,setPagenav] = useState()
  const handleCreate = () => {
    history.push("/createpage")
  }

  const getAllPages = async () => {
    setSkeletonLoader(true)
    try {
      let response = await VIEW_ALL_PAGES()
      setAllPageData(response)
      setSkeletonLoader(false)
      localStorage.setItem("pages.response", JSON.stringify(response));
    } catch (error) {
      console.log(error)
      setSkeletonLoader(false)
      setAllPageError(error.response.data.message)
    }
  }

  const getMyPages = async () => {
    try {
      setSkeletonLoader(true)
      let response = await VIEW_MY_PAGES()
      // setSkeletonLoader(false)
      if(response.data.pages.length=="0"){
        setMyPageError("Seems empty here! Like some Pages")
      }
      setMyPageData(response)
    } catch (error) {
      setSkeletonLoader(false)
      setMyPageError(error.response.data.message)
      console.log(error)
    }
  }
  useEffect(() => {
    setPagenav(true)
    setSkeletonLoader(true)
    getAllPages()
    let _response = localStorage.getItem("pages.response");
    if (_response) {
      console.log("local storage response", JSON.parse(_response));
      setAllPageData(JSON.parse(_response));

    }
    getMyPages()
  }, [])

  useEffect(() => {
    if (allPageData) {
      // skeleton.setLoadingState(false);
      console.log("updated timeline", allPageData);
      setSkeletonLoader(false)
    }
  }, [allPageData])

  const handlePageSwitch = () => {
    setMyPage(!myPage)
  }
  


  return (
    <div className='page-page-wrapper'>
      {skeletonLoader ? <ClubLoader/>:<div>
      <TimelineNav />
      <div className="inner-pages-container">
        <div className="inner-pages-container-wrap">
          <h1 className="page-title">Pages</h1>
          <div class="create-view-pages-tab-wrap">
            <div>
              <button onClick={handleCreate}> <span className="plus-icon"><img src={plusIcon} /></span>Create Page</button>
              {myPage ?  <button onClick={handlePageSwitch}>All Pages</button>:<button onClick={handlePageSwitch}>My Pages</button>}           
            </div>
          </div>
          <div className="pages-container">
            {myPage ?
              myPageData?.data?.pages.map((item, index) => {
                let myProfileImage = "";
                if (item?.profile_image != null) {
                  myProfileImage = item?.profile_image;
                  myProfileImage = `${REACT_APP_CDN_HOST}` + myProfileImage.replace("//", "/");
                }
                let myCoverImage = "";
                if (item?.cover_image != null) {
                  myCoverImage = item?.profile_image;
                  myCoverImage = `${REACT_APP_CDN_HOST}` + myCoverImage
                }
                return (
                  <div onClick={() => { history.push(`/page/${item.page_id}`) }} className="page-col">
                    <div className="round-icon">
                      <img src={myProfileImage} />
                    </div>
                    <h3>{item.page_name}</h3>
                    <div className="page-likes">Likes <span className="likesCount">70K</span></div>
                    <div className="page-feature-img">
                      <img src={myCoverImage} />
                      <button className="like-page-button">Like Page</button>
                    </div>
                  </div>
                )
              }) :
              allPageData?.data?.pages.map((item, index) => {
                let AllProfileImage = "";
                if (item?.profile_image != null) {
                  AllProfileImage = item?.profile_image;
                  AllProfileImage = `${REACT_APP_CDN_HOST}` + AllProfileImage.replace("//", "/");
                }

                let allCoverImage = "";
                if (item?.cover_image != null) {
                  allCoverImage = item?.profile_image;
                  allCoverImage = `${REACT_APP_CDN_HOST}` + allCoverImage
                }
                return (
                  <div onClick={() => { history.push(`/page/${item.page_id}`) }} className="page-col">
                    <div className="round-icon">
                      <img src={AllProfileImage} />
                    </div>
                    <h3>{item.page_name}</h3>
                    <div className="page-likes">Likes <span className="likesCount">70K</span></div>
                    <div className="page-feature-img">
                      <img src={allCoverImage} />
                      <button className="like-page-button">Like Page</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {myPage ? <div className='error'>{myPageError}</div>:""}
          {!myPage ? <div className='error'>{allPageError}</div>:""}
          
        </div>
      </div></div>}
      <FloatingToolbar pageNav={pageNav} />
    </div>
  );
}

export default Pages;
