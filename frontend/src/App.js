import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
