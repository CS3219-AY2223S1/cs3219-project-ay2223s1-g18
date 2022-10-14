import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ProgressBar, Container, Row, Col, Accordion } from "react-bootstrap";
import PlaceholderDp from "../components/PlaceholderDp";
import { fetchStorage } from "../utils/LocalStorageService";
import Button from "../components/Button";
import UserHistoryEntry from "../components/UserHistoryEntry";
import { getUserHistory } from "../utils/UserHistoryService";
import { STATUS_CODE_OK } from "../utils/constants";
import { useParams } from "react-router-dom";
import { GETRequest } from "../utils/axios";
import { Spinner } from "react-bootstrap";

const ProfilePage = () => {
  let currentUsername = fetchStorage("currentUsername");
  let username = useParams().username;
  const [loading, setLoading] = useState(false);
  const [peerPoints, setPeerPoints] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [userHistory, setUserHistory] = useState();
  const [nextMilestone, setNextMilestone] = useState(0);

  useEffect(() => {
    setLoading(true);
    GETRequest(`/accounts/${username}`)
      .then((res) => {
        if (res.status === STATUS_CODE_OK) {
          getUserHistory(`/${username}`).then((res) => {
            if (res.status === STATUS_CODE_OK) {
              setUserHistory(res.data.data.reverse());
              getAverageRating(res.data.data);
              calculateNextMilestone(res.data.data.length);
              setLoading(false);
            }
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        // console.log("err: ", err);
        window.location.href = "/404";
      });
  }, []);

  var calculateNextMilestone = (numSessionsDone) => {
    var nextMilestone = 1;
    if (numSessionsDone > 0) {
      nextMilestone = Math.ceil((numSessionsDone + 1) / 5) * 5;
    }
    setNextMilestone(nextMilestone);
  };

  var getAverageRating = (historyArr) => {
    var sum = 0;
    for (var session of historyArr) {
      sum += session.ratingReceived;
    }
    setPeerPoints(sum);
    var averageRating = sum === 0 ? 0 : (sum / historyArr.length).toFixed(2);

    setAverageRating(averageRating);
  };

  return (
    <Container
      style={{
        maxWidth: "1200px",
        marginTop: "40px",
        marginBottom: "40px",
      }}
    >
      {loading ? (
        <Spinner animation="grow" variant="secondary" size="xl" />
      ) : (
        <Row>
          <Col xs={12} md={4}>
            {userHistory && (
              <UserInfoContainer>
                <div>
                  <PlaceholderDp initial={username} size={60} />
                  <h4 style={{ marginTop: "16px" }}>{username}</h4>
                </div>

                <div>
                  <StatisticTile
                    emoji="💚"
                    tileColor="#E1F5E1"
                    label="PeerPoints"
                    number={peerPoints}
                  />
                  <StatisticTile
                    emoji="🔥"
                    tileColor="#FEF2F2"
                    label="Sessions completed"
                    number={userHistory.length}
                  />
                  <StatisticTile
                    emoji="⭐️"
                    tileColor="#FDFAF1"
                    label="Average rating"
                    number={!averageRating ? 0 : averageRating}
                  />
                </div>
                {currentUsername === username && <hr className="m-0" />}
                {currentUsername === username && (
                  <div style={{ display: "grid", gap: "12px" }}>
                    <div className="d-flex justify-content-between">
                      <b>{nextMilestone} Sessions Milestone</b>
                      <p className="m-0">
                        {userHistory.length}/{nextMilestone}
                      </p>
                    </div>
                    <ProgressBar
                      variant="warning"
                      now={(userHistory.length / nextMilestone) * 100}
                    />
                    <p style={{ color: "var(base-500)", fontSize: "14px" }}>
                      Complete {nextMilestone} interview sessions
                    </p>
                  </div>
                )}
              </UserInfoContainer>
            )}
          </Col>
          <Col xs={12} md={8}>
            {userHistory && userHistory.length > 0 ? (
              <UserHistorySection userHistory={userHistory} />
            ) : (
              <SessionHistoryContainer>
                <div className="emoji">⛺️</div>
                <h4 className="mb-5">No recent sessions!</h4>
                {currentUsername === username && (
                  <a href="/">
                    <Button size="small">Do some practice</Button>
                  </a>
                )}
              </SessionHistoryContainer>
            )}
          </Col>
        </Row>
      )}
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

const StatisticTile = ({ emoji, tileColor, number, label }) => {
  return (
    <StyledStatisticTile>
      <div className="emoji-tile" style={{ backgroundColor: tileColor }}>
        {emoji}
      </div>
      <div>
        <h5>{number}</h5>
        <p className="label">{label}</p>
      </div>
    </StyledStatisticTile>
  );
};

const StyledStatisticTile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .emoji-tile {
    width: 44px;
    height: 44px;
    padding: 12px;
    border-radius: 8px;
    margin-right: 16px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h5 {
    margin: 0;
  }

  .label {
    color: var(--base-500);
    font-size: 14px;
    margin: 0;
  }
`;

const UserInfoContainer = styled.div`
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--base-100);

  display: grid;
  gap: 28px;

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
