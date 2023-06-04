import * as React from 'react';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';


export default function FriendsLoader() {
    return (
        <div style={{ backgroundColor: 'white',width:'100%' }}>
            <div style={{ display: 'flex', marginTop: '20px', height: 'auto' }}>
                <div style={{ width: '60%', marginLeft: '20px' }}>
                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={20} width="80%" />
                </div>
            </div>
            <div style={{ height: '30px' }}></div>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <Skeleton style={{width:'100vw'}} sx={{ height: 100, borderRadius: '12px' }} animation="wave" variant="rectangular" />
            </div>
            <div style={{marginTop:'20px' }}>
                <Skeleton style={{width:'100vw'}} sx={{ height: 100, borderRadius: '12px' }} animation="wave" variant="rectangular" />
            </div>
            <div style={{marginTop:'20px' }}>
                <Skeleton style={{width:'100vw'}} sx={{ height: 100, borderRadius: '12px' }} animation="wave" variant="rectangular" />
            </div>
            <div style={{marginTop:'20px' }}>
                <Skeleton style={{width:'100vw'}} sx={{ height: 100, borderRadius: '12px' }} animation="wave" variant="rectangular" />
            </div>
            <div style={{marginTop:'20px' }}>
                <Skeleton style={{width:'100vw'}} sx={{ height: 100, borderRadius: '12px' }} animation="wave" variant="rectangular" />
            </div>
        </div>
    );
}