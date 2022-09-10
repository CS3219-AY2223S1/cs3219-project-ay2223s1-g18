import { useState, React, useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DELETERequest, GETRequest } from "../utils/axios";
import { fetchStorage } from "../utils/storage";
import Modal from "react-bootstrap/Modal";

const SettingsPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(fetchStorage("currentUsername"));
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const handleCloseDeleteAccountModal = () => setShowDeleteAccountModal(false);
  const handleShowDeleteAccountModal = () => setShowDeleteAccountModal(true);
  const navigate = useNavigate();

  useEffect(() => {
    GETRequest(`/${username}`, {})
      .then((res) => {
        if (res.data.response) {
          setEmail(res.data.response[0].email);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  //TODO: Handle this properly
  const deleteAccount = () => {
    // DELETERequest(`/${username}`, {}).then();
    console.log("wheee delete");
    handleCloseDeleteAccountModal();
  };

  return (
    <CardPageWrap>
      <Header>Settings</Header>
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

          <div style={{ width: "100%", marginBottom: "40px" }}>
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
          <Button variant="primary" size="medium">
            Save Changes
          </Button>
          <hr
            style={{ border: "1px solid var(--base-200)", margin: "32px 0" }}
          />
          <Button
            variant="destructive"
            size="small"
            style={{ background: "white", color: "var(--red)", paddingLeft: 0 }}
            onClick={handleShowDeleteAccountModal}
          >
            Delete Account
          </Button>
          <p
            style={{
              marginTop: "8px",
              fontSize: "14px",
              color: "var(--base-500)",
            }}
          >
            We’d hate to see you go, but you’re welcome to delete your account
            anytime. Just remember, once you delete it, it’s gone forever.
          </p>
        </div>
      </CardWrap>

      <Modal
        show={showDeleteAccountModal}
        onHide={handleCloseDeleteAccountModal}
      >
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title style={{ fontWeight: 600 }}>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Click this button to delete your PeerPrep account and erase all of
          your personal data and progress.<b> This action cannot be undone.</b>
        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>
          <Button
            variant="secondary"
            size="small"
            onClick={handleCloseDeleteAccountModal}
          >
            Back to Safety
          </Button>
          <Button variant="destructive" size="small" onClick={deleteAccount}>
            Erase All Personal Data
          </Button>
        </Modal.Footer>
      </Modal>
    </CardPageWrap>
  );
};

export default SettingsPage;

const CardPageWrap = styled.div`
  height: calc(100vh - 64px);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden !important;
  margin-top: 60px;

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
