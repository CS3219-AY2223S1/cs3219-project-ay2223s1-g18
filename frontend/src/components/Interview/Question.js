import React from "react";
import DifficultyChip from "../DifficultyChip";
import PropTypes from "prop-types";

const Question = ({ difficulty, question }) => {
  return (
    question && (
      <div
        style={{
          height: "90vh",
          overflowY: "scroll",
          width: "100%",
          padding: "16px 0",
        }}
      >
        <h4>
          <b>{question.title}</b>
        </h4>
        <div style={{ marginTop: "8px", marginBottom: "28px" }}>
          <DifficultyChip difficulty={difficulty} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: question.content }} />
      </div>
    )
  );
};

Question.propTypes = {
  difficulty: PropTypes.string,
  question: PropTypes.object,
};

export default Question;
