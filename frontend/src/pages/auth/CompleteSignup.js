import React, { useEffect, useState } from "react";
import MessageScreen from "../../components/MessageScreen";
import Button from "../../components/Button";
import { POSTRequest } from "../../utils/axios";
import { clearCookies, setAccessToken } from "../../utils/TokenService";
import { useLocation } from "react-router-dom";

const CompleteSignup = () => {
  const token = new URLSearchParams(useLocation().search).get("token");
  setAccessToken(token);
  const [signupSucceeded, setSignupSucceeded] = useState(false);

  useEffect(() => {
    signupVerify();
  }, []);

  const signupVerify = () => {
    POSTRequest("USER", "/signup-verify").then((res) => {
      if (res.data.status) {
        setSignupSucceeded(true);
        clearCookies();
      }
    });
  };

  return signupSucceeded ? (
    <MessageScreen emoji="🎉" messageTitle="Account successfully created!">
      <a href="/login">
        <Button style={{ marginTop: "32px" }}>Log in</Button>
      </a>
    </MessageScreen>
  ) : (
    <MessageScreen emoji="😭" messageTitle="We're sorry, something went wrong.">
      <a href="/signup">
        <Button style={{ marginTop: "32px" }}>Try signing up again</Button>
      </a>
    </MessageScreen>
  );
};

export default CompleteSignup;
