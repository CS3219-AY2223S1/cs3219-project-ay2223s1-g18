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
import CountdownCircle from "./components/CountdownCircle";

function App() {
  return (
    <div className="App">
      <CountdownCircle />

      {/* <Router>
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
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
