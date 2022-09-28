import React, { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Peer from "simple-peer";
import { SocketContext } from "../../context/socket";
import { useRef } from "react";

const VideoChat = () => {
  const socket = useContext(SocketContext);
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const [name, setName] = useState("");
  const [mute, setMute] = useState(true);
  const [stopVideo, setStopVideo] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  //   var peer = new Peer(undefined, {
  //     path: "/peerjs",
  //     host: "localhost",
  //     port: "9000",
  //   });
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });
    socket.on("calluser", ({ name, signal }) => {
      setReceivingCall(true);
      setName(name);
      setCallerSignal(signal);
    });
  }, []);

  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        signalData: data,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on("callaccepted", ({ signal }) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
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

  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* {stream && ( */}
        <video
          playsInline
          ref={myVideo}
          muted
          autoPlay
          style={{ width: "50%", borderRadius: "50%" }}
        />
        {/* )} */}
        {/* {callAccepted && !callEnded && ( */}
        <video
          playsInline
          ref={userVideo}
          muted
          autoPlay
          style={{ width: "50%", borderRadius: "50%" }}
        />
        {/* )} */}
      </div>

      <button onClick={playStopVideo}>
        {stopVideo ? (
          <span style={{ color: "#d40303" }}>Play Video</span>
        ) : (
          <span>Stop Video</span>
        )}
      </button>

      <button onClick={muteUnmute}>
        {mute ? (
          <span style={{ color: "#d40303" }}>Unmute</span>
        ) : (
          <span>Mute</span>
        )}
      </button>

      <button onClick={() => callUser()}>Join</button>

      {receivingCall && !callAccepted && (
        <button onClick={answerCall}>Accept</button>
      )}
    </div>
  );
};

export default VideoChat;

const VideoContainer = styled.div`
  flex-grow: 1;
  background-color: black;
  border: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;

  > video {
    max-width: 30rem;
    max-height: 22rem;
    border: 1px solid red;
  }
`;
