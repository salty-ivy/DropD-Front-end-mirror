import React,{useState} from 'react'
import avatar from "../../../assets/images/avatar.jpeg"
import "./commentcard.css"

function Commentcard({ comment_id, comment_user, comment_user_photo, comment, comment_date}) {
    return (
        <div className='comment-card-wrapper'>
            <div style={{display:'flex'}}>
                <div className='comment-avatar-container-box'>
                    <img style={{ width: "50px", height: "50px", borderRadius: '50%' }} src={comment_user_photo} alt="img" />
                </div>
                <div className='comment-details-container'>
                    <div className='comment-user-name'>{comment_user}</div>
                    <div className='comment-user-comment'>{comment}</div>
                    <div className='comment-user-timestamp'>{comment_date} 
                    {/* <span>Reply</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Commentcard