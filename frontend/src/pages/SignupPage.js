import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_CONFLICT, STATUS_CODE_CREATED } from "../constants";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import Button from "../components/Button";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const handleSignup = async () => {
    setIsSignupSuccess(false);
    const res = await axios
      .post(URL_USER_SVC, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_CONFLICT) {
          setError("This username already exists");
        } else {
          setError("Please try again later");
        }
      });
    if (res && res.status === STATUS_CODE_CREATED) {
      setIsSignupSuccess(true);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <CardPageWrap>
        <a href="/">
          <img
            src={logo}
            alt="logo"
            style={{
              height: "32px",
              margin: "60px 0 40px 0",
              cursor: "pointer",
            }}
          />
        </a>
        <Header>Welcome to Peerprep!</Header>
        <CardWrap>
          <Card>
            <div style={{ width: "100%", marginBottom: "24px" }}>
              <label>Username</label>
              <input
                type="username"
                required
                placeholder="Your username here"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                style={{ width: "356px" }}
              />
              {error && (
                <p style={{ color: "var(--red)", marginTop: "8px" }}>{error}</p>
              )}
            </div>

            <label>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "356px" }}
            />
            <Button
              variant="primary"
              size="big"
              style={{ marginTop: "48px", width: "100%" }}
              onClick={handleSignup}
            >
              Sign up
            </Button>
            <p>
              Already have an account? <a href="/home">Log in</a>
            </p>
          </Card>
        </CardWrap>
      </CardPageWrap>
    </div>
  );
}

export default SignupPage;

const CardPageWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 24px;
  overflow-x: hidden;
`;

const Header = styled.h1`
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
  font-size: var(--text-xl);
  font-weight: 800;
`;

const CardWrap = styled.div`
  display: grid;
  margin: 0;
  gap: 24px;
  padding: 24px 0;

  @media (min-width: 640px) {
    padding: 32px 0;
  }

  @media (min-width: 832px) {
    padding: 64px 48px;
  }
`;

const Card = styled.div`
  display: block;
  padding: 24px;
  max-width: 400px;

  @media (min-width: 640px) {
    padding: 32px;
  }

  @media (min-width: 832px) {
    padding: 32px 48px;
    margin: 0 auto;
    width: 100%;
  }
`;
