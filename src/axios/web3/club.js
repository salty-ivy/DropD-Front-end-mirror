export const CREATE_CLUB = async (did, from) => {
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
  export const JOIN_CLUB = async (did, from) => {
    try {
      const response = await axios.post(`${REACT_APP_WEB3_HOST}/account/swipe`, {
        emailId: did,
      });
      console.log(response);
      return response;
    } catch (err) {
      alert("couldn't pay for swipes, try again");
      throw err;
      console.log("caught err haha", err.status);
    }
  };
  