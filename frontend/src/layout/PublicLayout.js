import React from "react";
import { fetchStorage } from "../utils/storage";
import { Navigate, useOutlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => {
  let isAuthenticated = fetchStorage("currentUsername") && document.cookie;
  const outlet = useOutlet();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <Navbar layout="public" />
      {outlet}
    </div>
  );
};

export default PublicLayout;
