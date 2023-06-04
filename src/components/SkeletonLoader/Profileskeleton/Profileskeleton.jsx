import * as React from 'react';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';


export default function SkeletonLoader() {
    return (
        <div style={{ backgroundColor: 'white',width:'100%' }}>
           <div style={{height:'60px'}}></div>
            <Skeleton sx={{ height: 290 }} animation="wave" variant="rectangular" />
            <div style={{ display: 'flex', marginTop: '20px', height: '100px' }}>
            <div><Skeleton style={{ marginLeft: '15px',backgroundColor:'#E3E3E3',position:'relative',opacity:'1',bottom:'8px' }} animation="wave" variant="circular" width={60} height={60} /></div>

                <div style={{ width: '60%', marginLeft: '20px' }}>
                    <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={20} width="80%" />
                </div>
            </div>

            <Skeleton sx={{ height: 290 }} animation="wave" variant="rectangular" />
            <div style={{ display: 'flex', marginTop: '20px', height: '60px' }}>
               
                <div style={{ width: '60%', marginLeft: '20px' }}>
                    <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={15} width="80%" />
                </div>
            </div>

            <Skeleton sx={{ height: 290 }} animation="wave" variant="rectangular" />
            <div style={{ display: 'flex', marginTop: '20px', height: '60px' }}>
               
                <div style={{ width: '60%', marginLeft: '20px' }}>
                    <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={15} width="80%" />
                </div>
            </div>
            {/* <Media loading />
            <Media /> */}
        </div>
    );
}