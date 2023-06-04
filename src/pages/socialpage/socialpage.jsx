import React, { useState, useEffect } from 'react'
import { Grid } from '@mui/material'
import TimelineNav from '../../components/timelinenav/timelineNav'
import "./socialpage.css"
import FloatingToolbar from '../../components/FloatingToolbar'
import PostCard from '../../components/PostCard/PostCard'
import { VIEW_PAGE } from '../../axios/GET_API'
import { useParams } from 'react-router-dom'
import SkeletonLoader from '../../components/SkeletonLoader/Profileskeleton/Profileskeleton'
import moment from 'moment'

const { REACT_APP_CDN_HOST } = process.env;

function Socialpage() {

    const { pageId } = useParams()
    const [skeletonLoader, setSkeletonLoader] = useState(false)
    const [pageData, setPageData] = useState()

    console.log(pageId, "page id")

    const viewPage = async () => {
        try {
            setSkeletonLoader(true)
            let response = await VIEW_PAGE(pageId)
            setSkeletonLoader(false)
            console.log(response)
            setPageData(response)
        } catch (error) {
            setSkeletonLoader(false)
            console.log(error)
        }
    }

    useEffect(() => {
        viewPage()
    }, [])


    let coverImage = "";
    if (pageData?.data?.page?.cover_image != null) {
        coverImage = pageData?.data?.page.cover_image;
        coverImage = `${REACT_APP_CDN_HOST}` + coverImage.replace("//", "/");
    }

    let profileImage = "";
    if (pageData?.data?.page?.profile_image != null) {
        profileImage = pageData?.data?.page?.profile_image;
        profileImage = `${REACT_APP_CDN_HOST}` + profileImage.replace("//", "/");
    }

    moment.updateLocale("en", {
        relativeTime: {
            past: "%s",
        },
    });
    let memberSince = moment(pageData?.data?.page?.created_at).fromNow();


    return (
        <div className='page-page-wrapper'>
            {skeletonLoader ? <SkeletonLoader /> : <div>
                <TimelineNav />
                <div className='profiledetails-wrapper'>
                    <div><img className='page-cover-image' src={coverImage} alt='avatar' /></div>
                    <Grid container className='page-details'>
                        <Grid item xs={3}>
                            <div className='socialpage-avatar'><img className='page-image-container' src={profileImage} alt="avatarimage"></img></div>
                        </Grid>
                        <Grid item xs={5}>
                            <div style={{ display: 'flex' }}>
                                <div className='user-name'>{pageData?.data?.page?.club_name}</div>
                                {/* <div className='online-status'></div> */}
                            </div>
                            <div style={{ paddingTop: '5px' }} className='user-time-details'>Member since {memberSince}</div>
                            <div style={{ display: 'flex', paddingTop: '6px' }}>
                                <div>
                                    <div className='user-time-details'>Total</div>
                                    <div className='user-data'>30k</div>
                                </div>
                                <div style={{ paddingLeft: '30px' }}>
                                    <div className='user-time-details'>This month</div>
                                    <div className='user-data'>1089</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid style={{ display: 'flex', flexDirection: 'column' }} item xs={4}>
                            {/* <div><img className='couple-image-position' src={coupleimage} alt='coupleimage' /></div> */}
                            <div><button className='selected-button-styles'> Like Page</button></div>
                        </Grid>
                    </Grid>
                    <div className='page-description'>
                        <div style={{ width: '280px' }} className='page-description-text'>{pageData?.data.page.description}</div>
                    </div>
                </div>
                <div> {pageData?.data?.page.posts.map((item, index) => {
                    let pagePostImage = ""
                    if (pageData?.data?.page?.posts[0].images[0] != null) {
                        pagePostImage = pageData?.data?.page?.posts[0].images[0];
                        pagePostImage = `${REACT_APP_CDN_HOST}` + pagePostImage.replace("//", "/");
                    }

                    let postDate = moment(item.created_at).format("MMM D, h:mm a");
                    moment.updateLocale("en", {
                        relativeTime: {
                            past: "%s",
                        },
                    });
                    return (
                        <PostCard
                            postComments={item.comments.length}
                            post_id={item.pid}
                            did={item.post_from.did}
                            postProfilePic={profileImage}
                            userName={item.post_from.nick_name}
                            postText={item.text}
                            postLikes={item.likes}
                            postImage={pagePostImage}
                            postDate={postDate}
                            memberSince={memberSince}
                            kundliAttributes={item.post_from.kundli_attributes}
                            zone={item.post_from.zone}
                            is_friend={item.post_from.is_friend}
                            is_friend_requested_to={item.post_from.is_friend_requested_to}
                            is_friend_requested_from={item.post_from.is_friend_requested_from}
                            is_liked={item.post_from.is_like_to}
                            show_header={false}
                        />
                    )
                })}</div></div>}
        </div>
    )

}

export default Socialpage