import React from 'react'
import "./splash.css"
import dropd from "../../assets/images/dropdlogo.svg"

function Splash() {
  return (
    <div className='splash-page-wrapper'>
        <img className='dropd-logo' src={dropd} alt="dropd-logo" />
    </div>
  )
}

export default Splash;