import React, { useEffect, useState } from "react";
import MessageScreen from "../../components/MessageScreen";
import Button from "../../components/Button";
import { POSTRequest } from "../../utils/axios";
import { useLocation } from "react-router-dom";

const CompleteSignup = () => {
  const token = new URLSearchParams(useLocation().search).get("token");

  const [signupSucceeded, setSignupSucceeded] = useState(false);

  useEffect(() => {
    console.log("token: ", token);
    document.cookie = "token=" + token;

    signupVerify();
  }, []);

  const signupVerify = async () => {
    POSTRequest("/signup-verify").then((res) => {
      console.log("res: ", res);
      setSignupSucceeded(true);
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
