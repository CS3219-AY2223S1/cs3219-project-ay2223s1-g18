import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CountdownPage from "./pages/CountdownPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>

          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>

          <Route
            path="/home"
            // render={() =>
            //   document.cookie ? <HomePage /> : <Navigate to="/login" />
            // }
            // render={() =>
            //   document.cookie ? <HomePage /> : <Navigate to="/login" />
            // }
            element={document.cookie ? <HomePage /> : <Navigate to="/" />}
          />
          <Route path="/loading" element={<CountdownPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
