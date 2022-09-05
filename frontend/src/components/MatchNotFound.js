import React from "react";
import styled from "styled-components";
import Button from "./Button";

const MatchNotFound = () => {
  return (
    <Container>
      <h1 style={{ fontSize: "80px", marginBottom: "32px" }}>😢</h1>
      <h1 style={{ fontWeight: "600" }}>Match not found...</h1>
      <p
        style={{
          color: "var(--base-700)",
          marginBottom: "40px",
        }}
      >
        There are no other users online now.
      </p>

      <div className="d-flex">
        <a href="/loading">
          <Button>Continue Waiting</Button>
        </a>
        <a href="/home">
          <Button variant="secondary" style={{ marginLeft: "12px" }}>
            Choose another difficulty
          </Button>
        </a>
      </div>
    </Container>
  );
};

export default MatchNotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 64px);
  width: 100vw;
`;
