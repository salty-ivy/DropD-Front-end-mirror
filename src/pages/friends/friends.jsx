import React, { useState, useEffect } from 'react'
import Postcard from '../profilepage/components/postcard/postcard'
// import "./createclub.css"
import Lists from './components/lists'
import Received from './components/received'
import Sent from './components/sent'
import { GET_FRIEND_LIST } from '../../axios/GET_API'
import { GET_FRIEND_REQUEST_LIST } from '../../axios/GET_API'
import { VIEW_SENT_REQUEST } from '../../axios/GET_API'

function Friends() {

    const [sliderPage, setSliderPage] = useState()
    const [friendListData, setFriendListData] = useState()
    const [friendRequestData, setFriendRequestData] = useState()
    const [sentList,setSentList] = useState()
    const [friendListError,setFriendListError] = useState()
    const [friendRequestError,setFriendRequestError] = useState()
    const [sentError,setSentError] = useState()

    useEffect(() => {
        setSliderPage("friendlist");
    }, []);

    const getAllFriends = async () => {
        try {
            let response = await GET_FRIEND_LIST()
            if(response?.data?.friend_list.length == 0){
                setFriendListError("No Friends to show, make some new friends!!")
            }
            console.log(response.data, "all friends data")
            setFriendListData(response?.data)
        } catch (error) {
            console.log(error)
            setFriendListError(error.response.data.message)
        }
    }

    const getFriendRequestList = async () => {
        try {
            let response = await GET_FRIEND_REQUEST_LIST()
            if(response?.data?.friend_requests.length == 0){
                setFriendRequestError("No friend requests to show!!")
            }
            setFriendRequestData(response.data)
        } catch (error) {
            console.log(error)
            setFriendRequestError(error.response.data.message)
        }
    }

    const sentRequestList = async () => {
        try {
            let response = await VIEW_SENT_REQUEST()
            if(response?.data?.friend_requests_sent == 0){
                setSentError("No friend requests sent!!")
            }
            setSentList(response.data)
        } catch (error) {
            console.log(error)
            setSentError(error.response.data.message)
        }
    }


    useEffect(() => {
        getAllFriends()
        getFriendRequestList()
        sentRequestList()
    }, [])


    const renderSlider = () => {
        switch (sliderPage) {

            case "friendlist":
                return (
                    <Lists
                        setSliderPage={setSliderPage}
                        friendListData={friendListData}
                        friendListError={friendListError}
                    />
                );
            case "requestreceived":
                return (
                    <Received
                        setSliderPage={setSliderPage}
                        friendRequestData={friendRequestData}
                        friendRequestError={friendRequestError}

                    />
                );
            case "requestsent":
                return (
                    <Sent
                        setSliderPage={setSliderPage}
                        sentList={sentList}
                        sentError={sentError}
                    />
                );
            default:
                return "foo";
        }
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', }}>
            {renderSlider()}
        </div>
    )
}

export default Friends;
