import React from "react";
import MessageScreen from "../components/MessageScreen";
import Button from "../components/Button";

const PageNotFound = () => {
  return (
    <MessageScreen
      emoji="🐴"
      messageTitle="Look, a pony!"
      description="Oh. That's not what you're looking for? Sorry.."
    >
      <a href="/">
        <Button>Back to home</Button>
      </a>
    </MessageScreen>
  );
};

export default PageNotFound;
