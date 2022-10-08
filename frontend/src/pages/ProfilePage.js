import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchStorage } from "../utils/LocalStorageService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PlaceholderDp from "../components/PlaceholderDp";
import Button from "../components/Button";
import UserHistoryEntry from "../components/UserHistoryEntry";
import Accordion from "react-bootstrap/Accordion";
import { getUserHistory } from "../utils/UserHistoryService";
import { STATUS_CODE_OK } from "../utils/constants";

const ProfilePage = () => {
  const currentUsername = fetchStorage("currentUsername");
  const [userHistory, setUserHistory] = useState();

  useEffect(() => {
    getUserHistory(`/${currentUsername}`).then((res) => {
      if (res.status === STATUS_CODE_OK) {
        setUserHistory(res.data.data);
      }
    });
  }, []);

  return (
    <Container
      style={{
        maxWidth: "1200px",
        marginTop: "40px",
      }}
    >
      <Row>
        <Col xs={12} md={4}>
          <UserInfoContainer>
            <div>
              <PlaceholderDp initial={currentUsername} size={60} />
              <h4 style={{ marginTop: "16px" }}>{currentUsername}</h4>
            </div>
            <div>
              <p className="mb-2">⭐️ Level 5</p>
              <p className="mb-0">📊 23 sessions joined</p>
            </div>
            <p>🗓 Member since 25 Aug</p>
            <a href="settings">
              <Button
                variant="secondary"
                size="small"
                style={{ width: "100%" }}
              >
                Edit Profile
              </Button>
            </a>
          </UserInfoContainer>
        </Col>
        <Col xs={12} md={8}>
          {/* <SessionHistoryContainer>
            <div className="emoji">⛺️</div>
            <h4 className="mb-5">No recent submissions!</h4>
            <a href="/">
              <Button size="small">Do some practice</Button>
            </a>
          </SessionHistoryContainer> */}
          {userHistory && <UserHistorySection userHistory={userHistory} />}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;

const UserHistorySection = ({ userHistory }) => {
  return (
    <>
      <h3>Past Sessions</h3>
      <Accordion style={{ display: "grid", gap: "12px", marginTop: "20px" }}>
        {userHistory.map((session, index) => (
          <UserHistoryEntry session={session} key={session._id} index={index} />
        ))}
      </Accordion>
    </>
  );
};

const UserInfoContainer = styled.div`
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--base-100);

  display: grid;
  grid-auto-flow: row;
  row-gap: 24px;

  p {
    color: var(--base-600);
  }
`;

const SessionHistoryContainer = styled.div`
  padding: 12px 0;
  border-radius: 16px;
  border: 1px solid var(--base-100);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 68px - 80px);

  .emoji {
    font-size: 80px;
    margin-bottom: 12px;
  }
`;
