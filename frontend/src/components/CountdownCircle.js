import React from "react";
import styled from "styled-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too late...</div>;
  }

  return (
    <div className="timer">
      <h1>{remainingTime}</h1>
    </div>
  );
};

const CountdownCircle = () => {
  return (
    <StyledWrapper>
      <h2>Finding you a match...</h2>
      <div>
        <CountdownCircleTimer
          isPlaying
          duration={30}
          colors="#4f46e5"
          trailColor="#E0E7FF"
          strokeWidth={20}
          size={250}
          onComplete={() => ({ shouldRepeat: true, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </StyledWrapper>
  );
};

export default CountdownCircle;

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
