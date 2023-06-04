import * as React from 'react';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';


export default function SkeletonLoader() {
    return (
        <div style={{ backgroundColor: 'white',width:'100%' }}>
            {/* <Skeleton animation="wave" style={{ width: '100%', backgroundColor: '#E3E3E3', height: "250px" }} variant="rectangular" /> */}
            <div style={{ display: 'flex',paddingTop:"20px", height: '80px' }}>
                <div><Skeleton style={{ marginLeft: '15px',backgroundColor:'#E3E3E3',position:'relative',opacity:'1' }} animation="wave" variant="circular" width={60} height={60} /></div>
                <div style={{ width: '60%', marginLeft: '20px' }}>
                    <Skeleton animation="wave" height={60} style={{ marginBottom: 6 }} />
                    {/* <Skeleton animation="wave" height={20} width="80%" /> */}
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px', height: '60px' }}>
                <div><Skeleton style={{ marginLeft: '15px' }} animation="wave" variant="circular" width={40} height={40} /></div>
                <div style={{ width: '60%', marginLeft: '20px' }}>
                    <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={15} width="80%" />
                </div>
            </div>

            <Skeleton sx={{ height: 290 }} animation="wave" variant="rectangular" />
            <div style={{ display: 'flex', marginTop: '20px', height: '60px' }}>
                <div><Skeleton style={{ marginLeft: '15px' }} animation="wave" variant="circular" width={40} height={40} /></div>
                <div style={{ width: '60%', marginLeft: '20px' }}>
                    <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={15} width="80%" />
                </div>
            </div>

            <Skeleton sx={{ height: 290 }} animation="wave" variant="rectangular" />
            {/* <Media loading />
            <Media /> */}
        </div>
    );
}