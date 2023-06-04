import axios from "axios";
import RetrieveToken from "../utils/HelperFunctions/RetrieveToken";
const { REACT_APP_API_HOST, REACT_APP_WEB3_HOST } = process.env;
// // const { REACT_APP_WEB3_HOST } = process.env;
// const REACT_APP_WEB3_HOST = "https://web3.staging.dropd.network"
//send otp to mobile
export const SEND_OTP_MOBILE = async ({ Phone }) => {
  const response = await axios.post(`${REACT_APP_API_HOST}/v1/signup/`, {
    phone: Phone,
  });
  return response
};

//signup with otp verification mobile
export const SIGNUP_POST = async ({ Phone, otp }) => {
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/signup-verification/`,
    {
      phone: Phone,
      otp: otp,
    }
  );
  console.log("this is signup response token", response?.data.token);
  localStorage.setItem("token", `${response.data.item}`);
  return response;
};
//mobile login
export const LOGIN = async ({ Phone, Email }) => {
  const response = await axios.post(`${REACT_APP_API_HOST}/v1/login/`, {
    email: Email,
    phone: Phone,
  });
  return response;
};
// mobile login verification
export const LOGIN_VERIFICATION = async ({ Phone, otp, Email }) => {
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/login-otp-verification/`,
    {
      email: Email,
      phone: Phone,
      otp: otp,
    }
  );
  console.log(response, "ye login ka response hai");

  return response;
};
//send otp to email
export const SEND_OTP_EMAIL = async ({ Email }) => {
  let item = RetrieveToken()
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/register-email/`,
    {
      email: Email,
    },
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};
//verify otp email
export const EMAIL_OTP_VERIFICATION = async ({ email, otp }) => {
  let item = RetrieveToken()
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/email-verification/`,
    {
      email: email,
      otp: otp,
    },
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};
//update nickname in user details section
export const UPDATE_NICKNAME = async ({ nickname }) => {
  let item = RetrieveToken()
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/update-nickname/`,
    {
      nick_name: nickname,
    },
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};

//update profile pics in userdetails

export const UPDATE_PROFILE_IMAGES = async (image_files) => {
  console.log(image_files);
  let item = RetrieveToken()
  console.log(item, "ye image upload ka token hai");

  let formData = new FormData();
  let i = 1;
  image_files.forEach(
    f => formData.append("file" + i++, f, f.name)
  );
  console.log(formData);
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/update-profile-images/`,
    formData,
    {
      headers: {
        Authorization: `Token ${item}`,
        "Content-Type": "multipart/form-data",
      }
    }
  )
  console.log(response)
  return (response)
}

//update profile userdetails section

export const UPDATE_PROFILE = async (profile_key, profile_value) => {
  let item = RetrieveToken()

  let formData = new FormData();
  if (Array.isArray(profile_value)) {
    profile_value.forEach((e) => formData.append(profile_key, e));
  } else {
    formData.append(profile_key, profile_value);
  }
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/update-profile/`,
    formData,
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};

export const UPDATE_PERSONAL_PROFILE = async (param) => {

  let item = RetrieveToken()

  let formData = new FormData();
  if (typeof param == 'object') {
    Object.keys(param).forEach(function (key) {
      formData.append(key, param[key])
    });
  } else {
    return false;
  }
  console.log(formData, 'UPDATE Personal Profile form data')

  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/update-profile/`,
    formData,
    {
      headers: {
        Authorization: `Token ${item}`,
      }
    }
  )
  console.log(response)
  return (response)
}

//update post in timeline section
export const CREATE_POST = async (images, text, clubID, pageID) => {
  console.log(images, text, "printing parameters before saving post");
  let item = RetrieveToken()
  let formData = new FormData();
  formData.append("text", text);
  if (images) {
    Array.from(images).forEach((f) => formData.append("images", f, f.name));

  }
  if (clubID !== false) {
    formData.append("club_id", clubID);
  } else if (pageID !== false) {
    formData.append("page_id", pageID);
  }

  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/posts/create-post/`,
    formData,
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};
//like post
export const LIKE_POST = async (pid) => {
  let item = RetrieveToken()
  let formData = new FormData();
  formData.append("post_id", pid);

  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/posts/like-post/`,
    formData,
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  try {
    console.log(response.data);
    if (response?.data?.status === "success") {
      return true;
    } else {
      return response?.message;
    }
  } catch (error) {
    return "Something went wrong, try again after some time";
  }
};

//comment api
export const COMMENT_POST = async (pid, comment) => {
  let item = RetrieveToken()
  let formData = new FormData();
  formData.append("post_id", pid);
  formData.append("comment", comment);

  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/posts/comment-post/`,
    formData,
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  try {
    console.log(response.data);
    if (response?.data?.status === "success") {
      return true;
    } else {
      return response?.message;
    }
  } catch (error) {
    return "Something went wrong, try again after some time";
  }
};

//Like profile api
export const LIKE_PROFILE = async (did) => {
  let item = RetrieveToken()
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/like-person/`,
    {
      did: did,
    },
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};

