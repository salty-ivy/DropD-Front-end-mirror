import React from 'react'
import leftarrow from "../../assets/images/leftarrow.svg"
import logo from "../../assets/images/dropdsmall.svg"

function Userdetailsnav() {
    return (
        <div>
            <div className='navbar-wrapper'>
                <div style={{ position: 'relative', top: '20px', left: '15px' }}><img src={leftarrow} alt="back" /></div>
                <div style={{ width: 'auto' }}><img style={{ position: "relative", left: '30px', top: '12px' }} id='dropd-logo' src={logo} alt="dropd-logo" /></div>
            </div>
        </div>
    )
}

export default Userdetailsnav