import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Button from "../Button";
import StarIcon from "../../assets/icons/StarIcon.svg";
import { SocketContext } from "../../context/socket";
import { fetchStorage } from "../../utils/LocalStorageService";

const FeedbackForm = ({ partnerSocketId, question }) => {
  console.log("question: ", question);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comments, setComments] = useState("");
  const socket = useContext(SocketContext);
  const currentUsername = fetchStorage("currentUsername");

  var selectionOptions = [
    "Terrible",
    "Not great",
    "Decent",
    "Clear",
    "Very Clear",
  ];

  useEffect(() => {
    console.log("OMG IT'S IN THE FORM PARTNER ", partnerSocketId);
  }, [partnerSocketId]);

  useEffect(() => {
    socket.on("rating received", (rating, comments, senderName) => {
      var session = {
        partnerUsername: senderName,
        questionId: question._id,
        questionDifficultyIndex: question.difficulty_index,
        questionTitle: question.title,
        answerProvided: "TODO",
        ratingReceived: rating,
        commentsReceived: comments,
      };
      console.log(`POSTing Session now: `, session);
    });
  }, [socket]);

  var onSubmit = () => {
    socket.emit(
      "partner rating",
      selectedRating,
      comments,
      partnerSocketId,
      currentUsername
    );
    // window.location.href = "/home";
  };

  return (
    <CardPageWrap>
      <Header>Session has ended!</Header>
      <CardWrap>
        <div
          style={{ width: "650px" }}
          className="d-flex flex-column align-items-center"
        >
          <div>
            <div style={{ width: "100%", marginBottom: "48px" }}>
              <h4>Rate your partner</h4>
              <p style={{ color: "var(--base-500)" }}>
                How correct and clear do you feel your partner was?
              </p>
              <div
                className="d-flex"
                style={{ marginLeft: "-8px", marginRight: "-8px" }}
              >
                {selectionOptions.map((option, index) => (
                  <SelectionTile
                    onClick={() => setSelectedRating(index + 1)}
                    isSelected={selectedRating === index + 1}
                    label={option}
                    key={index}
                    numStars={index + 1}
                  />
                ))}
              </div>
            </div>
            <div>
              <h4>Additional comments</h4>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                style={{ width: "100%", marginTop: "8px" }}
                placeholder="What did your partner do well? What could they improve on?"
                rows={4}
              />
            </div>
          </div>

          <Button
            disabled={!selectedRating}
            size="medium"
            style={{ marginTop: "60px", width: "60%" }}
            onClick={onSubmit}
          >
            Submit Rating
          </Button>
        </div>
      </CardWrap>
    </CardPageWrap>
  );
};

export default FeedbackForm;

var SelectionTile = ({ label, isSelected, numStars, onClick }) => {
  return (
    <StyledSelectionTile isSelected={isSelected} onClick={onClick}>
      <div className="stars-wrap">
        {[...Array(numStars)].map((value, index) => (
          <img src={StarIcon} alt="" key={index} />
        ))}
      </div>
      <span>{label}</span>
    </StyledSelectionTile>
  );
};

const StyledSelectionTile = styled.div`
  border-radius: 15px;
  padding: 20px;
  margin: 0 8px;
  background-color: var(--base-50);
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: center;
  transition: 200ms ease-out;
  box-shadow: none;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;

  span {
    font-size: 14px;
    font-weight: 500;
    margin-top: 12px;
  }

  :hover {
    ${({ isSelected }) =>
      !isSelected &&
      `background-color: var(--base-100);
  `}
  }

  .stars-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 40px;
  }

  ${({ isSelected }) =>
    isSelected &&
    `background-color: var(--accent-a10);
    box-shadow: inset 0px 0px 0px 2px var(--accent);
    color: var(--accent);
  `}
`;

const CardPageWrap = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 64px;
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
  padding: 40px 0;
  align-items: center;

  h4 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  @media (min-width: 640px) {
    padding: 32px 0;
  }

  @media (min-width: 832px) {
    padding: 64px 48px;
  }
`;
