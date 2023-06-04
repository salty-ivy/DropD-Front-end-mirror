import React, { useState } from 'react'
import TimelineNav from '../../components/timelinenav/timelineNav'
import { useTranslation } from 'react-i18next';
import avatar from "../../assets/images/avatar.jpeg"
import claimDrpdIcon from "../../assets/images/claimdrpdicon.svg"
import deductedDrpdIcon from "../../assets/images/deducteddrpdicon.svg"
import "./notifications.css"

function Notifications() {

  let notification_type = "drpd";

  return(
      <div className='page-page-wrapper'>
          <TimelineNav />
          
          <div className="inner-pages-container">

            <div className="inner-pages-container-wrap">

              <h1 className="page-title">Notifications</h1>

              <div className="notifications-container">
                
                {/*Change in the the below block*/}
                <div className="notification-row">
                  <div className="noti-thumb-wrap">
                    <img src={avatar} />
                  </div>
                  <div className="noti-details-wrap">
                    <div className="noti-title"><span>TheQueen</span> commented on your post</div>
                    <div className="noti-date">02-04-2022 at 08:15</div>
                  </div>
                </div>

                <div className="notification-row">
                  <div className="noti-thumb-wrap">
                    <img src={avatar} />
                  </div>
                  <div className="noti-details-wrap">
                    <div className="noti-title"><span>Free Bird</span> Sent you a friend request</div>
                    <div className="noti-date">02-04-2022 at 08:15</div>
                  </div>
                </div>

                <div className="notification-row">
                  <div className="noti-thumb-wrap">
                    <img src={avatar} />
                  </div>
                  <div className="noti-details-wrap">
                    <div className="noti-title"><span>TheQueen</span> commented on your post</div>
                    <div className="noti-date">02-04-2022 at 08:15</div>
                  </div>
                </div>

                {/*Please assign a additional class "drpd-icon" if notification type is related to DRPD transaction*/}
                <div className="notification-row">
                  <div className="noti-thumb-wrap drpd-icon">
                    <img src={claimDrpdIcon} />
                  </div>
                  <div className="noti-details-wrap">
                    <div className="noti-title"><span>TheQueen</span> commented on your post</div>
                    <div className="noti-date">02-04-2022 at 08:15</div>
                  </div>
                </div>

                <div className="notification-row">
                  <div className="noti-thumb-wrap">
                    <img src={avatar} />
                  </div>
                  <div className="noti-details-wrap">
                    <div className="noti-title"><span>TheQueen</span> commented on your post</div>
                    <div className="noti-date">02-04-2022 at 08:15</div>
                  </div>
                </div>

                {/*Please assign a additional class "drpd-icon" if notification type is related to DRPD transaction*/}
                 <div className="notification-row">
                  <div className="noti-thumb-wrap drpd-icon">
                    <img src={deductedDrpdIcon} />
                  </div>
                  <div className="noti-details-wrap">
                    <div className="noti-title"><span>TheQueen</span> commented on your post</div>
                    <div className="noti-date">02-04-2022 at 08:15</div>
                  </div>
                </div>

              </div>

             
            </div>
          </div>
      </div> 
    );
}

export default Notifications;
