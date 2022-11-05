import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/socket";
import styled from "styled-components";
import arrowIcon from "../../assets/icons/ArrowRightIcon.svg";
import { fetchStorage } from "../../utils/LocalStorageService";
import PropTypes from "prop-types";

const Chat = () => {
  const socket = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  let currUser = fetchStorage("currentUsername");

  useEffect(() => {
    socket.on("chat message", (messageObject) => {
      setAllMessages([...allMessages, messageObject]);
    });
  }, [socket, allMessages]);

  useEffect(() => {
    socket.on("sendAnnouncement", (messageObject) => {
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
        type: 0,
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
      <div style={{ overflowY: "scroll", height: "100%" }}>
        {allMessages.map((message, index) => {
          if (message.type === 1) {
            // Announcement
            return (
              <Announcement emoji="✨" message={message.msg} key={index} />
            );
          }
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

var Announcement = ({ emoji, message }) => {
  return (
    <StyledAnnouncement>
      <div className="d-flex align-items-center">
        <p className="emoji">{emoji}</p>
        <p>{message}</p>
      </div>
    </StyledAnnouncement>
  );
};

Announcement.propTypes = {
  emoji: PropTypes.string,
  message: PropTypes.string,
};

var ChatMessage = ({ sender, message, time }) => {
  return (
    <StyledChatMessage>
      <div className="d-flex align-items-center">
        <p className="sender">{sender}</p>
        <p className="time">{time}</p>
      </div>
      <p className="message">{message.msg}</p>
    </StyledChatMessage>
  );
};

ChatMessage.propTypes = {
  sender: PropTypes.string,
  message: PropTypes.string,
  time: PropTypes.string,
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
      {message.msg}
    </p>
  );
};

SubChatMessage.propTypes = {
  emoji: PropTypes.string,
  message: PropTypes.object,
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
