import axios from "axios"
import RetrieveToken from "../utils/HelperFunctions/RetrieveToken";
const { REACT_APP_API_HOST } = process.env;

export const GET_INTERESTS = async () => {
   let response = await axios.get(`${REACT_APP_API_HOST}/v1/interests/`, {
   })
   console.log(response)
   return (response)
}

export const GET_TIMELINE = async () => {
   let item = RetrieveToken()
   let response = await axios.get(`${REACT_APP_API_HOST}/v1/timeline/`, {
      headers: {
         Authorization: `Token ${item}`,
      }
   })
   return (response);
}

//get post api
export const GET_SINGLE_POST = async (pid) => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/posts/view-post/${pid}`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )


   try {
      console.log(response.data)
      return response.data
   } catch (error) {
      return "Something went wrong, try again after some time"
   }
}

//get all posts from a user
export const GET_ALL_POSTS = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/posts/user-posts/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   try {
      console.log(response.data)
      return response.data
   } catch (error) {
      return "Something went wrong, try again after some time"
   }
}

export const GET_PROFILE = async (did) => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/view-user-profile/${did}`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

export const USER_VIEW_PROFILE = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/view-profile/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//get viewmatch api
export const GET_VIEWMATCH = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/view-match/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//view a particular club
export const VIEW_CLUB = async (cid) => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/view-club/${cid}`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//View a particular page
export const VIEW_PAGE = async (pageId) => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/view-page/${pageId}`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//Get all clubs
export const VIEW_ALL_CLUBS = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/all-club-list/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//Get clubs by individual user
export const VIEW_MY_CLUBS = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/my-club-list/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//Club members api
export const CLUB_MEMBER_LIST = async (cid) => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/club-member-list/${cid}`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//Get Friend List
export const GET_FRIEND_LIST = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/friend-list/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//Get Friend Request List
export const GET_FRIEND_REQUEST_LIST = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/friend-request-list/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//Get Profile Images
export const GET_PROFILE_IMAGES = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/update-profile-images/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//Get Nickname
export const GET_NICK_NAME = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/update-nick-name/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//Get Profile data
export const GET_PROFILE_DATA = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/update-profile/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//Get all clubs
export const VIEW_ALL_PAGES = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/all-page-list/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}
//View Pages by individual user
export const VIEW_MY_PAGES = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/my-page-list/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}

//get sent request list
export const VIEW_SENT_REQUEST = async () => {
   let authToken = RetrieveToken()
   const response = await axios.get(
      `${REACT_APP_API_HOST}/v1/friend-request-sent-list/`,
      {
         headers: {
            Authorization: `Token ${authToken}`,
         }
      },
   )
   return (response);
}


