// import React from 'react'
import TimelineNav from "../../components/timelinenav/timelineNav";
import avatar from "../../assets/images/avatar.jpeg";
import avatar2 from "../../assets/images/avatar2.jpeg";
import verified from "../../assets/images/verified.svg";
import coupleimage from "../../assets/images/coupleimage.svg";
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
import moment from "moment";
import "./viewmatch.css";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Grid } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router-dom";
import { GET_VIEWMATCH, USER_VIEW_PROFILE } from "../../axios/GET_API";
import { GET_SWIPES, RECORD_SWIPE } from "../../axios/web3/swipe";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import TinderCard from "react-tinder-card";
import FloatingToolbar from "../../components/FloatingToolbar";
import CustomButton from "../../components/Button/button";
import { MANAGED_PAY_SWIPES } from "../../axios/POST_API";
import { useSpinner, UseSpinnerProvider } from "../../context/loaderContext/globalSpinnerContext";
import { useWallet } from "../../context/wallet/WalletContext";
import { GET_ACCOUNT } from "../../axios/POST_API";
import { MANAGED_SEND_GIFT } from "../../axios/POST_API";
import { sendGift } from "../../web3/interactions";
import { FRIEND_REQUEST } from "../../axios/POST_API";
import Friendbutton from "../../components/Friendbutton/Friendbutton";
import { LIKE_PROFILE } from "../../axios/POST_API";
const { REACT_APP_CDN_HOST } = process.env;

const db = [
  {
    name: "Richard Hen",
    url: require("../../assets/images/avatar.jpeg"),
  },
  {
    name: "Erlich Bachman",
    url: "./img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "./img/monica.jpg",
  },
  {
    name: "Jared Dunn",
    url: "./img/jared.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "./img/dinesh.jpg",
  },
];

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

