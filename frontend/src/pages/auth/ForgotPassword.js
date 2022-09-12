import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSendResetPasswordEmail = () => {};

  return (
    <CardPageWrap>
      <Header>Reset your password</Header>
      <CardWrap>
        <div style={{ maxWidth: "400px" }}>
          <div style={{ width: "100%", marginBottom: "60px" }}>
            <label>Email address</label>
            <input
              type="email"
              required
              placeholder="Enter email here"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{ width: "356px", marginTop: "8px" }}
            />
          </div>

          <Button
            variant="primary"
            size="big"
            style={{ width: "100%", marginBottom: "24px" }}
            onClick={handleSendResetPasswordEmail}
          >
            Reset Password
          </Button>

          <a href="/login">Back to log in</a>
        </div>
      </CardWrap>
    </CardPageWrap>
  );
};

export default ForgotPassword;

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
