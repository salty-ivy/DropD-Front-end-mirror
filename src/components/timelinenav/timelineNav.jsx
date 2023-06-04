import React from "react";
import Money from "../../assets/images/money.svg";
import notification from "../../assets/images/notification.svg";
import search from "../../assets/images/search.svg";
import logo from "../../assets/images/dropdsmall.svg";
import leftarrow from "../../assets/images/leftarrow.svg";
import {useHistory} from "react-router-dom";

function TimelineNav() {
  const history = useHistory();
  const handleClick = () => {
    // console.log("timeline click",history)
    if(history.location.pathname === "/wallet"){
      history.push("/timeline");
      return
    }
    history.goBack()
  }

  const handleNotifications = () => {
    history.push("/notifications")
  }

  const handleWallet = () => {
    history.push("/connectwallet")
  }
  return (
    <div>
      <div
        style={{ height: "65px", backgroundColor: "white" }}
        className="navbar-wrapper"
      >
        <div style={{ display: "flex", width: "60vw" }}>
          <div onClick={handleClick} style={{ position: "relative", top: "20px", left: "15px" }}>
            <img src={leftarrow} alt="back" />
          </div>
          <div style={{ width: "auto" }}>
            <img
              style={{ position: "relative", left: "30px", top: "12px" }}
              id="dropd-logo"
              src={logo}
              alt="dropd-logo"
            />
          </div>
        </div>
        <div style={{ width: "40vw" }}>
          <div
            style={{
              display: "flex",
              float: "right",
              width: "100px",
              justifyContent: "space-evenly",
              position: "relative",
              top: "20px",
            }}
          >
            <div>
              <img onClick={handleNotifications} src={notification} alt="money" />
            </div>
            <div>
              <img onClick={handleWallet} src={Money} alt="money" />
            </div>
            <div>
              <img src={search} alt="money" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineNav;
