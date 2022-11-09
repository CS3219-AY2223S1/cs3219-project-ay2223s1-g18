import React from "react";
import MessageScreen from "../components/MessageScreen";
import Button from "../components/Button";

const ErrorPage = () => {
  return (
    <MessageScreen
      emoji="😭"
      messageTitle="It's not you, it's us"
      description="Something went wrong. We're really sorry."
    >
      <a href="/">
        <Button>Back to home</Button>
      </a>
    </MessageScreen>
  );
};

export default ErrorPage;
