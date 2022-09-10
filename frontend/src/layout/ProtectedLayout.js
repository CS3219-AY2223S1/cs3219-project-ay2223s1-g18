import React from "react";
import { fetchStorage } from "../utils/storage";
import { Navigate, useOutlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => {
  let isAuthenticated = fetchStorage("currentUsername") && document.cookie;
  const outlet = useOutlet();

  if (!isAuthenticated) {
    return <Navigate to="/signup" />;
  }

  return (
    <div>
      <Navbar layout="protected" />
      {outlet}
    </div>
  );
};

export default ProtectedLayout;
