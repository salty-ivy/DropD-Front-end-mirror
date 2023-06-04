import React,{useState, useEffect} from 'react'
import TimelineNav from '../../components/timelinenav/timelineNav'
import avatar from "../../assets/images/avatar.jpeg"
import Commentcard from './commentcard/commentcard'
import { TextField } from '@mui/material'
import { InputAdornment } from '@mui/material'
import line from "../../assets/images/line.svg"
import { COMMENT_POST } from '../../axios/POST_API'
import { GET_SINGLE_POST } from '../../axios/GET_API'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import "./comments.css"

const { REACT_APP_CDN_HOST } = process.env;

function Comments() {
    const { pid } = useParams();
    const [comment,setComment] = useState()
    const [singlePost,setSinglePost] = useState({}) 

    const getPostData = async () => {
        try {
            let result = await GET_SINGLE_POST(pid)
            console.log(result)
            setSinglePost(result.post)
        } catch (error) {
            console.log(error, "this is the timeline error")
        }
    }

    useEffect(() => {
        getPostData()
    }, [])

    const handleCommentClick = (e) => {
        try{ 
            COMMENT_POST(pid, comment).then((commentResponse) => {
                console.log(commentResponse)
                if(commentResponse === true){
                    //update existing comments
                    getPostData()
                }else{
                    alert( commentResponse )
                }
            })
            
        }catch(error){
            alert(error)
        }
    }

    console.log(singlePost);

  return (
    <div>
        <TimelineNav/>
        <div className='comments-wrapper'>
            <div className='comment-header-text'>Comments</div>
            {/* <div style={{display:'flex',paddingLeft:'20px',paddingTop:'10px'}}>
                <div className='comment-avatar-container'><img style={{width:"50px",height:"50px",borderRadius:'50%' }} src={avatar} alt="img"/></div>
                <div className='comments-text-box'>
                    <div className='comments-text'>Make Love Not War</div>
                    <div className='comments-hashtags'>#Peace</div>
                </div>
            </div> */}
            <div className='comment-card-box'>
               {singlePost?.comments?.map((item, index) => {
                    
                    return (
                        <Commentcard
                            comment_id = {item.comment_id}
                            comment_user = {item.comment_from.nick_name}
                            comment = {item.comment}
                            comment_date = {moment(item.comment_date).fromNow()}
                            comment_user_photo = {`${REACT_APP_CDN_HOST}` + item.comment_from.profile_pics[0]}
                        />
                    )
                })}
            </div>
            <div className='comment-textfield-position'>
            <TextField style={{ backgroundColor: 'white', borderRadius: '10px' }}
                  id="outlined-basic"
                  variant="outlined"
                  multiline
                  onChange={(event) => { setComment(event.target.value) }}
                  size='small'
                  sx={{
                    width: '330px', "& .MuiOutlinedInput-root": {
                      "& > fieldset": {
                        border: "none"
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment:
                      <InputAdornment style={{ paddingLeft: '2px' }} position="start">
                        <img style={{ paddingRight: '8px' }} src={line} alt='separator' />
                        <span onClick={handleCommentClick} style={{ position: 'relative', left: '4px', color: '#525252', fontSize: '12px', fontWeight: '400' }}>Comment</span>
                      </InputAdornment>,
                  }} />
            </div>
        </div>
    </div>
  )
}

export default Comments