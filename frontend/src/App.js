import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import CountdownPage from "./pages/CountdownPage";
import InterviewPage from "./pages/InterviewPage";
import PublicLayout from "./layout/PublicLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import InterviewRoomLayout from "./layout/InterviewRoomLayout";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
          </Route>

          <Route path="/" element={<ProtectedLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/loading" element={<CountdownPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="/" element={<InterviewRoomLayout />}>
            <Route path="/interview" element={<InterviewPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
