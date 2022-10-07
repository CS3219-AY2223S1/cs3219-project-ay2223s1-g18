import React, { useContext, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Chat from "../components/Interview/Chat";
import CodeEditor from "../components/Interview/CodeEditor";
import VideoChat from "../components/Interview/VideoChat";
import Question from "../components/Interview/Question";
import FeedbackForm from "../components/Interview/FeedbackForm";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { STATUS_CODE_OK } from "../utils/constants";
import { QuestionSvcGETRequest } from "../utils/QuestionService";
import Modal from "react-bootstrap/Modal";

const InterviewPage = () => {
  let paramArr = useParams().name.split("-");
  let difficulty = paramArr[0];
  let peerType = paramArr[1];
  let guestSocketId = paramArr[2];
  let question_id = paramArr[3];
  const [question, setQuestion] = useState();
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);

  const handleCloseEndSessionModal = () => setShowEndSessionModal(false);
  const handleShowEndSessionModal = () => setShowEndSessionModal(true);

  const [sessionEnded, setSessionEnded] = useState(false);
  const [partnerSocketId, setPartnerSocketId] = useState();
  const socket = useContext(SocketContext);

  useEffect(() => {
    QuestionSvcGETRequest(`/${question_id}`).then((res) => {
      if (res.status === STATUS_CODE_OK) {
        setQuestion(res.data.data);
      }
    });
  }, [question_id]);

  const handleEndSession = () => {
    socket.emit("end session");
  };

  useEffect(() => {
    socket.on("partner socketId", (partnerSocketId) => {
      console.log("partnerSocketId: ", partnerSocketId);
      setPartnerSocketId(partnerSocketId);
    });

    socket.on("end session for all", () => {
      setSessionEnded(true);
    });
  }, [socket]);

  return sessionEnded ? (
    <FeedbackForm partnerSocketId={partnerSocketId} question={question} />
  ) : (
    <div>
      <StyledNav>
        <Button
          variant="secondary"
          size="small"
          onClick={handleShowEndSessionModal}
        >
          End Session
        </Button>
        <h3 className="m-0">Practice</h3>
        <Button variant="secondary" size="small">
          Next Question
        </Button>
      </StyledNav>
      <StyledWrapper>
        <Row className="w-100">
          <Col sm={6} lg={4}>
            <Question difficulty={difficulty} question={question} />
          </Col>
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
              {/* <VideoChat peerType={peerType} guestSocketId={guestSocketId} /> */}
              <Chat />
            </div>
          </Col>
        </Row>
      </StyledWrapper>

      <Modal show={showEndSessionModal} onHide={handleCloseEndSessionModal}>
        <Modal.Header closeButton>
          <Modal.Title>End Interview Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will terminate the interview session for you and your peer, are
          you sure you are done with the question?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEndSessionModal}>
            Back to room
          </Button>
          <Button variant="primary" onClick={handleEndSession}>
            Yes, end session
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
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

const StyledNav = styled.nav`
  width: 100%;
  height: 64px;
  margin-left: auto;
  margin-right: auto;
  padding: 8px 32px;
  border-bottom: 1px solid var(--base-100);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 640px) {
    padding-top: 12px;
  }
`;
