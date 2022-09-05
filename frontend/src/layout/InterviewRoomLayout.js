import React from "react";
import { useOutlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const InterviewRoomLayout = () => {
  const outlet = useOutlet();

  return (
    <div>
      <Navbar layout="interviewRoom" />
      {outlet}
    </div>
  );
};

export default InterviewRoomLayout;
