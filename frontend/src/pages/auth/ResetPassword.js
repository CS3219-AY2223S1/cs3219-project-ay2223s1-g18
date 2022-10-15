import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { clearCookies, setAccessToken } from "../../utils/TokenService";
import { PATCHRequest } from "../../utils/axios";
import MessageScreen from "../../components/MessageScreen";

const ResetPassword = () => {
  const token = new URLSearchParams(useLocation().search).get("token");

  setAccessToken(token);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [successfullyReset, setSuccessfullyReset] = useState(false);

  const handleResetPassword = () => {
    setPasswordErr("");
    if (password) {
      PATCHRequest(`/password-reset-verify`, { password }).then((res) => {
        if (res.data.status) {
          clearCookies();
          setSuccessfullyReset(true);
        }
      });
    } else {
      setPasswordErr("Please enter a new password.");
    }
  };

  return successfullyReset ? (
    <MessageScreen
      emoji="🎉"
      messageTitle="Password successfully reset!"
      description="Try logging in again with your new password."
    >
      <a href="/login">
        <Button>Back to sign in</Button>
      </a>
    </MessageScreen>
  ) : (
    <CardPageWrap>
      <Header>Reset your password</Header>
      <CardWrap>
        <div style={{ maxWidth: "400px" }}>
          <div style={{ width: "100%", marginBottom: "60px" }}>
            <label>New password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{ width: "356px", marginTop: "8px" }}
            />
            {passwordErr && (
              <p
                style={{
                  color: "var(--red)",
                  fontWeight: "600",
                  marginTop: "8px",
                }}
              >
                {passwordErr}
              </p>
            )}
          </div>

          <Button
            variant="primary"
            size="big"
            style={{ width: "100%" }}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </div>
      </CardWrap>
    </CardPageWrap>
  );
};

export default ResetPassword;

const CardPageWrap = styled.div`
  width: 100vw;
  height: calc(100vh - 64px);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  overflow-x: hidden;
  margin-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-top: 32px;

  @media (min-width: 640px) {
    padding: 32px 0;
  }

  @media (min-width: 832px) {
    padding: 64px 48px;
  }
`;
