import React from 'react'
import likeicon from "../../../../assets/images/likeicon.svg"
import message from "../../../../assets/images/message.svg"
import share from "../../../../assets/images/share.svg"

function Postcard({date,likes,shares,comments,image,welcometext}) {
    return (
        <div>
            <div style={{ width: "90%", height: 'auto',paddingBottom:'15px', backgroundColor: 'white' }}>
                <span style={{ color: '#6A7587', fontSize: '16px', fontWeight: '400', position: 'relative', left: '20px', top: '5px' }}>{welcometext}</span>
            </div>
            <div style={{ width: "100vw", height: 'auto' }}>
                <img style={{ width: '100vw' }} src={image} alt='avatarimage' />
            </div>
            <div className='card-footer-wrapper'>
                <div style={{ paddingLeft: '10px', paddingTop: '3px' }} className='user-time-details'>{date}</div>
                <div><img src={likeicon} alt='like' /><span className='card-footer-details'>{likes}</span></div>
                <div><img src={message} alt='like' /><span className='card-footer-details'>{comments}</span></div>
                {/* <div style={{ paddingRight: '20px' }}><img src={share} alt='like' /><span className='card-footer-details'>{shares}</span></div> */}
                <div style={{ paddingRight: '20px' }}><img src={share} alt='like' /><span className='card-footer-details'>10</span></div>
            </div>
        </div>
    )
}

export default Postcard