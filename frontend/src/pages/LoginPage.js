import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.svg";
import Button from "../components/Button";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
              margin: "40px 24px",
              cursor: "pointer",
            }}
          />
        </a>
        <Header>Hey, welcome back!</Header>
        <CardWrap>
          <div style={{ maxWidth: "400px" }}>
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
                <p
                  style={{
                    color: "var(--red)",
                    fontWeight: "600",
                    marginTop: "8px",
                  }}
                >
                  {error}
                </p>
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
            <a>
              <p className="mt-2" style={{ textAlign: "end" }}>
                Forgot password?
              </p>
            </a>

            <Button
              variant="primary"
              size="big"
              style={{ marginTop: "48px", width: "100%" }}
            >
              Log in
            </Button>
            <p style={{ marginTop: "8px" }}>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </CardWrap>
      </CardPageWrap>
    </div>
  );
}

export default LoginPage;

const CardPageWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;
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
