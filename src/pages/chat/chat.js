import React from 'react'
import TimelineNav from '../../components/timelinenav/timelineNav'
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import avatar from "../../assets/images/avatar.jpeg"
import leftarrow from "../../assets/images/leftarrow.svg"
import menu from "../../assets/images/menukebab.svg"

function Chat() {
    return (
        <div style={{ backgroundColor: 'white', height: '100vh' }}>
            <TimelineNav />
            <div style={{ padding: "15px", borderRadius: "20px 20px 20px 20px", backgroundColor: "#E1D7F0", height: '100vh' }}>
                <div style={{ fontSize: '16px', fontWeight: "600", }}>Chat</div>
                <div style={{ width: "100%", display: "flex", height: '53px', borderRadius: '18px', padding: '5px' }}>
                    <div style={{ position: "relative", top: "18px" }}>
                        <img src={leftarrow} alt="back" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center',justifyContent:'space-between', paddingLeft: '10px',width:'100%',paddingRight:'10px' }}>

                        <div style={{ paddingLeft: "10px", display: "flex" ,alignItems: 'center'}}>
                            <div style={{ width: '50px', height: '50px', backgroundColor: "pink", borderRadius: '50%' }}><img style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} src={avatar} /></div>
                            <div style={{ fontSize: "12px", fontWeight: '600', color: "#484848",paddingLeft:"10px" }}>Mr Cupid</div>
                        </div>
                        <div><img src={menu}/></div>
                    </div>
                </div>
                <div className='comment-card-box'>
                    {/* {singlePost?.comments?.map((item, index) => {
                    
                    return (
                        <Commentcard
                            comment_id = {item.comment_id}
                            comment_user = {item.comment_from.nick_name}
                            comment = {item.comment}
                            comment_date = {moment(item.comment_date).fromNow()}
                            comment_user_photo = {`${REACT_APP_CDN_HOST}` + item.comment_from.profile_pics[0]}
                        />
                    )
                })} */}
                </div>
                <div className='comment-textfield-position'>
                    <TextField style={{ backgroundColor: 'white', borderRadius: '10px', minHeight: "60px" }}
                        id="outlined-basic"
                        variant="outlined"
                        multiline
                        size='small'
                        sx={{
                            width: '330px', "& .MuiOutlinedInput-root": {
                                "& > fieldset": {
                                    border: "none"
                                }
                            }
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment style={{ paddingLeft: '2px' }} position="start">
                                {/* <img style={{ paddingRight: '8px' }} src={line} alt='separator' /> */}
                                <div style={{ width: '40px', height: '40px', backgroundColor: "pink", borderRadius: '50%', position: 'relative', top: '10px' }}><img style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} src={avatar} /></div>
                            </InputAdornment>,
                            endAdornment:
                                <InputAdornment style={{ paddingLeft: '2px' }} position="start">
                                    {/* <img style={{ paddingRight: '8px' }} src={line} alt='separator' /> */}
                                    <span style={{ position: 'relative', left: '4px', color: '#525252', fontSize: '12px', fontWeight: '400', top: '8px' }}>Send</span>
                                </InputAdornment>,
                        }} />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Chat