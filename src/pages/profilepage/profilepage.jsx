import React, { useEffect, useState } from "react";
import TimelineNav from "../../components/timelinenav/timelineNav";
import avatar from "../../assets/images/avatar2.jpeg";
import { Grid } from "@mui/material";
import coupleimage from "../../assets/images/coupleimage.svg";
import verified from "../../assets/images/verified.svg";
import leader from "../../assets/images/leader.svg";
import BreadEarner from "../../assets/images/attributeIcons/BreadEarner.svg";
import caregiver from "../../assets/images/attributeIcons/caregiver.svg";
import funny from "../../assets/images/attributeIcons/caregiver.svg";
import GenderFluid from "../../assets/images/attributeIcons/GenderFluid.svg";
import GoodParent from "../../assets/images/attributeIcons/GoodParent.svg";
import HomeMaker from "../../assets/images/attributeIcons/HomeMaker.svg";
import Homosexual from "../../assets/images/attributeIcons/Homosexual.svg";
import nomad from "../../assets/images/attributeIcons/nomad.svg";
import passionatelover from "../../assets/images/attributeIcons/passionatelover.svg";
import Straight from "../../assets/images/attributeIcons/Straight.svg";
import Thinker from "../../assets/images/attributeIcons/Thinker.svg";
import Postcard from "./components/postcard/postcard";
import Clubscard from "./components/clubscard/clubscard";
import PostData from "../../utils/postData";
import { useHistory } from "react-router-dom";
import { GET_ALL_POSTS } from "../../axios/GET_API";
import { GET_PROFILE } from "../../axios/GET_API";
import { USER_VIEW_PROFILE } from "../../axios/GET_API";
import { USER_POST_LIST } from "../../axios/POST_API";
import Profileskeleton from "../../components/SkeletonLoader/Profileskeleton/Profileskeleton"
// import PersonAttributes from '../../utils/attributeIcons'
import { useParams } from "react-router-dom";
import Friendbutton from "../../components/Friendbutton/Friendbutton";
import moment from "moment";
import Likebutton from "../../components/Likebutton/Likebutton";
import FloatingToolbar from "../../components/FloatingToolbar";
import "./profilepage.css";


const { REACT_APP_CDN_HOST } = process.env;

