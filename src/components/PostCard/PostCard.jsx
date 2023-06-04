import React, { useState } from "react";
import { Grid } from "@mui/material";
import avatar from "../../assets/images/avatar.jpeg";
import verified from "../../assets/images/verified.svg";
import coupleimage from "../../assets/images/coupleimage.svg";
import likeicon from "../../assets/images/likeicon.svg";
import likedicon from "../../assets/images/likedicon.svg";
import message from "../../assets/images/message.svg";
import share from "../../assets/images/share.svg";
import plus from "../../assets/images/plus.svg";
import funny from "../../assets/images/funny.svg";
import leader from "../../assets/images/leader.svg";
import nomad from "../../assets/images/nomad.svg";
import caregiver from "../../assets/images/caregiver.svg";
import passionatelover from "../../assets/images/passionatelover.svg";
import BreadEarner from "../../assets/images/attributeIcons/BreadEarner.svg";
import GenderFluid from "../../assets/images/attributeIcons/GenderFluid.svg";
import GoodParent from "../../assets/images/attributeIcons/GoodParent.svg";
import HomeMaker from "../../assets/images/attributeIcons/HomeMaker.svg";
import Homosexual from "../../assets/images/attributeIcons/Homosexual.svg";
import Straight from "../../assets/images/attributeIcons/Straight.svg";
import Thinker from "../../assets/images/attributeIcons/Thinker.svg";
import seniors from "../../assets/images/seniors.svg";
import openmarriage from "../../assets/images/openmarriage.svg";
import { LIKE_POST } from "../../axios/POST_API";
import { useHistory } from "react-router-dom";
import likeprofile from "../../assets/images/likeprofile.svg"
import userunlike from "../../assets/images/userunlike.svg"
import { LIKE_PROFILE } from "../../axios/POST_API";
import { FRIEND_REQUEST } from "../../axios/POST_API";
import Likebutton from "../Likebutton/Likebutton"
import Friendbutton from "../../components/Friendbutton/Friendbutton";
import { useParams } from "react-router-dom";
import "./PostCard.css";

const colorArray = ["#E0BBE4", "#957DAD", "#86AED1", "#AEBC6E", "#E3F0CE", "#DCF0F4"]

