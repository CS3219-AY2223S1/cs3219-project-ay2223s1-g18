import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Chat from "../components/Interview/Chat";
import CodeEditor from "../components/Interview/CodeEditor";
import VideoChat from "../components/Interview/VideoChat";
import { useParams } from "react-router-dom";

const InterviewPage = () => {
  let paramArr = useParams().name.split("-");
  let difficulty = paramArr[0];
  let peerType = paramArr[1];
  let guestSocketId = paramArr[2];

  return (
    <StyledWrapper>
      <Row className="w-100">
        <Col sm={6} lg={4} className="p-3"></Col>
        <Col sm={6} lg={5}>
          <CodeEditor />
        </Col>
        <Col sm={12} lg={3}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "calc(100vh - 68px)",
            }}
          >
            <VideoChat peerType={peerType} guestSocketId={guestSocketId} />
            <Chat />
          </div>
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
