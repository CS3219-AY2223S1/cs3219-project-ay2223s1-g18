import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Chat from "../components/Interview/Chat";
import CodeEditor from "../components/Interview/CodeEditor";
import { tempqn } from "../tempQuestion";
import Peer from 'peerjs';

const InterviewPage = () => {
  var peerID = "default"

  const socket = useContext(SocketContext);
  var peer = new Peer(undefined, {
        path: "/peerjs",
        host: "/",
        port: "9000",
    });
  

  let myVideoStream;
  navigator.mediaDevices
      .getUserMedia({
          audio: true,
          video: true,
      })
      .then((stream) => {
          myVideoStream = stream;
          addVideoStream(myVideo, stream);
          peer.on("call", (call) => {
              call.answer(stream);
              const video = document.createElement("video");
              call.on("stream", (userVideoStream) => {
                  addVideoStream(video, userVideoStream);
              });
          });
          socket.on("video-call-me", (userId) => {
              connectToNewUser(userId, stream);
          });
      });

  // Connect to a new user, userID by calling 
  const connectToNewUser = (userId, stream) => {
      const call = peer.call(userId, stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream);
      });
  };

  // Listening for peers establishment
  peer.on("open", (id) => {
      peerID = id;
  });


  const addVideoStream = (video, stream) => {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
          video.play();
          videoGrid.append(video);
      });
  };

  return (
    <StyledWrapper>
      <Row className="w-100">
        <Col sm={6} lg={4} className="p-3">
          {/* <h4>
            <b>Ransom Note</b>
          </h4>
          {tempqn} */}
          <div class="videos__group">
              <div id="video-grid">
                  hi
              </div>
          </div>
        </Col>
        <Col sm={6} lg={5}>
          <CodeEditor />
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