function PostCard({
  post_id,
  userName,
  postText,
  postComments,
  postLikes,
  postImage,
  postDate,
  postProfilePic,
  memberSince,
  kundliAttributes,
  zone,
  liked,
  did,
  is_liked,
  is_friend,
  is_friend_requested_to,
  is_friend_requested_from,
  show_header
}) {
  const [displayTraits, setDisplayTraits] = useState(false);
  const [likedPost, setLikedPost] = useState(false);
  const [friendToggle, setFriendToggle] = useState(false)
  const [likedProfile, setLikedProfile] = useState(false)
  const [friendState, setFriendState] = useState()
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

  const zones = {
    "love grounds": coupleimage,
    "open marriage commune": openmarriage,
    "seniors in love again": seniors,
  };


  const handleTraits = () => {
    setDisplayTraits(!displayTraits);
  };

  const handleLikeClick = (e, pid) => {
    try {
      LIKE_POST(pid).then((likeResponse) => {
        console.log(likeResponse);
        if (likeResponse === true) {
          //fill the like image with red
          setLikedPost(!likedPost);
        } else {
          alert(likeResponse);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  if (liked === true) {
    setLikedPost(true);
  }

  return (
    <div className="timeline-card-wrapper">
      {show_header !== false &&
        <div>
          <Grid container className="user-timeline-details">
            <Grid item xs={3}>
              <div
                id="cursor"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "30px",
                  backgroundColor: "pink",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              >
                {postProfilePic && <img
                  onClick={(e) => {
                    history.push(`/profile/${did}`);
                  }}
                  className="postcard-profile-pic"
                  id="cursor"
                  style={{ height: "60px", width: "60px", borderRadius: "30px", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
                  src={postProfilePic}
                  alt=""
                ></img>}
                <Likebutton did={did} is_liked={is_liked} />
              </div>

            </Grid>
            <Grid item xs={5}>
              <div style={{ display: "flex" }}>
                <div onClick={(e) => {
                  history.push(`/profile/${did}`);
                }} className="user-name" id="cursor">{userName}</div>
                {/* <div style={{ height: '8px', width: '8px', backgroundColor: '#90EE90', borderRadius: '5px', marginTop: '17px', marginLeft: '10px' }}>
                            </div>
                            <div style={{ paddingTop: "10px", paddingLeft: '10px' }}>
                                <img src={verified} alt='verified' />
                            </div> */}
              </div>
              <div style={{ paddingTop: "5px" }} className="user-time-details">
                Member since {memberSince}
              </div>
              <div style={{ display: "flex", paddingTop: "6px" }}>
                <div>
                  <div className="user-time-details">Total</div>
                  <div className="user-data">70k</div>
                </div>
                <div style={{ paddingLeft: "30px" }}>
                  <div className="user-time-details">This month</div>
                  <div className="user-data">1749</div>
                </div>
              </div>
            </Grid>
            <Grid style={{ display: "flex", flexDirection: "column" }} item xs={4}>
              <div style={{ height: '40px' }}>
                <img
                  style={{
                    float: "right",
                    paddingRight: "20px",
                    paddingTop: "10px",
                  }}
                  src={zones[zone]}
                  alt="coupleimage"
                />
              </div>
              <Friendbutton
                did={did}
                is_friend={is_friend}
                is_friend_requested_to={is_friend_requested_to}
                is_friend_requested_from={is_friend_requested_from}
              />


              <div
                onClick={handleTraits}
                style={{
                  position: "relative",
                  right: "80%",
                  top: "12%",
                  transform: "translate(-100%,-50%)",
                }}
              >
                <img id="cursor" src={plus} />
              </div>
            </Grid>
          </Grid>
          {displayTraits ? (
            <div
              id="cursor"
              style={{
                // width: "100vw",
                backgroundColor: "white",
                display: "flex",
                paddingTop: "10px",
                paddingBottom: "8px",
                justifyContent: "space-around",
                boxShadow: "0px 4px 11px rgba(0, 0, 0, 0.06)",
                borderRadius: "0px 0px 17px 17px",
              }}
            >
              {kundliAttributes.map((attribute) => {
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
          ) : (
            ""
          )}
        </div>
      }
      {/* Post content begins */}
      {typeof postText != "undefined" &&
        <div>
          {!postImage ?
            <div
              style={{
                // width: "100vw",
                textAlign: 'center',
                backgroundColor: `${colorArray[Math.floor(Math.random() * colorArray.length)]}`,
                padding: "100px 20px",
                minHeight: "40px",
                boxSizing: 'border-box',
                // backgroundColor: "white",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  color: "#6A7587",
                  fontSize: "20px",
                  fontWeight: "400",

                }}
              >
                {postText}
              </div>
            </div> : <div
              style={{
                width: "90%",
                minHeight: "50px",
                boxSizing: 'border-box',
                backgroundColor: "white",
                marginTop: "15px",
                paddingBottom: '10px'
              }}
            >
              <div
                style={{
                  color: "#6A7587",
                  fontSize: "16px",
                  minHeight: '50px',
                  fontWeight: "400",
                  position: "relative",
                  left: "20px",
                  top: "5px",
                  paddingBottom: '10px'
                }}
              >
                {postText}
              </div>
            </div>}
        </div>}


      {postImage && <div style={{ height: "auto" }} className="card-body-image">
        <img src={postImage} alt="avatarimage" />
      </div>}

      <div className="card-footer-wrapper">
        <div
          style={{ paddingLeft: "10px", paddingTop: "3px" }}
          className="user-time-details"
        >
          {postDate}
        </div>
        <div>
          <img
            id="cursor"
            src={likedPost === true ? likedicon : likeicon}
            alt="like"
            onClick={(e) => handleLikeClick(e, post_id)}
          />
          <span className="card-footer-details">{postLikes}</span>
        </div>
        <div>
          <img id="cursor"
            onClick={(e) => {
              history.push(`/comments/${post_id}`);
            }}
            src={message}
            alt="like"
          />
          <span className="card-footer-details">{postComments}</span>
        </div>
        <div style={{ paddingRight: "20px" }}>
          <img id="cursor" src={share} alt="like" />
          <span className="card-footer-details">356</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
