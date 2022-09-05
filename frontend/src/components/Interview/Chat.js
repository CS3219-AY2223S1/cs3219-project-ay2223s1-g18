import React from "react";
import styled from "styled-components";
import arrowIcon from "../../assets/arrow-right.svg";

const Chat = () => {
  return (
    <StyledChatWrapper>
      <div>
        <Announcement
          emoji="🎉"
          message="Mickey Mouse joined the room."
          time="00:59"
        />
        <ChatMessage
          sender="Mickey Mouse"
          message="Hello how are you today"
          time="Today at 01:23"
        />
        <ChatMessage
          sender="Minnie Mouse"
          message="Good good good"
          time="Today at 01:23"
        />
        <Announcement
          emoji="🏁"
          message="Mickey Mouse left the room."
          time="01:32"
        />
      </div>

      <div className="d-flex">
        <input placeholder="Type a message" />
        <StyledSendButton>
          <img src={arrowIcon} alt="" />
        </StyledSendButton>
      </div>
    </StyledChatWrapper>
  );
};

export default Chat;

var Announcement = ({ emoji, message, time }) => {
  return (
    <StyledAnnouncement>
      <div className="d-flex align-items-center">
        <p className="emoji">{emoji}</p>
        <p>{message}</p>
      </div>
      <p className="time">{time}</p>
    </StyledAnnouncement>
  );
};

var ChatMessage = ({ sender, message, time }) => {
  return (
    <StyledChatMessage>
      <div className="d-flex align-items-center">
        <p className="sender">{sender}</p>
        <p className="time">{time}</p>
      </div>
      <p className="message">{message}</p>
    </StyledChatMessage>
  );
};

const StyledChatMessage = styled.div`
  padding: 0 8px;
  margin: 12px 0;

  .sender {
    font-weight: 500;
    margin-right: 8px;
  }
  .time {
    font-size: 12px;
    color: var(--base-500);
  }
  .message {
    color: var(--base-500);
    font-size: 14px;
  }
  p {
    margin-bottom: 0;
  }
`;

const StyledSendButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 43px;
  transition: 200ms;

  :hover {
    background-color: var(--base-200);
  }
`;

const StyledAnnouncement = styled.div`
  background-color: var(--base-100);
  border-radius: 4px;
  color: var(--base-800);
  width: 100%;
  padding: 6px 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;

  .emoji {
    font-size: 20px;
    margin-right: 8px;
  }
  .time {
    font-size: 12px;
    color: var(--base-500);
  }
  p {
    margin-bottom: 0;
  }
`;

const StyledChatWrapper = styled.div`
  padding: 8px;
  border-left: 1px solid var(--base-200);
  height: calc(100vh - 68px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
