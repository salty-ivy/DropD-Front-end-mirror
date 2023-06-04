import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import TimelineNav from "../../components/timelinenav/timelineNav";
import coupleimage from "../../assets/images/coupleimage.svg";
import "./clubpage.css";
import PostCard from "../../components/PostCard/PostCard";
import moment from "moment";
import { USER_VIEW_PROFILE, VIEW_CLUB } from "../../axios/GET_API";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { USER_JOIN_CLUB } from "../../axios/POST_API";
import Friendbutton from "../../components/Friendbutton/Friendbutton";
import { CLUB_MEMBER_LIST } from "../../axios/GET_API";
import FloatingToolbar from "../../components/FloatingToolbar";
import SkeletonLoader from "../../components/SkeletonLoader/Profileskeleton/Profileskeleton";

const { REACT_APP_CDN_HOST } = process.env;

function Clubpage() {
  const { cid } = useParams()
  const history = useHistory();
  const [clubData, setClubData] = useState()
  const [skeletonLoader, setSkeletonLoader] = useState(false)
  const [displayMembers, setDisplayMembers] = useState(false)
  const [membersData, setMembersData] = useState()

  const viewClub = async () => {
    try {
      setSkeletonLoader(true)
      let response = await VIEW_CLUB(cid)
      setSkeletonLoader(false)
      console.log(response)
      setClubData(response)
    } catch (error) {
      setSkeletonLoader(false)
      console.log(error)
    }
  }

  const clubMemberList = async () => {
    try {
      let response = await CLUB_MEMBER_LIST(cid)
      setMembersData(response)
      console.log(response, "members response data")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    viewClub()
    clubMemberList()
  }, [])

  const handleJoinClub = async () => {
    try {
      const profileData = await USER_VIEW_PROFILE();
      let response = USER_JOIN_CLUB(profileData.data.did,cid)
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleMembersDisplay = () => {
    setDisplayMembers(true)
  }

  let coverImage = "";
  if (clubData?.data?.club_info?.cover_image != null) {
    coverImage = clubData?.data?.club_info.cover_image;
    coverImage = `${REACT_APP_CDN_HOST}` + coverImage.replace("//", "/");
  }

  let profileImage = "";
  if (clubData?.data?.club_info?.cover_image != null) {
    profileImage = clubData?.data?.club_info.profile_image;
    profileImage = `${REACT_APP_CDN_HOST}` + profileImage.replace("//", "/");
  }

  moment.updateLocale("en", {
    relativeTime: {
      past: "%s",
    },
  });
  let memberSince = moment(clubData?.data?.club_info?.created_at).fromNow();

  return (
    <div className="clubs-page-wrapper">
      {skeletonLoader ? <SkeletonLoader /> : <div>
        <TimelineNav />
        <div className="profiledetails-wrapper">
          <div>
            <img className="profile-cover-image" src={coverImage} alt="avatar" />
          </div>
          <Grid container className="user-timeline">
            <Grid item xs={3}>
              <div className="club-avatar-container">
                <img
                  className="profile-image-container"
                  src={profileImage}
                  alt="avatarimage"
                ></img>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div style={{ width: "250px" }} className="user-name">
                {clubData?.data?.club_info?.club_name}
              </div>
              <div style={{ paddingTop: "5px" }} className="user-time-details">
                Club created {memberSince} ago
              </div>
              <div style={{ display: "flex", paddingTop: "6px" }}>
                <div>
                  <div className="user-time-details">Members</div>
                  <div
                    style={{
                      border: "1px solid #FAF3FF",
                      width: "200px",
                      marginTop: "3px",
                    }}
                  ></div>
                  <div className="user-data">{clubData?.data?.club_info.member_count}</div>
                </div>
              </div>
            </Grid>
            <Grid
              style={{ display: "flex", flexDirection: "column" }}
              item
              xs={4}
            >
              <div>
                {/* <img
                className="couple-image-position"
                src={coupleimage}
                alt="coupleimage"
              /> */}
              </div>
              {clubData?.data?.club_info?.is_member == false &&
                <div>
                  <button onClick={handleJoinClub} className="selected-button-styles"> Join Club</button>
                </div>
              }
              {clubData?.data?.club_info?.is_member == true &&
                <div>
                  <button onClick={() => history.push(`/club/${cid}/createpost`)} className="bg-white border-pink button" style={{ marginTop: "54px" }}> Create Post</button>
                </div>
              }
            </Grid>
          </Grid>
          <div className="club-description">
            <div className="profile-description-text">
              {clubData?.data?.club_info?.description}
            </div>
          </div>
          {clubData?.data?.club_info?.is_member &&
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  paddingTop: "10px",
                  backgroundColor: "#F7F7F7",
                  height: "40px",
                }}
              >
                <button className="club-button">Posts</button>
                <button onClick={handleMembersDisplay} className="club-button">Members</button>
              </div>
              {displayMembers ?
                <div>{membersData?.data?.members?.map((item, index) => {
                  let profileImage = "";
                  if (item.profile_pics != null) {
                    profileImage = item.profile_pics[0];
                    profileImage = `${REACT_APP_CDN_HOST}` + profileImage.replace("//", "/");
                  }

                  return (
                    <Grid container style={{ height: '80px' }}>
                      <Grid item xs={3}><div style={{ width: '60px', height: '60px', borderRadius: '50%', position: 'relative', top: '10px', left: '10px' }}><img className="profile-image-container" style={{ width: '60px', height: '60px', borderRadius: "50%" }} src={profileImage} /></div></Grid>
                      <Grid item xs={4}><div className="nick-name-alignment">{item.nick_name}</div></Grid>
                      <Grid className="club_friend_button-alignment" item xs={4}><div><Friendbutton /></div></Grid>
                    </Grid>)
                })}</div> :
                <div>{clubData?.data?.club_info?.posts.map((item, index) => {
                  let clubPostImage = "";
                  if (clubData?.data?.club_info?.posts[0].images[0] != null) {
                    clubPostImage = clubData?.data?.club_info.posts[0].images[0];
                    clubPostImage = `${REACT_APP_CDN_HOST}` + clubPostImage.replace("//", "/");
                  }

                  let postDate = moment(item.created_at).format("MMM D, h:mm a");
                  moment.updateLocale("en", {
                    relativeTime: {
                      past: "%s",
                    },
                  });

                  return (
                    // <Postcard
                    //   date={postDate}
                    //   image={clubPostImage}
                    //   likes={item.likes}
                    //   comments={item.comments.length}
                    //   shares={item.shares}
                    //   welcometext={item.welcome}
                    // />
                    <PostCard
                      postComments={item.comments.length}
                      post_id={item.pid}
                      did={item.post_from.did}
                      postProfilePic={profileImage}
                      userName={item.post_from.nick_name}
                      postText={item.text}
                      postLikes={item.likes}
                      postImage={clubPostImage}
                      postDate={postDate}
                      memberSince={memberSince}
                      kundliAttributes={item.post_from.kundli_attributes}
                      zone={item.post_from.zone}
                      is_friend={item.post_from.is_friend} 
                      is_friend_requested_to={item.post_from.is_friend_requested_to} 
                      is_friend_requested_from={item.post_from.is_friend_requested_from}
                      is_liked={item.post_from.is_like_to}
                      show_header={false}
                    />
                  );
                })}</div>}

            </div>
          }
        </div>
        {/* <FloatingToolbar /> */}
      </div>}

    </div>
  );
}

export default Clubpage;
