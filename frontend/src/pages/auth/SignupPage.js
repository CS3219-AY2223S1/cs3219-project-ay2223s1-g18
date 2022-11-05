import styled from "styled-components";
import React, { useState } from "react";
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_ACCEPTED,
} from "../../utils/constants";
import Button from "../../components/Button";
import { POSTRequest } from "../../utils/axios";
import MessageScreen from "../../components/MessageScreen";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    if (checkInputsFilled()) {
      POSTRequest("USER", "/signup", { email, username, password })
        .then((res) => {
          if (res && res.status === STATUS_CODE_ACCEPTED) {
            setIsSignedUp(true);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === STATUS_CODE_CONFLICT) {
            setError("Username or email has already been taken.");
          } else {
            setError("Something went wrong. Please try again later");
          }
        });
    }
  };

  const checkInputsFilled = () => {
    setError("");
    var allInputsFilled = true;
    if (email) {
      setEmailError(false);
    } else {
      setEmailError(true);
      allInputsFilled = false;
    }
    if (username) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
      allInputsFilled = false;
    }
    if (password) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
      allInputsFilled = false;
    }
    return allInputsFilled;
  };

  return !isSignedUp ? (
    <CardPageWrap>
      <Header>Welcome to Peerprep!</Header>
      <CardWrap>
        <div style={{ maxWidth: "400px" }}>
          <div style={{ width: "100%", marginBottom: "24px" }}>
            <label>Email</label>
            <input
              type="email"
              required
              placeholder="Your email here"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{ width: "356px" }}
            />
            {emailError && (
              <p style={{ color: "var(--red)", marginTop: "8px" }}>Required</p>
            )}
          </div>

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
            {usernameError && (
              <p style={{ color: "var(--red)", marginTop: "8px" }}>Required</p>
            )}
          </div>

          <div style={{ width: "100%", marginBottom: "24px" }}>
            <label>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "356px" }}
            />
            {passwordError && (
              <p style={{ color: "var(--red)", marginTop: "8px" }}>Required</p>
            )}
          </div>

          {error && (
            <p style={{ color: "var(--red)", marginBottom: "8px" }}>{error}</p>
          )}

          <Button
            variant="primary"
            size="big"
            style={{ width: "100%" }}
            onClick={handleSignup}
            loading={loading}
            disabled={!email || !username || !password}
          >
            Sign up
          </Button>

          <p style={{ marginTop: "16px" }}>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </CardWrap>
    </CardPageWrap>
  ) : (
    <MessageScreen
      emoji="💌"
      messageTitle="Email sent!"
      description="Didn't get the email? Check your spam folder."
    />
  );
}

export default SignupPage;

const CardPageWrap = styled.div`
  width: 100vw;
  height: calc(100vh - 64px);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h1`
  margin: 0 auto;
  max-width: 700px;
  text-align: center;
  font-size: var(--text-2xl);
  font-weight: 800;
`;

const CardWrap = styled.div`
  display: flex;
  justify-content: center;
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
