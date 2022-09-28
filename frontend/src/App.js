import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CountdownPage from "./pages/CountdownPage";
import InterviewPage from "./pages/InterviewPage";
import PublicLayout from "./layout/PublicLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import InterviewRoomLayout from "./layout/InterviewRoomLayout";
import SettingsPage from "./pages/SettingsPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import CompleteSignup from "./pages/auth/CompleteSignup";
import { SocketContext, socket } from "./context/socket";

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route exact path="/" element={<LandingPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/signup" element={<SignupPage />}></Route>
              <Route
                path="/completeSignup"
                element={<CompleteSignup />}
              ></Route>
              <Route
                path="/forgotPassword"
                element={<ForgotPassword />}
              ></Route>
              <Route path="/passwordReset" element={<ResetPassword />}></Route>
            </Route>
            <Route path="/" element={<ProtectedLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/loading" element={<CountdownPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="/" element={<InterviewRoomLayout />}>
              <Route path="/interview/:name" element={<InterviewPage />} />
            </Route>
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
