import React from "react";
import styled from "styled-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState } from "react";
import MatchNotFound from "../components/MatchNotFound";

const renderTime = ({ remainingTime }) => {
  return <h1>{remainingTime}</h1>;
};

const CountdownPage = () => {
  const [countingDown, setCountingDown] = useState(true);

  return (
    <div>
      {countingDown ? (
        <StyledWrapper>
          <h2>Finding you a match...</h2>
          <div>
            {/* TODO: change time to 30 secs */}
            <CountdownCircleTimer
              isPlaying
              duration={5}
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
        <MatchNotFound />
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
