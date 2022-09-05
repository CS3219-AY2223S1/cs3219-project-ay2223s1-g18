import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Chat from "../components/Interview/Chat";

const InterviewPage = () => {
  return (
    <StyledWrapper>
      <Row className="w-100">
        <Col sm={6} lg={4}>
          question
        </Col>
        <Col sm={6} lg={5}>
          code editor
        </Col>
        <Col sm={12} lg={3}>
          <Chat />
        </Col>
      </Row>
    </StyledWrapper>
  );
};

export default InterviewPage;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: calc(100vh - 68px);
  width: 100vw;
  overflow: hidden;
  border-top: 1px solid var(--base-200);
`;
