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
    throw err;
    console.log("caught err haha", err.status);
    throw err;
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
    throw err;
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
    alert("couldn't reject request, try again");
    throw err;
    console.log("caught err haha", err.status);
  }
};
