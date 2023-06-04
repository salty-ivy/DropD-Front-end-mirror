import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import clubicon from "../../assets/images/timelinemenu/clubicon.svg";
import homeicon from "../../assets/images/timelinemenu/homeicon.svg";
import menuicon from "../../assets/images/timelinemenu/menuicon.svg";
import pagesicon from "../../assets/images/timelinemenu/pagesicon.svg";
import viewmatchicon from "../../assets/images/timelinemenu/viewmatchicon.svg";
import home from "../../assets/images/floatingbarselectedicons/home.svg";
import seletedclub from "../../assets/images/floatingbarselectedicons/selectedclub.svg";
import seletedmenu from "../../assets/images/floatingbarselectedicons/selectedmenu.svg";
import seletedpage from "../../assets/images/floatingbarselectedicons/selectedpage.svg";
import seletedviewmatch from "../../assets/images/floatingbarselectedicons/selectedviewmatch.svg";

function FloatingToolbar({ timelineNav, clubNav, pageNav, viewmatchNav, menuNav }) {
  const [timeline, setTimeline] = useState(false);
  const [clublist, setClublist] = useState(false);
  const [pagelist, setPageList] = useState(false)
  const [viewmatch, setViewmatch] = useState(false)
  const [menu, setMenu] = useState(false)
  const history = useHistory();
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    console.log("floating toolbar", history);
    if (
      history.location.pathname === "/userdetails" ||
      history.location.pathname === "/login"
    ) {
      setHidden(true);
    }
  }, [history]);

  return (
    <>
      {hidden ? (
        ""
      ) : (
        <div className="floatingToolbar">
          <div className="profile-icons-container">
            {timelineNav ? (
              <img
                id="cursor"
                onClick={() => history.push("/timeline")}
                className="profile-menu-icons"
                src={homeicon}
                alt="img"
              />
            ) : (
              <img
                id="cursor"
                onClick={() => history.push("/timeline")}
                className="profile-menu-icons"
                src={home}
                alt="img"
              />
            )}
            {clubNav ? (
              <img
                id="cursor"
                onClick={() => history.push("/clublist")}
                className="profile-menu-icons"
                src={seletedclub}
                alt="img"
              />
            ) : (
              <img
                id="cursor"
                onClick={() => history.push("/clublist")}
                className="profile-menu-icons"
                src={clubicon}
                alt="img"
              />
            )}
            {
              pageNav ? <img
                id="cursor"
                onClick={() => history.push("/pagelist")}
                className="profile-menu-icons"
                src={seletedpage}
                alt="img"
              /> : <img
                id="cursor"
                onClick={() => history.push("/pagelist")}
                className="profile-menu-icons"
                src={pagesicon}
                alt="img"
              />
            }
            {viewmatchNav ? <img
              id="cursor"
              onClick={() => history.push("/viewmatch")}
              className="profile-menu-icons"
              src={seletedviewmatch}
              alt="img"
            /> : <img
              id="cursor"
              onClick={() => history.push("/viewmatch")}
              className="profile-menu-icons"
              src={viewmatchicon}
              alt="img"
            />}
            {menuNav ? <img
              id="cursor"
              onClick={() => history.push("/menu")}
              className="profile-menu-icons"
              src={seletedmenu}
              alt="img"
            /> : <img
              id="cursor"
              onClick={() => history.push("/menu")}
              className="profile-menu-icons"
              src={menuicon}
              alt="img"
            />}

          </div>
        </div>
      )}
    </>
  );
}

export default FloatingToolbar;
