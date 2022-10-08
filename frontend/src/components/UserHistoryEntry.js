import React from "react";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import DifficultyChip from "./DifficultyChip";
import CalendarIcon from "../assets/icons/CalendarIcon.svg";
import QuestionIcon from "../assets/icons/QuestionIcon.svg";

const UserHistoryEntry = () => {
  var session = {
    _id: "63407ee213a7b3edb49d4d06",
    username: "hello",
    partnerUsername: "byebye",
    questionId: 1763,
    questionDifficultyIndex: 1,
    questionTitle: "Longest Nice Substring",
    answerProvided: "TODO",
    ratingReceived: 5,
    commentsReceived: "testing testing 123",
    datetime: "2022-10-07T19:32:50.115Z",
    __v: 0,
  };

  var difficultyMapping = ["easy", "medium", "hard"];

  return (
    <StyledAccordionItem>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <StyledAccordionHeader>
            <DifficultyChip
              difficulty={
                difficultyMapping[session.questionDifficultyIndex - 1]
              }
            />
            <p className="mt-2 mb-3">
              Practice with{" "}
              <span className="partner-name">{session.partnerUsername}</span>
            </p>
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <img src={CalendarIcon} alt="" />
                <span className="mx-2">
                  {new Date(session.datetime).toDateString()}
                </span>
              </div>
              <div className="d-flex align-items-center mx-3">
                <img src={QuestionIcon} alt="" />
                <span className="mx-2">{session.questionTitle}</span>
              </div>
            </div>
          </StyledAccordionHeader>
        </Accordion.Header>
        <Accordion.Body>
          <StyledAccordionBody>
            <hr style={{ margin: 0 }} />
            <div>
              <p className="label">Question</p>
              <p className="bold">{session.questionTitle}</p>
            </div>
            <div>
              <p className="label">Rating Received:</p>
              <p className="bold">{session.ratingReceived}</p>
            </div>
            <div>
              <p className="label">Comments Received:</p>
              <p>{session.commentsReceived}</p>
            </div>
          </StyledAccordionBody>
        </Accordion.Body>
      </Accordion.Item>
    </StyledAccordionItem>
  );
};

export default UserHistoryEntry;

const StyledAccordionItem = styled.div`
  .accordion-item {
    border-radius: 16px !important;
    border: 1px solid var(--base-100) !important;
    color: var(--base-900);
  }

  .accordion-button {
    background-color: transparent !important;
  }

  .accordion-button:focus {
    border: none !important;
    box-shadow: none !important;
  }

  .accordion-button :not(.collapsed) {
    color: var(--base-900);
  }

  p {
    margin: 0;
  }

  .bold {
    font-weight: 600;
  }
`;

const StyledAccordionHeader = styled.div`
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  .partner-name {
    font-weight: 700;
    color: var(--accent) !important;
  }
`;

const StyledAccordionBody = styled.div`
  display: grid;
  gap: 20px;

  .label {
    font-size: 14px;
    color: var(--base-400);
  }
`;