function Profilepage({is_liked}) {
  const { did } = useParams();
  const history = useHistory();

  const PersonAttributes = {
    leader: { image: leader, text: "Leader" },
    "bread earner": { image: BreadEarner, text: "Bread Earner" },
    "care giver": { image: caregiver, text: "Care Giver" },
    funny: { image: funny, text: "Funny" },
    "gender fluid": { image: GenderFluid, text: "Gender Fluid" },
    "good parent": { image: GoodParent, text: "Good Parent" },
    homemaker: { image: HomeMaker, text: "Home Maker" },
    homosexual: { image: Homosexual, text: "Homosexual" },
    nomad: { image: nomad, text: "Nomad" },
    "passionate lover": { image: passionatelover, text: "Passionate Lover" },
    thinker: { image: Thinker, text: "Thinker" },
    straight: { image: Straight, text: "Straight" },
  };

  const [status, setStatus] = useState("posts");
  const [profileData, setProfileData] = useState();
  const [likedProfile, setLikedProfile] = useState()
  const [postList, setPostList] = useState()
  const [friendToggle, setFriendToggle] = useState(false)
  const [skeletonLoader, setSkeletonLoader] = useState(false)

  const handlePost = () => {
    setStatus("posts");
  };
  const handleClub = () => {
    setStatus("clubs");
  };
  const handlePage = () => {
    setStatus("pages");
  };

  const getProfile = async () => {
    // try {
    if (did) {
      setSkeletonLoader(true)
      let response = await GET_PROFILE(did);
      setSkeletonLoader(false)
      console.log(response, "this is the entire profile data");
      setProfileData(response);
    } else {
      setSkeletonLoader(true)
      let response = await USER_VIEW_PROFILE();
      setSkeletonLoader(false)
      console.log(response, "this is the user profile data");
      setProfileData(response);
    }
    //  } catch (error) {
    //   console.log(error, "all posts fetch error");
    // }
  };

  const getAllPosts = async () => {
    handlePost()
    try {
      let response = await USER_POST_LIST(did)
      setPostList(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllPosts()
    getProfile();
  }, [])


  useEffect(() => {
    let item = localStorage.getItem("token");
    if (!item) {
      history.push("/login");
    }
  }, []);


  const renderSections = () => {

    if (status === "posts") {
      return (
        <div>
          {postList?.data?.posts?.map((item, index) => {
            let postImg = "";
            if (item.media_links != null) {
              postImg = item.media_links[0];
              postImg = `${REACT_APP_CDN_HOST}` + postImg.replace("//", "/");
            }
            return (
              <Postcard
                date={item.date}
                image={postImg}
                likes={item.like_count}
                comments={item.comments}
                shares={item.shares}
                welcometext={item.text}
              />
            );
          })}
        </div>
      );
    } else if (status === "clubs") {
      return (
        <div>
          {PostData.map((item, index) => {
            return (
              <Clubscard
                type={item.type}
                name={item.name}
                total={item.total}
                image={item.imgsource}
              />
            );
          })}
        </div>
      );
    } else if (status === "pages") {
      return (
        <div>
          {PostData.map((item, index) => {
            return (
              <Clubscard
                type={item.type2}
                name={item.name2}
                total={item.total2}
                image={item.imgsource}
              />
            );
          })}
        </div>
      );
    }
  };

  let profileImage = "";
  if (profileData?.data?.profile_pics != null) {
    profileImage = profileData?.data?.profile_pics[0];
    profileImage = `${REACT_APP_CDN_HOST}` + profileImage.replace("//", "/");
  }
  moment.updateLocale("en", {
    relativeTime: {
      past: "%s",
    },
  });
  let memberSince = moment(profileData?.data?.joined_at).fromNow();

  return (
    <div className="profile-page-wrapper">
      {skeletonLoader ? <Profileskeleton /> :
        <div><TimelineNav />
          <div className="profiledetails-wrapper">
            <div style={{ minHeight: '200px' }}>
              <img
                className="profile-cover-image"
                src={profileImage}
                alt="avatar"
              />
            </div>
            <Grid container className="user-timeline-details">
              <Grid item xs={3}>
                <div className="avatar-container-box">
                  <img
                    className="profile-image-box"
                    src={profileImage}
                    alt="avatarimage"
                  ></img>
                  <Likebutton did={did} is_liked={profileData?.data?.is_like_to}/>
                </div>

              </Grid>
              <Grid item xs={5}>
                <div style={{ display: "flex" }}>
                  <div className="profile-user-name">
                    {profileData?.data.nick_name}
                  </div>
                  {/* <div className="online-status"></div>
              <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                <img src={verified} alt="verified" />
              </div> */}
                </div>
                <div style={{ paddingTop: "5px" }} className="user-time-details">
                  Member since {memberSince}
                </div>
                <div style={{ display: "flex", paddingTop: "6px" }}>
                  <div>
                    <div className="user-time-details">Total</div>
                    <div className="user-data">30k</div>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <div className="user-time-details">This month</div>
                    <div className="user-data">1089</div>
                  </div>
                </div>
              </Grid>
              <Grid
                style={{ display: "flex", flexDirection: "column" }}
                item
                xs={4}
              >
                <div>
                  <img
                    className="couple-image-position"
                    src={coupleimage}
                    alt="coupleimage"
                  />
                </div>
                <Friendbutton
                  did={did}
                  is_friend={profileData?.data.is_friend}
                  is_friend_requested_to={profileData?.data.is_friend_requested_to}
                  is_friend_requested_from={profileData?.data.is_friend_requested_from}
                />
              </Grid>
            </Grid>
            <div className="profile-description">
              <div className="profile-description-text">
                {profileData?.data.bio}
              </div>
            </div>
            <div
              style={{
                width: "100vw",
                backgroundColor: "white",
                display: "flex",
                paddingTop: "10px",
                paddingBottom: "8px",
                marginBottom:'10px',
                justifyContent: "space-around",
                borderRadius: "0px 0px 17px 17px",
              }}
            >
              {profileData?.data.partner_kundli_attributes.map((attribute) => {
                return (
                  <div className="iconalignment">
                    <div style={{ height: "40px" }}>
                      <img src={PersonAttributes[attribute].image} alt="leader" />
                    </div>
                    <div className="logo-text">
                      {PersonAttributes[attribute].text}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{height:'40px',backgroundColor:'#E1D7F0',borderRadius:"10px 10px 0px 0px"}}>
            <div className="profile-personal-details">
              <div className="personal-details-text">{profileData?.data.age} years old</div>
              <div className="personal-details-text" style={{height:'12px',border:'1px solid #6A7587'}}></div>
              <div className="personal-details-text">married</div>
              <div className="personal-details-text" style={{height:'12px',border:'1px solid #6A7587'}}></div>
              <div className="personal-details-text">New delhi</div>
            </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "20px",
                backgroundColor: "#F7F7F7",
                height: "50px",
              }}
            >
              <button className="profile-button" onClick={handlePost}>
                Posts
              </button>
              <button className="profile-button" onClick={handleClub}>
                Club
              </button>
              <button className="profile-button" onClick={handlePage}>
                Page
              </button>
            </div>
          </div>
          {renderSections()}</div>}
          <FloatingToolbar/>
    </div>
  );
}

export default Profilepage;
