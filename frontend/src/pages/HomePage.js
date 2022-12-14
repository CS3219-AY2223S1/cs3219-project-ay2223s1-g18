import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { ReactComponent as ArrowSvg } from "../assets/icons/arrow.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CountdownPage from "./CountdownPage";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socket";
import { fetchStorage } from "../utils/LocalStorageService";
import { GETRequest } from "../utils/axios";
import { STATUS_CODE_OK } from "../utils/constants";
import PropTypes from "prop-types";

const HomePage = () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [peerType, setPeerType] = useState("");
  const currentUsername = fetchStorage("currentUsername");

  const handleDifficultySelection = (difficulty) => {
    setIsLoading(true);
    GETRequest("QUESTION", "", { difficulty: difficulty }).then((res) => {
      if (res.status === STATUS_CODE_OK) {
        socket.emit(
          "match request",
          currentUsername,
          difficulty,
          res.data.question.question_id,
          socket.id
        );
      }
    });
  };

  useEffect(() => {
    socket.on("initiate match", () => {
      setPeerType(0);
    });

    socket.on("match found", () => {
      setPeerType(1);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("successfulMatch", (difficulty, questionId, socketId) => {
      navigate(
        `/interview/${difficulty}&${peerType}&${socketId}&${questionId}`
      );
    });
  }, [peerType]);

  return isLoading ? (
    <CountdownPage />
  ) : (
    <StyledWrapper>
      <div
        style={{ textAlign: "center", marginBottom: "32px", marginTop: "32px" }}
      >
        <h1>Practice</h1>
        <p style={{ color: "var(--base-500)" }}>
          Select a difficulty, find a partner and start solving!
        </p>
      </div>

      <Container style={{ maxWidth: "1200px", padding: "0 32px" }}>
        <Row>
          <Col xs={12} md={4} onClick={() => handleDifficultySelection("easy")}>
            <DifficultyCard difficulty={0} />
          </Col>
          <Col
            xs={12}
            md={4}
            onClick={() => handleDifficultySelection("medium")}
          >
            <DifficultyCard difficulty={1} />
          </Col>
          <Col xs={12} md={4} onClick={() => handleDifficultySelection("hard")}>
            <DifficultyCard difficulty={2} />
          </Col>
        </Row>
      </Container>
    </StyledWrapper>
  );
};

export default HomePage;

const EasyExamples = ["Two Sum", "Palindrome Number", "Merge Sorted Array"];
const MediumExamples = [
  "Reverse Integer",
  "Multiply Strings",
  "Binary Tree Upside Down",
];
const HardExamples = [
  "Travelling Salesman 2D",
  "Merge k-Sorted Lists",
  "N-Queens",
];

const DifficultyInfo = [
  {
    text: "Easy",
    emoji: "????",
    examplesArr: EasyExamples,
    bg: "#f0fdf4",
    textColor: "var(--green)",
  },
  {
    text: "Medium",
    emoji: "????",
    examplesArr: MediumExamples,
    bg: "#FFFBEB",
    textColor: "#D97706",
  },
  {
    text: "Hard",
    emoji: "????",
    examplesArr: HardExamples,
    bg: "#FFF1F2",
    textColor: "#e11d48",
  },
];

const DifficultyCard = ({ difficulty }) => {
  return (
    <a>
      <StyledDifficultyCard
        difficulty={difficulty}
        style={{ backgroundColor: `${DifficultyInfo[difficulty].bg}` }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "28px",
          }}
        >
          <h2 style={{ color: `${DifficultyInfo[difficulty].textColor}` }}>
            {DifficultyInfo[difficulty].text}
          </h2>
          <h2>{DifficultyInfo[difficulty].emoji}</h2>
        </div>
        <div style={{ marginBottom: "36px" }}>
          {DifficultyInfo[difficulty].examplesArr.map((example) => {
            return <p key={example}>{example}</p>;
          })}
          <p>...and more!</p>
        </div>
        <p>
          <span
            style={{
              marginRight: "20px",
              color: `${DifficultyInfo[difficulty].textColor}`,
            }}
          >
            Join waiting room
          </span>
          <ArrowSvg />
        </p>
      </StyledDifficultyCard>
    </a>
  );
};

DifficultyCard.propTypes = {
  difficulty: PropTypes.number,
};

const StyledDifficultyCard = styled.div`
  padding: 48px;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: none;
  margin: 16px 0;
  transition: 300ms ease-out;

  :hover {
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.05),
      0px 12px 40px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  svg path {
    ${({ difficulty }) =>
      (difficulty === 0 &&
        `fill: var(--green);
    stroke: var(--green);
  `) ||
      (difficulty === 1 &&
        `fill: #D97706;
    stroke: #D97706;
  `) ||
      (difficulty === 2 &&
        `fill: #e11d48;
    stroke: #e11d48;
  `)}
  }

  h2 {
    font-size: 40px;
    font-weight: 800;
  }

  p {
    color: var(--base-700);
    font-size: 18px;
  }

  @media (max-width: 1100px) {
    padding: 32px;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 68px);

  h1 {
    font-size: 48px;
    font-weight: 800;
  }
`;
