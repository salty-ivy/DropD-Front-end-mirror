import React, { useEffect, useState } from "react";
import avatar from "../../assets/images/avatar.jpeg";
import "./timeline.css";
import Simpleinput from "../../components/simpleinput/simpleinput";
// import Timelinecard from "./timelinecard/timelinecard";
import PostCard from "../../components/PostCard/PostCard";
import TimelineNav from "../../components/timelinenav/timelineNav";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSpinner } from "../../context/loaderContext/globalSpinnerContext";
import { GET_TIMELINE } from "../../axios/GET_API";
import { LIKE_POST } from "../../axios/POST_API";
import SkeletonLoader from "../../components/SkeletonLoader/skeletonLoader";
import { useSkeleton } from "../../context/skeletoncontext/skeletoncontext";
import { useParams } from "react-router-dom";
import FloatingToolbar from "../../components/FloatingToolbar";
import RetrieveToken from "../../utils/HelperFunctions/RetrieveToken";

const { REACT_APP_CDN_HOST } = process.env;

function Timeline() {
  const { did } = useParams();
  const skeleton = useSkeleton();
  const spinner = useSpinner();
  const history = useHistory();
  const [timeline, setTimeline] = useState();
  const [timelineError,setTimelineError] = useState()
  const [timelineNav,setTimelineNav] = useState()

  
  const timelineData = async () => {
    try {
      let response = await GET_TIMELINE();
      setTimeline(response);
      if(response?.data?.posts.length == 0){
        setTimelineError("No posts to show")
      }
      var temp_tl = response;
      temp_tl.data.is_profile_complete = true;
      localStorage.setItem("timeline.response", JSON.stringify(temp_tl));
      skeleton.setLoadingState(false);
    } catch (error) {
      skeleton.setLoadingState(false)
      console.log(error, "this is the timeline error");
      setTimelineError("No posts to show")
    }
  };

  const likePost = (pid) => {
    try {
      LIKE_POST(pid);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfile = () => {
    history.push(`/profile`);
  };

  const handlePost = () => {
    history.push("/createpost");
  };

  useEffect(() => {
    setTimelineNav(true)
    skeleton.setLoadingState(true);
    let item = localStorage.getItem("token");
    if (!item) {
      history.push("/login");
    }
    let _response = localStorage.getItem("timeline.response");
    if (_response) {
      console.log("local storage response", JSON.parse(_response));
      setTimeline(JSON.parse(_response));

    }
    timelineData();
  }, []);

  useEffect(() => {
    if (timeline) {   
      console.log(timeline?.data.is_profile_complete, 'line 85')
      if(timeline?.data.is_profile_complete == false){
        history.push("/userdetails/"+timeline?.data.incomplete_profile_label)
      }
      skeleton.setLoadingState(false);
      console.log("updated timeline", timeline); 
    }

  }, [timeline])
  
  let userProfileImage = "";
  if (timeline?.data?.user_profile?.profile_pics != null) {
    userProfileImage = timeline?.data?.user_profile?.profile_pics[0];
    userProfileImage =
      `${REACT_APP_CDN_HOST}` + userProfileImage.replace("//", "/");
  }
  

  return (
    <div className="timeline-container">
      {skeleton.isLoading ? (
        <SkeletonLoader />
      ) : (
        <div>
          <TimelineNav />
          <div className="search-box-container">
            <div
              onClick={handlePost}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="input-container-box"><div className="input-text">Whats on your mind ?</div></div>
            </div>
            <div onClick={handleProfile} className="avatar-container">
              <img
                id="cursor"
                className="avatar-image"
                src={userProfileImage}
                alt="avatar"
              ></img>
            </div>
          </div>
          <div>
            {timeline?.data?.posts?.map((item, index) => {
              let postImg = "";
              if (item.images != null) {
                postImg = item.images[0];
                postImg = `${REACT_APP_CDN_HOST}` + postImg;
              }

              let profileImage = "";
              if (item.post_from.profile_pics != null) {
                profileImage = item.post_from.profile_pics[0];
                profileImage =
                  `${REACT_APP_CDN_HOST}` + profileImage.replace("//", "/");
              }
              let postDate = moment(item.created_at).format("MMM D, h:mm a");
              moment.updateLocale("en", {
                relativeTime: {
                  past: "%s",
                },
              });
              let memberSince = "";
              memberSince = moment(item.post_from.joined_at).fromNow();
              return (
                <div style={{ marginBottom: "5px" }}>
                  <PostCard
                    postComments={item.comments.length}
                    post_id={item.pid}
                    did={item.post_from.did}
                    postProfilePic={profileImage}
                    userName={item.post_from.nick_name}
                    postText={item.text}
                    postLikes={item.likes}
                    postImage={postImg}
                    postDate={postDate}
                    memberSince={memberSince}
                    kundliAttributes={item.post_from.kundli_attributes}
                    zone={item.post_from.zone}
                    is_friend={item.post_from.is_friend} 
                    is_friend_requested_to={item.post_from.is_friend_requested_to} 
                    is_friend_requested_from={item.post_from.is_friend_requested_from}
                    is_liked={item.post_from.is_like_to}
                  />
                </div>
              );
            })}
          </div>
          {/* <div style={{color:'red',paddingBottom:'50px'}}>{timelineError}</div> */}
          <FloatingToolbar timelineNav={timelineNav} setTimelineNav={setTimelineNav}/>
        </div>
      )}
      <div className="timeline_error">{timelineError}</div>
    </div>
  );
}

export default Timeline;