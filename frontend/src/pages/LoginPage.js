import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { saveStorage } from "../storage";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios
      .post(`${URL_USER_SVC}/auth/`, { username, password })
      .catch((err) => {
        setError(err);
      });
    if (res && res.data.status) {
      document.cookie = "token=" + res.data.response.token;
      saveStorage("currentUsername", username);
      navigate("/home");
    }
  };

  return (
    <CardPageWrap>
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
          <a href="/resetPassword">
            <p className="mt-2" style={{ textAlign: "end" }}>
              Forgot password?
            </p>
          </a>

          {error && (
            <p
              style={{
                color: "var(--red)",
                marginBottom: "8px",
                marginTop: "48px",
              }}
            >
              {error}
            </p>
          )}
          <Button
            variant="primary"
            size="big"
            style={{ width: "100%" }}
            onClick={handleLogin}
          >
            Log in
          </Button>
          <p style={{ marginTop: "16px" }}>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </CardWrap>
    </CardPageWrap>
  );
}

export default LoginPage;

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
