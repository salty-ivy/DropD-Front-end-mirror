import React from 'react'
import TimelineNav from '../../../components/timelinenav/timelineNav'
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import search from "../../../assets/images/search.svg"
import avatar from "../../../assets/images/avatar.jpeg"

function Chatlist() {
    return (
        <div style={{backgroundColor:'white',height:'100vh'}}>
            <TimelineNav />
            <div style={{padding:"15px",borderRadius:"20px 20px 20px 20px",backgroundColor:"#E1D7F0",height:'100vh'}}>
                <div style={{fontSize:'16px',fontWeight:"600",paddingBottom:'15px'}}>Chat</div>
                <div style={{marginLeft:'auto',marginRight:"auto"}}>
                    <TextField style={{ backgroundColor: 'white', borderRadius: '16px', width: '90%' }}
                        id="outlined-basic"
                        variant="outlined"
                        size='small'
                        placeholder='type here'
                        sx={{
                            width: '230px', "& .MuiOutlinedInput-root": {
                                "& > fieldset": {
                                    border: "none"
                                }
                            }
                        }}

                        InputProps={{
                            endAdornment:
                              <InputAdornment style={{ paddingLeft: '2px' }} position="start">
                               
                                <span ><img style={{position:'relative',top:'3px'}} src={search}/></span>
                              </InputAdornment>,
                          }} 
                    />
                </div>
                <div>
                    <div style={{width:"98%",display:"flex",justifyContent:"space-between",height:'53px',backgroundColor:'white',marginTop:'20px',borderRadius:'18px',padding:'5px'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                          <div style={{width:'50px',height:'50px',backgroundColor:"pink",borderRadius:'50%'}}><img style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover'}} src={avatar}/></div>
                          <div style={{paddingLeft:"10px"}}>
                            <div style={{fontSize:"12px",fontWeight:'600',color:"#484848"}}>Mr Cupid</div>
                            <div style={{fontSize:"12px",fontWeight:'400',color:"#6A7587"}}>Fair Enough</div>
                          </div>
                        </div>
                        <div style={{float:'right',paddingRight:'10px',paddingTop:"27px",fontSize:'10px',fontWeight:'400',color:'#AFAFAF'}}>
                            23th Aug
                          </div>
                    </div>
                    <div style={{width:"98%",display:"flex",justifyContent:"space-between",height:'53px',backgroundColor:'white',marginTop:'20px',borderRadius:'18px',padding:'5px'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                          <div style={{width:'50px',height:'50px',backgroundColor:"pink",borderRadius:'50%'}}><img style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover'}} src={avatar}/></div>
                          <div style={{paddingLeft:"10px"}}>
                            <div style={{fontSize:"12px",fontWeight:'600',color:"#484848"}}>Mr Cupid</div>
                            <div style={{fontSize:"12px",fontWeight:'400',color:"#6A7587"}}>Fair Enough</div>
                          </div>
                        </div>
                        <div style={{float:'right',paddingRight:'10px',paddingTop:"27px",fontSize:'10px',fontWeight:'400',color:'#AFAFAF'}}>
                            23th Aug
                          </div>
                    </div>
                    <div style={{width:"98%",display:"flex",justifyContent:"space-between",height:'53px',backgroundColor:'white',marginTop:'20px',borderRadius:'18px',padding:'5px'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                          <div style={{width:'50px',height:'50px',backgroundColor:"pink",borderRadius:'50%'}}><img style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover'}} src={avatar}/></div>
                          <div style={{paddingLeft:"10px"}}>
                            <div style={{fontSize:"12px",fontWeight:'600',color:"#484848"}}>Mr Cupid</div>
                            <div style={{fontSize:"12px",fontWeight:'400',color:"#6A7587"}}>Fair Enough</div>
                          </div>
                        </div>
                        <div style={{float:'right',paddingRight:'10px',paddingTop:"27px",fontSize:'10px',fontWeight:'400',color:'#AFAFAF'}}>
                            23th Aug
                          </div>
                    </div>
                    <div style={{width:"98%",display:"flex",justifyContent:"space-between",height:'53px',backgroundColor:'white',marginTop:'20px',borderRadius:'18px',padding:'5px'}}>
                        <div style={{display:'flex',alignItems:'center'}}>
                          <div style={{width:'50px',height:'50px',backgroundColor:"pink",borderRadius:'50%'}}><img style={{width:'50px',height:'50px',borderRadius:'50%',objectFit:'cover'}} src={avatar}/></div>
                          <div style={{paddingLeft:"10px"}}>
                            <div style={{fontSize:"12px",fontWeight:'600',color:"#484848"}}>Mr Cupid</div>
                            <div style={{fontSize:"12px",fontWeight:'400',color:"#6A7587"}}>Fair Enough</div>
                          </div>
                        </div>
                        <div style={{float:'right',paddingRight:'10px',paddingTop:"27px",fontSize:'10px',fontWeight:'400',color:'#AFAFAF'}}>
                            23th Aug
                          </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatlist