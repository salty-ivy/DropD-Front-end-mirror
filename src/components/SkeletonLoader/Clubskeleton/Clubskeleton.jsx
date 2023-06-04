import * as React from 'react';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';


export default function ClubLoader() {
    return (
        <div style={{ backgroundColor: 'white',width:'100%' }}>
            <div style={{ display: 'flex', marginTop: '20px', height: 'auto' }}>
                <div style={{ width: '60%', marginLeft: '20px' }}>
                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={20} width="80%" />
                </div>
            </div>
            <div style={{ height: '30px' }}></div>
            <Grid container>
                <Grid item xs={6}>
                    <div style={{display:"flex",justifyContent:'center'}}>
                        <Skeleton sx={{ height: 200, width: 150,borderRadius:'12px' }} animation="wave" variant="rectangular" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:"flex",justifyContent:'center'}}>
                        <Skeleton sx={{ height: 200, width: 150,borderRadius:'12px' }} animation="wave" variant="rectangular" />
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{paddingTop:'20px'}}>
                <Grid item xs={6}>
                    <div style={{display:"flex",justifyContent:'center'}}>
                        <Skeleton sx={{ height: 200, width: 150,borderRadius:'12px' }} animation="wave" variant="rectangular" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:"flex",justifyContent:'center'}}>
                        <Skeleton sx={{ height: 200, width: 150,borderRadius:'12px' }} animation="wave" variant="rectangular" />
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{paddingTop:'20px'}}>
                <Grid item xs={6}>
                    <div style={{display:"flex",justifyContent:'center'}}>
                        <Skeleton sx={{ height: 200, width: 150,borderRadius:'12px' }} animation="wave" variant="rectangular" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:"flex",justifyContent:'center'}}>
                        <Skeleton sx={{ height: 200, width: 150,borderRadius:'12px' }} animation="wave" variant="rectangular" />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}