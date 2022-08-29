import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>

          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>

          {/* <PrivateRoute exact path="/home" component={<HomePage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
