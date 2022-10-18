import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const MessageScreen = ({ emoji, messageTitle, description, children }) => {
  return (
    <Container>
      <h1 style={{ fontSize: "80px", marginBottom: "32px" }}>{emoji}</h1>
      <h1 style={{ fontWeight: "600" }}>{messageTitle}</h1>
      {description && (
        <p
          style={{
            color: "var(--base-700)",
            marginBottom: "40px",
          }}
        >
          {description}
        </p>
      )}

      {children}
    </Container>
  );
};

export default MessageScreen;

MessageScreen.propTypes = {
  emoji: PropTypes.string,
  messageTitle: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 64px);
  width: 100vw;
`;
