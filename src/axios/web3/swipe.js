import axios from "axios";
const { REACT_APP_API_HOST,REACT_APP_WEB3_HOST } = process.env;
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
    alert("couldn't pay for swipes, try again");
    throw err;
    console.log("caught err haha", err.status);
  }
};
export const RECORD_SWIPE = async (did) => {
  try {
    const response = await axios.post(`${REACT_APP_WEB3_HOST}/wallet/swipe`, {
      emailId: did,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    alert("couldn't record swipe, try again");
    throw err;
    console.log("caught err haha", err.status);
  }
};

export const GET_SWIPES = async (did) => {
  try {
    const response = await axios.get(`${REACT_APP_WEB3_HOST}/wallet/swipes?emailId=${did}`);
    console.log(response.data.swipes);
    return response.data.swipes;
  } catch (err) {
    alert("couldn't fetch swipes, try again");
    throw err;
    console.log("caught err haha", err.status);
  }
};