function Viewmatch() {
  const history = useHistory();
  const spinner = useSpinner();
  const wallet = useWallet();
  const { account, active, activate } = useWeb3React();
  const [open, setOpen] = useState(false);
  const [openAddFriendPopup, setOpenAddFriendPopup] = useState(false)
  const [viewMatch, setViewMatch] = useState();
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState("left");
  const [remaining, setRemaining] = useState(null);
  const [viewmatchNav, setViewMatchNav] = useState();
  const [did, setDid] = useState();
  const [matchPopup, setMatchPopup] = useState(false);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  useEffect(() => {
    setViewMatchNav(true);
    // getViewMatch();
  }, []);
  useEffect(() => {
    getSwipes();
  }, []);

  useEffect(() => {
    if (remaining === 0) {
      setOpen(true);
      return;
    }
  }, [remaining]);

  useEffect(() => {
    if (currentIndex === -1) {
      setMatchPopup(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    let item = localStorage.getItem("token");
    if (!item) {
      history.push("/login");
    }
  }, []);

  // const outOfFrame = (name, idx) => {
  //   console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
  //   // handle the case in which go back is pressed before card goes outOfFrame
  //   currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  //   // TODO: when quickly swipe and restore multiple times the same card,
  //   // it happens multiple outOfFrame events are queued and the card disappear
  //   // during latest swipes. Only the last outOfFrame event should be considered valid
  // };

  // const swipe = async (dir) => {
  //   const profileData = await USER_VIEW_PROFILE();
  //   await RECORD_SWIPE(profileData.data.did)
  //   setRemaining(remaining=>remaining-1)
  //   if (canSwipe && currentIndex < db.length) {
  //     await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
  //   }
  //   alert(`you have ${remaining - 1} left`)
  // };

  // increase current index and show card
  // const goBack = async () => {
  //   if (!canGoBack) return;
  //   const newIndex = currentIndex + 1;
  //   updateCurrentIndex(newIndex);
  //   await childRefs[newIndex].current.restoreCard();
  // };
  const swiped = async (direction, nameToDelete, index) => {
    setRemaining((remaining) => remaining - 1);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (!did) {
      const profileData = await USER_VIEW_PROFILE();
      setDid(profileData.data.did);
      await RECORD_SWIPE(profileData.data.did);
    } else {
      await RECORD_SWIPE(did);
    }

    // await getSwipes()
  };

  const getViewMatch = async () => {
    try {
      spinner.setLoadingState(true);
      let response = await GET_VIEWMATCH();
      console.log(response, "viewmatch response");
      setViewMatch(response);
    } catch (error) {
      console.log(error, "this is the viewmatch error");
    } finally {
      spinner.setLoadingState(false);
    }
  };
  const handleLockFunds = async () => {
    try {
      spinner.setLoadingState(true);
      if (wallet.selectedWallet == "DROPD") {
        const profileData = await USER_VIEW_PROFILE();
        await MANAGED_PAY_SWIPES(profileData.data.did);
        setRemaining(10);
        setOpen(false);
        getViewMatch();
      } else {
        alert("coming soon");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const getSwipes = async () => {
    try {
      wallet.setSelectedWallet("DROPD");
      spinner.setLoadingState(true);
      let _did = did;
      if (!_did) {
        const profileData = await USER_VIEW_PROFILE();
        setDid(profileData.data.did);
        _did = profileData.data.did;
      }
      const _swipes = await GET_SWIPES(_did);
      setRemaining(_swipes);
      if (_swipes > 0) {
        setOpen(false);
        await getViewMatch();
      }
      // alert(`you have ${_swipes} left`)
    } catch (error) {
      alert(error);
    } finally {
      spinner.setLoadingState(false);
    }
  };

  return (
    <div>
      {/* <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      /> */}
      <div className="cardContainer">
        <TimelineNav />
        {open ? (
          <div
            style={{
              zIndex: 9,
              position: "absolute",
              transform: "translate(-50%,-50%)",
              left: '50%',
              top: '50%',
              height: "500px",
              backgroundColor: "rgba(78, 50, 146, 0.96)",
            }}
            className="claim-subscription-popup"
          >
            <span
              style={{ fontSize: "36px", color: "white", paddingTop: "20%" }}
            >
              Top Up to view more matches
            </span>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "16px",
                color: "white",
              }}
            >
              You have 245 more matches
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "16px",
                color: "white",
                paddingTop: "50%",
              }}
            >
              10 for 10 views
            </div>
            <div style={{ paddingTop: "5%" }}>
              <CustomButton style={{ width: "100%" }} onClick={handleLockFunds}>
                Top Up
              </CustomButton>
            </div>
          </div>
        ) : (
          ""
        )}
        {matchPopup ? (
          <div
            style={{
              zIndex: 9,
              position: "absolute",
              transform: "translate(-50%,-50%)",
              left: '50%',
              top: '50%',
              height: "500px",
              backgroundColor: "rgba(78, 50, 146, 0.96)",
            }}
            className="claim-subscription-popup"
          >
            <span
              style={{ fontSize: "36px", color: "white", paddingTop: "20%" }}
            >
              No More Matches Left
            </span>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "16px",
                color: "white",
              }}
            >
              Comeback Later
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                fontSize: "16px",

                paddingTop: "50%",
              }}
            >
              <CustomButton style={{ width: "100%" }} onClick={handleLockFunds}>
                Find a Matchmaker
              </CustomButton>
            </div>
            <div
              style={{
                paddingTop: "5%",
                color: "white",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Starts from 100 DRPD/Month
            </div>
          </div>
        ) : (
          ""
        )}



        {viewMatch?.data.matches.map((item, index) => {
          let profileImage = "";
          if (item.profile_pics != null) {
            profileImage = item.profile_pics[0];
            profileImage =
              `${REACT_APP_CDN_HOST}` + profileImage.replace("//", "/");
          }

          const handleAddFriendRequest = async () => {
            try {
              spinner.setLoadingState(true);
              const to = await GET_ACCOUNT(item.did, (err) => {
                throw err
              });
              console.log("sending to", to);
              if (wallet.selectedWallet == "DROPD") {
                const profileData = await USER_VIEW_PROFILE();
                await MANAGED_SEND_GIFT(profileData.data.did, to);
              } else {
                await sendGift(to, account);
              }
              FRIEND_REQUEST(item.did, true);
              setOpenAddFriendPopup(true)
              // setFriendToggle(true);
              spinner.setLoadingState(false);
            } catch (error) {
              alert(error)
              console.log(error);
              alert(error)
              spinner.setLoadingState(false);
            } finally {
              setOpen(false)
            }
          };

          const handleOnSwipe = async (direction, name, index) => {
            console.log(direction)
            swiped(direction, name, index)
            if (direction === "right") {
              await LIKE_PROFILE(item.did)
            }
            if (direction === "up") {
              // setOpenAddFriendPopup(true)
              handleAddFriendRequest()
            }
          }

          moment.updateLocale("en", {
            relativeTime: {
              past: "%s",
            },
          });
          let memberSince = "";
          memberSince = moment(item?.joined_at).fromNow();
          console.log(memberSince, "membersince data");
          return (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={item.name}
              onSwipe={(dir) => handleOnSwipe(dir, item.name, index)}
            // onCardLeftScreen={() => outOfFrame(item.name, index)}
            >
              <div
                style={{ backgroundImage: "url(" + db.url + ")" }}
                className="card"
              >
                <div className="viewmatch-container">
                  <div>
                    <Carousel
                      showIndicators={false}
                      showThumbs={false}
                      infiniteLoop={true}
                    >
                      <div style={{ color: "#fff" }}>
                        <img
                          className="viewmatch-image"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={profileImage}
                          alt="avatar"
                        />
                      </div>
                      {/* {/* <div style={{ color: "#fff" }}> <img className='viewmatch-image' style={{ width: '100vw' }} src={avatar} alt="avatar" /></div> */}
                      {/* <div style={{ color: "#fff" }}> <img className='viewmatch-image' style={{ width: '100vw' }} src={avatar} alt="avatar" /></div>  */}
                    </Carousel>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div className="views-left"><span style={{ position: 'relative', top: '3px', right: '20px' }}>2 / 248</span>
                        <span style={{ position: 'relative', top: '3px', left: '20px' }}>views left</span>
                        <span style={{ position: 'relative', top: '3px', left: '25px', fontWeight: '600' }}>
                          {remaining}/10</span>
                      </div>
                    </div>
                  </div>
                  {/* card bottom part div */}
                  <div  style={{display:'flex',flexDirection:'column',height:"100%",background:'white'}}>
                    <div style={{width:'100%'}}>
                    <div className="viewmatch-details">
                      <div className="viewmatch-text">within 10 km</div>
                      <div className="viewmatch-text">Match score 180</div>
                    </div>
                    <Grid
                      style={{
                        borderTop: "4px solid #EC1C80",
                        position: "relative",
                        bottom: "17px",
                        borderRadius: "10px 10px 0px 0px",
                        backgroundColor: "white",
                      }}
                      container
                      className="viewmatch-details"
                    >
                      <Grid item xs={3}>
                        <div className="viewmatch-avatar-container">
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "30px",
                              backgroundColor: "pink",
                              position: "relative",
                              top: "10px",
                              left: "10px",
                            }}
                          >
                            {profileImage && (
                              <img
                                className="profile-image-container"
                                src={profileImage}
                                alt=""
                              ></img>
                            )}
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={5}>
                        <div style={{ display: "flex" }}>
                          <div className="user-name">{item.nick_name}</div>
                          <div className="online-status"></div>
                          <div
                            style={{ paddingTop: "10px", paddingLeft: "10px" }}
                          >
                            <img src={verified} alt="verified" />
                          </div>
                        </div>
                        <div
                          style={{ paddingTop: "5px" }}
                          className="user-time-details"
                        >
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
                          did={item.did}
                          is_friend={item.is_friend}
                          is_friend_requested_to={item.is_friend_requested_to}
                          is_friend_requested_from={item.is_friend_requested_from}
                        />
                      </Grid>
                    </Grid>
                    <div className="viewmatch-description">
                      <div className="profile-description-text">
                        -Can cook amazing instant noodles Semi professional
                        bathroom singer Have never been in jail except when
                        playing monopoly
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "white",
                        display: "flex",
                        paddingTop: "10px",
                        paddingBottom: "8px",
                        justifyContent: "space-around",
                        borderRadius: "0px 0px 17px 17px",
                      }}
                    >
                      {viewMatch?.data?.matches[
                        currentIndex
                      ]?.person_kundli_attributes?.map((attribute, index) => {
                        return (
                          <div className="iconalignment">
                            <div style={{ height: "40px" }}>
                              <img
                                src={PersonAttributes[attribute].image}
                                alt={attribute}
                              />
                            </div>
                            <div className="logo-text">
                              {PersonAttributes[attribute].text}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="viewmatch-scores">
                      <div className="viewmatch-items">
                        Kundali Match
                        <span style={{ color: "#EC1C80" }}>5/5</span>
                      </div>
                      <div className="viewmatch-items">
                        Zone match <span style={{ color: "#EC1C80" }}>Yes</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        paddingTop: "15px",
                      }}
                    >
                      <div>
                        <div className="viewmatch-common-traits">03</div>
                        <div className="small-text">Common Language</div>
                      </div>
                      <div>
                        <div className="viewmatch-common-traits">03</div>
                        <div className="small-text">Common Clubs</div>
                      </div>
                      <div>
                        <div className="viewmatch-common-traits">03</div>
                        <div className="small-text">Common Interests</div>
                      </div>
                    </div>
                    <div className="viewmatch-user-details">
                      <div className="viewmatch-items-details">
                        32 years old
                      </div>
                      <div className="viewmatch-items-details">
                        Married
                      </div>
                      <div className="viewmatch-items-details">
                        New Delhi
                      </div>
                    </div>
                    </div>
                  
                  </div>
                </div>
                {/* {openAddFriendPopup ? (
          <div className="add-friend-popup-wrapper">
            <div className="add-friend-popup">
              <span>
                10 DRPD will be <br /> sent as a gift to this person
              </span>
              <CustomButton style={{ width: "50%" }} onClick={handleAddFriendRequest}>Send Request</CustomButton>
              <div style={{ marginTop: '15px' }}><CustomButton style={{ width: "50%" }} onClick={() => setOpenAddFriendPopup(false)}>Cancel</CustomButton></div>
            </div>
          </div>
        ) : (
          ""
        )} */}
              </div>
            </TinderCard>
          );
        })}
      </div>
      {/* <FloatingToolbar viewmatchNav={viewmatchNav}/> */}
    </div>
  );
}

export default Viewmatch;
