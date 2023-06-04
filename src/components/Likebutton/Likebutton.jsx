import React, { useState,useEffect } from 'react'
import likeprofile from "../../assets/images/likeprofile.svg"
import userunlike from "../../assets/images/userunlike.svg"
import { LIKE_PROFILE } from '../../axios/POST_API'

function Likebutton({did,is_liked}) {
    const [likedProfile, setLikedProfile] = useState(is_liked)
    console.log(did, likedProfile, is_liked,"line no 8")

   useEffect(() => {
     setLikedProfile(is_liked)
   }, [is_liked])
   

    const handleProfileLike = () => {
        try {
            LIKE_PROFILE(did)
            setLikedProfile(!likedProfile)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {
                likedProfile ? <img id="cursor" onClick={handleProfileLike} style={{ position: 'relative', left: '40px', bottom: '25px' }} src={likeprofile} /> :
                    <img id="cursor" onClick={handleProfileLike} style={{ position: 'relative', left: '40px', bottom: '25px' }} src={userunlike} />
            }
        </div>
    )
}

export default Likebutton