import { Grid } from '@mui/material'
import React from 'react'
import avatar2 from "../../../../assets/images/avatar2.jpeg"

function Clubscard({name,type,total,image}) {
    return (
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', backgroundColor: 'white', marginTop: '20px' }} className='clubcard-wrapper'>
            <div style={{ width: '90%', height: '80px', backgroundColor: 'white', boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.06)', borderRadius: '12px' }}>
                <Grid container>
                    <Grid item xs={2}>
                        <img style={{ width: '50px', height: '50px', borderRadius: '30px',position:'relative',top:'10px',left:'5px' }} src={image} alt='avatar2' />
                    </Grid>
                    <Grid item xs={7}>
                        <div style={{paddingLeft:'20px'}}> 
                        <div style={{fontSize:'16px',fontWeight:'600',color:'#484848'}}>
                            {name}
                        </div >
                        <div style={{paddingTop:'5px'}} className='small-text'>
                            {type}
                        </div>
                        <div style={{paddingTop:'5px'}} className='small-text'>
                            Members
                        </div>
                        <div style={{ height: '2px', width: '100%', backgroundColor: '#FAF3FF' }}></div>
                        <div style={{fontSize:'12px',fontWeight:'600',color:'#6A7587',paddingTop:'5px'}}>
                            {total}
                        </div>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <button style={{ backgroundColor: '#EC1C80', float: 'right', color: 'white', border: '1px solid #EC1C80', borderRadius: '12px', width: '87px', height: '26px', marginRight: '10px',marginTop:'40px' }}> Posts</button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Clubscard