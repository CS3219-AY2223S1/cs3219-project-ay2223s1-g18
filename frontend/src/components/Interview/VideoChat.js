import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Peer from "peerjs";
import { SocketContext } from "../../context/socket";
import { ReactComponent as MicIcon } from "../../assets/icons/MicIcon.svg";
import { ReactComponent as MicOffIcon } from "../../assets/icons/MicOffIcon.svg";
import { ReactComponent as VideocamIcon } from "../../assets/icons/VideocamIcon.svg";
import { ReactComponent as VideocamOffIcon } from "../../assets/icons/VideocamOffIcon.svg";

const VideoChat = ({ peerType, guestSocketId }) => {
  const socket = useContext(SocketContext);
  const [stream, setStream] = useState();
  const [mute, setMute] = useState();
  const [stopVideo, setStopVideo] = useState(false);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (peerId) => {
      if (peerType === "0") {
        socket.emit("host peer id", {
          guestSocketId: guestSocketId,
          hostPeerId: peerId,
        });
      }
    });

    socket.on("host peer id", ({ hostPeerId }) => {
      if (peerType === "1") {
        call(hostPeerId);
      }
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          currentUserVideoRef.current.srcObject = currentStream;
          currentUserVideoRef.current.play();
          call.answer(currentStream);
          call.on("stream", function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        });
    });

    peerInstance.current = peer;
  }, []);

  const muteUnmute = () => {
    const enabled = stream.getAudioTracks()[0].enabled;
    if (enabled) {
      stream.getAudioTracks()[0].enabled = false;
      setMute(true);
    } else {
      stream.getAudioTracks()[0].enabled = true;
      setMute(false);
    }
  };

  const playStopVideo = () => {
    const enabled = stream.getVideoTracks()[0].enabled;
    if (enabled) {
      stream.getVideoTracks()[0].enabled = false;
      setStopVideo(true);
    } else {
      stream.getVideoTracks()[0].enabled = true;
      setStopVideo(false);
    }
  };

  const call = (remotePeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      setStream(mediaStream);
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <VideoWrapper>
          <video playsInline ref={currentUserVideoRef} muted autoPlay />
        </VideoWrapper>
        <VideoWrapper>
          <video playsInline ref={remoteVideoRef} autoPlay />
        </VideoWrapper>
      </div>

      <div
        style={{
          display: "flex",
          position: "relative",
          bottom: "45px",
          justifyContent: "center",
        }}
      >
        <ControlButton onClick={muteUnmute}>
          {mute ? (
            <MicOffIcon style={{ fill: "#d40303" }} />
          ) : (
            <MicIcon style={{ fill: "var(--green)" }} />
          )}
        </ControlButton>
        <ControlButton onClick={playStopVideo}>
          {stopVideo ? (
            <VideocamOffIcon style={{ fill: "#d40303" }} />
          ) : (
            <VideocamIcon style={{ fill: "var(--green)" }} />
          )}
        </ControlButton>
      </div>
    </div>
  );
};

export default VideoChat;

const VideoWrapper = styled.div`
  width: 50%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 50%;

  > video {
    height: 100%;
  }
`;

const ControlButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
  width: min-content;
  cursor: pointer;
  margin: 0 4px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0.4rem;

  :hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  svg {
    height: 20px;
  }
  svg path {
    stroke: white;
  }
`;
