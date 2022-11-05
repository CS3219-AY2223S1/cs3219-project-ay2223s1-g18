import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Button from "../Button";
import StarIcon from "../../assets/icons/StarIcon.svg";
import { SocketContext } from "../../context/socket";
import { fetchStorage } from "../../utils/LocalStorageService";
import { POSTRequest } from "../../utils/axios";
import { STATUS_CODE_OK } from "../../utils/constants";
import PropTypes from "prop-types";

const FeedbackForm = ({ partnerSocketId, question }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [hasReceivedFeedback, setHasReceivedFeedback] = useState(false);
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
    socket.on("user disconnected", () => {
      setTimeout(() => {
        if (!hasReceivedFeedback) {
          window.location.href = "/error";
        }
      }, 2000);
    });
    socket.on("rating received", (rating, comments, senderName) => {
      var session = {
        username: currentUsername,
        partner_username: senderName,
        question_id: question.question_id,
        question_difficulty_index: question.difficulty_index,
        question_title: question.title,
        answer_provided: "TODO",
        rating_received: rating,
        comments_received: comments,
        datetime: Date.now(),
      };
      POSTRequest("USER-HISTORY", ``, session)
        .then((res) => {
          if (res.status === STATUS_CODE_OK) {
            setHasReceivedFeedback(true);
          }
        })
        .catch((err) => {
          console.error(err);
          window.location.href = "/error";
        });
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
    setHasSubmittedFeedback(true);
  };

  useEffect(() => {
    if (hasReceivedFeedback && hasSubmittedFeedback) {
      window.location.href = "/home";
    }
  }, [hasReceivedFeedback, hasSubmittedFeedback]);

  return (
    <CardPageWrap>
      <Header>Session has ended!</Header>
      {!hasSubmittedFeedback && (
        <CardWrap>
          <div
            style={{ maxWidth: "650px", width: "100%" }}
            className="d-flex flex-column align-items-center"
          >
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%", marginBottom: "48px" }}>
                <h4>Rate your partner</h4>
                <p style={{ color: "var(--base-500)" }}>
                  How correct and clear do you feel your partner was?
                </p>
                <div
                  className="d-flex selection-tiles-wrap"
                  // style={{ marginLeft: "-8px", marginRight: "-8px" }}
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
      )}

      {hasSubmittedFeedback && (
        <div className="mt-5">
          Feedback submitted! Waiting for your partner to submit your
          feedback...
        </div>
      )}
    </CardPageWrap>
  );
};

export default FeedbackForm;

FeedbackForm.propTypes = {
  partnerSocketId: PropTypes.node,
  question: PropTypes.node,
};

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

SelectionTile.propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  numStars: PropTypes.number,
  onClick: PropTypes.func,
};

const StyledSelectionTile = styled.div`
  border-radius: 15px;
  padding: 20px;
  margin: 0 4px;
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

  @media (max-width: 569px) {
    padding: 8px 20px;
    width: 100%;
    margin: 4px;
    flex-direction: row;
  }

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

  @media (max-width: 640px) {
    padding: 0 16px;
  }
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

  .selection-tiles-wrap {
    flex-direction: row;
  }

  @media (min-width: 640px) {
    padding: 32px 0;
  }

  @media (max-width: 569px) {
    .selection-tiles-wrap {
      flex-direction: column;
    }
  }

  @media (min-width: 832px) {
    padding: 64px 48px;
  }
`;