//Friend request api
export const FRIEND_REQUEST = async (did, add_friend) => {
  let item = RetrieveToken()
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/friend-request/`,
    {
      did: did,
      send_friend_request: add_friend,
      transaction_id: "0x0"
    },
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};

//User post list api
export const USER_POST_LIST = async (did) => {
  let item = RetrieveToken()
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/posts/user-posts/`,
    {
      did: did,
    },
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};
//Create Club API
export const CREATE_CLUB = async (
  did,
  clubname,
  description,
  profileImage,
  coverImage,
  interests
) => {
  let item = RetrieveToken()
  let formData = new FormData();
  formData.append("club_name", clubname);
  formData.append("description", description);
  formData.append("profile_image", profileImage);
  formData.append("cover_image", coverImage);
  formData.append("category", interests)
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/create-club/`,
    formData,
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  const receipt = await axios.post(
    `${REACT_APP_WEB3_HOST}/interactions/create-club`,
    {
      emailId: did,
      clubId: response.data.cid
    }
  );
  return response;
};


//Create page api
export const CREATE_PAGE = async (
  pagename,
  description,
  profileImage,
  coverImage
) => {
  let item = RetrieveToken()
  let formData = new FormData();
  formData.append("page_name", pagename);
  formData.append("description", description);
  formData.append("profile_image", profileImage);
  formData.append("cover_image", coverImage);

  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/create-page/`,
    formData,
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  return response;
};

//Join club api
export const USER_JOIN_CLUB = async (did, cid) => {
  let item = RetrieveToken()
  const receipt = await axios.post(
    `${REACT_APP_WEB3_HOST}/interactions/create-club`,
    {
      emailId: did,
      clubId: cid
    }
  );
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/join-club/`,
    {
      club_id: cid,
    },
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};

export const ACCEPT_FRIEND_REQUEST = async (did) => {
  let item = RetrieveToken()
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/friend-request-accept/`,
    {
      did: did
    },
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};


export const MANAGED_SEND_GIFT = async (did, to) => {
  try {
    const response = await axios.post(
      `${REACT_APP_WEB3_HOST}/interactions/sendGift`,
      {
        emailId: did,
        to,
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    throw err
    console.log("caught err haha", err.status);
    throw err
  }
};

export const MANAGED_CLAIM_GIFT = async (did, from) => {
  try {
    const response = await axios.post(
      `${REACT_APP_WEB3_HOST}/interactions/claimGift`,
      {
        emailId: did,
        from,
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    throw err
    console.log("caught err haha", err.status);
  }
};
export const MANAGED_REJECT_REQUEST = async (did, from) => {
  try {
    const response = await axios.post(
      `${REACT_APP_WEB3_HOST}/interactions/rejectGift`,
      {
        emailId: did,
        from,
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    alert("couldn't reject request, try again")
    throw err
    console.log("caught err haha", err.status);
  }
};
export const MANAGED_PAY_SWIPES = async (did, from) => {
  try {
    const response = await axios.post(
      `${REACT_APP_WEB3_HOST}/interactions/lock`,
      {
        emailId: did,
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    alert("couldn't pay for swipes, try again")
    throw err
    console.log("caught err haha", err.status);
  }
};
export const RECORD_SWIPE = async (did, from) => {
  try {
    const response = await axios.post(
      `${REACT_APP_WEB3_HOST}/account/swipe`,
      {
        emailId: did,
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    alert("couldn't pay for swipes, try again")
    throw err
    console.log("caught err haha", err.status);
  }
};
export const MANAGED_CANCEL_REQUEST = async (did, to) => {
  try {
    const response = await axios.post(
      `${REACT_APP_WEB3_HOST}/interactions/cancelGift`,
      {
        emailId: did,
        to,
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    alert("couldn't cancel request, try again")
    throw err
    console.log("caught err haha", err.status);
    throw err
  }
};

export const MANAGED_CANCEL_GIFT = async (did, from) => {
  try {
    const response = await axios.post(
      `${REACT_APP_WEB3_HOST}/interactions/cancelGift`,
      {
        emailId: did,
        from,
      }
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log("caught err haha", err.status);
    throw err
  }
};
export const GET_ACCOUNT = async (did, onError) => {
  try {
    console.log("web3 api url", REACT_APP_WEB3_HOST, REACT_APP_API_HOST)
    const response = await axios.get(
      `${REACT_APP_WEB3_HOST}/wallet/address?emailId=${did}`
    );
    console.log("GET_ACCOUNT", response.data.address);
    return response.data.address;
  } catch (err) {
    console.log("caught err haha", err.response);
    onError(err.response.data.message);
  }
};
export const CREATE_ACCOUNT = async (did, onSuccess) => {
  try {
    const response = await axios.post(`${REACT_APP_WEB3_HOST}/wallet/create`, {
      emailId: did,
    });
    onSuccess(response.data.data.address);
  } catch (err) {
    alert("couldn't create your wallet")
    console.log("caught err haha", err.status);
  }
};

export const CLAIM_DRPD = async (did, onSuccess) => {
  try {
    const response = await axios.post(
      `${REACT_APP_WEB3_HOST}/interactions/claim`,
      {
        emailId: did,
      }
    );
    onSuccess(response);
  } catch (err) {
    alert("couldn't claim drpd")
    console.log("caught err haha", err.status);
  }
};
export const PAY_SUBSCRIPTION = async (did, onSuccess) => {
  try {
    const response = await axios.post(`${REACT_APP_WEB3_HOST}/interactions/paySubscription`, {
      emailId: did,
    });
    console.log(response);
    onSuccess(response);
  } catch (err) {
    alert("couldn't pay the subscription amount, try again")
    console.log("caught err haha", err.status);
  }
};

export const REJECT_FRIEND_REQUEST = async (did) => {
  let item = RetrieveToken()
  const response = await axios.post(
    `${REACT_APP_API_HOST}/v1/friend-request-reject/`,
    {
      did: did,
    },
    {
      headers: {
        Authorization: `Token ${item}`,
      },
    }
  );
  console.log(response);
  return response;
};
