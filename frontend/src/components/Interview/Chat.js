import React, { useState, useEffect } from "react";
import styled from "styled-components";
import arrowIcon from "../../assets/arrow-right.svg";
import socketIO from "socket.io-client";
import { fetchStorage } from "../../utils/storage";

const Chat = () => {
  var socket = socketIO("http://localhost:8001/", {
    transports: ["websocket"],
  });
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  let currUser = fetchStorage("currentUsername");

  useEffect(() => {
    socket.on("chat message", (messageObject) => {
      setAllMessages([...allMessages, messageObject]);
    });
  }, [socket, allMessages]);

  var handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      let today = new Date();
      let currTime = today.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      socket.emit("chat message", {
        msg: message,
        sender: currUser,
        time: currTime,
      });
    }
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  return (
    <StyledChatWrapper>
      <div>
        {allMessages.map((message, index) => {
          if (index > 0 && message.sender === allMessages[index - 1].sender) {
            return <SubChatMessage message={message.msg} key={index} />;
          } else {
            return (
              <ChatMessage
                sender={message.sender}
                time={message.time}
                message={message.msg}
                key={index}
              />
            );
          }
        })}
      </div>

      <div className="d-flex">
        <input
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <StyledSendButton onClick={(e) => handleSendMessage(e)}>
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

var SubChatMessage = ({ message }) => {
  return (
    <p
      style={{
        color: "var(--base-500)",
        fontSize: "14px",
        padding: "0 8px",
        marginBottom: "4px",
      }}
    >
      {message}
    </p>
  );
};

const StyledChatMessage = styled.div`
  padding: 0 8px;
  margin: 4px 0;

  .sender {
    font-weight: 500;
    margin: 8px 8px 4px 0;
  }
  .time {
    font-size: 12px;
    color: var(--base-500);
    margin-top: 8px;
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
