import React from "react";
import { fetchStorage } from "../utils/storage";
import { Navigate, useOutlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const InterviewRoomLayout = () => {
  let isAuthenticated = fetchStorage("currentUsername") && document.cookie;
  const outlet = useOutlet();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Navbar layout="interviewRoom" />
      {outlet}
    </div>
  );
};

export default InterviewRoomLayout;
