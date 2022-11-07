import React from "react";
import styled from "styled-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import MessageScreen from "../components/MessageScreen";
import Button from "../components/Button";

const renderTime = ({ remainingTime }) => {
  return <h1>{remainingTime}</h1>;
};

const CountdownPage = () => {
  const [countingDown, setCountingDown] = useState(true);
  var countdownTime = 30;
  return (
    <div>
      {countingDown ? (
        <StyledWrapper>
          <h2>Finding you a match...</h2>
          <div>
            <CountdownCircleTimer
              isPlaying
              duration={countdownTime}
              colors="#4f46e5"
              trailColor="#E0E7FF"
              strokeWidth={20}
              size={250}
              onComplete={() => setCountingDown(false)}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        </StyledWrapper>
      ) : (
        <MessageScreen
          emoji="😢"
          messageTitle="Match not found..."
          description="There are no other users online now."
        >
          <div className="d-flex">
            <a href="/home">
              <Button variant="secondary" style={{ marginLeft: "12px" }}>
                Choose another difficulty
              </Button>
            </a>
          </div>
        </MessageScreen>
      )}
    </div>
  );
};

export default CountdownPage;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
  width: 100vw;
  margin: auto;

  h2 {
    text-align: center;
    margin-bottom: 60px;
  }
`;
