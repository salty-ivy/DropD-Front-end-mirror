import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import TimelineNav from '../../components/timelinenav/timelineNav'
import plusIcon from "../../assets/images/plus.svg"
import CardData from '../../utils/cardData'
import { useHistory } from 'react-router-dom'
import "./clubs.css"
import FloatingToolbar from '../../components/FloatingToolbar'
import { VIEW_ALL_CLUBS } from '../../axios/GET_API'
import { VIEW_MY_CLUBS } from '../../axios/GET_API'
import ClubLoader from '../../components/SkeletonLoader/Clubskeleton/Clubskeleton'
const { REACT_APP_CDN_HOST } = process.env;

function Clubs() {
  const history = useHistory()
  const [allClubsData, setAllClubsData] = useState()
  const [myClub, setMyClub] = useState(false)
  const [myClubData, setMyClubData] = useState()
  const [allClubsError, setAllClubsError] = useState()
  const [myClubsError, setMyClubsError] = useState()
  const [clubNav, setClubNav] = useState()
  const [skeletonLoader, setSkeletonLoader] = useState(false)

  const handleCreate = () => {
    history.push("/createclub")
  }

  const getAllClubs = async () => {
    try {
      setSkeletonLoader(true)
      let response = await VIEW_ALL_CLUBS()
      setSkeletonLoader(false)
      setAllClubsData(response)
      localStorage.setItem("clubs.response", JSON.stringify(response));
    } catch (error) {
      console.log(error)
      setSkeletonLoader(false)
      setAllClubsError(error.response.data.message)
    }
  }


  const getMyClubs = async () => {
    try {
      // setSkeletonLoader(true)
      let response = await VIEW_MY_CLUBS()
      setMyClubData(response)
      // setSkeletonLoader(false)
      if (response.data.club_list.length == "0") {
        setMyClubsError("Seems empty here! join some clubs")
      }
      localStorage.setItem("myClubs.response", JSON.stringify(response));
    } catch (error) {
      setSkeletonLoader(false)
      setMyClubsError(error.response.data.message)
      console.log(error)
    }
  }


  useEffect(() => {
    setClubNav(true)
    setSkeletonLoader(true)
    getAllClubs()
    let _response = localStorage.getItem("myClubs.response");
    if (_response) {
      console.log("local storage response", JSON.parse(_response));
      setMyClubData(JSON.parse(_response));
    }
  }, [])


  useEffect(() => {
    setSkeletonLoader(true)
    let _response = localStorage.getItem("clubs.response");
    if (_response) {
      console.log("local storage response", JSON.parse(_response));
      setAllClubsData(JSON.parse(_response));
      setSkeletonLoader(false)
    }
  }, [])

  useEffect(() => {
    // setSkeletonLoader(true)
    if (allClubsData) {
      console.log("updated timeline", allClubsData);
    }
  }, [allClubsData])

  const handleClubSwitch = () => {
    setMyClub(!myClub)
  }



  useEffect(() => {
    setClubNav(true)
    getMyClubs()
  }, [])

  // const handleClubPage = () => {
  //   history.push
  // }


  return (

    <div className='page-page-wrapper'>
      {skeletonLoader ? <ClubLoader /> : <div> <TimelineNav />
        <div className="inner-pages-container">

          <div className="inner-pages-container-wrap">

            <h1 className="page-title">Clubs</h1>

            <div style={{}} class="create-view-pages-tab-wrap">
              <div>
                <button onClick={handleCreate}> <span className="plus-icon"><img src={plusIcon} /></span>Create Club</button>
                {myClub ? <button onClick={handleClubSwitch}>All Clubs</button> : <button onClick={handleClubSwitch}>My Clubs</button>}
              </div>
            </div>
            <div className="pages-container">
              {myClub ?
                myClubData?.data?.club_list.map((item, index) => {
                  console.log(item.profile_image)
                  let profileImage = "";
                  if (item?.profile_image != null) {
                    profileImage = item?.profile_image;
                    profileImage = `${REACT_APP_CDN_HOST}` + profileImage.replace("//", "/");
                  }

                  let coverImage = "";
                  if (item?.cover_image != null) {
                    coverImage = item?.profile_image;
                    coverImage = `${REACT_APP_CDN_HOST}` + coverImage
                  }
                  return (
                    <div onClick={() => { history.push(`/club/${item.club_id}`) }} className="page-col">
                      <div className="round-icon">
                        <img src={profileImage} />
                      </div>
                      <h3>{item.club_name}</h3>
                      <div className="page-likes">Likes <span className="likesCount">70K</span></div>
                      <div className="page-feature-img">
                        <img src={coverImage} />

                        <button className="like-page-button">Join Club</button>
                      </div>
                    </div>
                  )
                })
                :
                allClubsData?.data?.club_list.map((item, index) => {
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
                    <div onClick={() => { history.push(`/club/${item.club_id}`) }} className="page-col">
                      <div className="round-icon">
                        <img src={AllProfileImage} />
                      </div>
                      <h3>{item.club_name}</h3>
                      <div className="page-likes">Likes <span className="likesCount">70K</span></div>
                      <div className="page-feature-img">
                        <img src={allCoverImage} />
                        <button className="like-page-button">Join Club</button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {myClub ? <div className='error'>{myClubsError}</div>:""}
            {!myClub ? <div className='error'>{allClubsError}</div>:""}
            

          </div>
        </div></div>}
        <FloatingToolbar clubNav={clubNav}/>
    </div>
  );
}

export default Clubs;
