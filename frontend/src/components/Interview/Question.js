import React, { useState, useEffect } from "react";
import { STATUS_CODE_OK } from "../../utils/constants";
import { QuestionSvcGETRequest } from "../../utils/QuestionService";

const Question = ({ difficulty, question }) => {
  // const [question, setQuestion] = useState();
  // useEffect(() => {
  //   QuestionSvcGETRequest(`/${question_id}`).then((res) => {
  //     if (res.status == STATUS_CODE_OK) {
  //       setQuestion(res.data.data);
  //     }
  //   });
  // }, []);

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
        <DifficultyChip difficulty={difficulty} />
        <div dangerouslySetInnerHTML={{ __html: question.content }} />
      </div>
    )
  );
};

export default Question;

const DifficultyChip = ({ difficulty }) => {
  return (
    <div
      style={{
        padding: "4px 8px",
        borderRadius: "6px",
        textTransform: "capitalize",
        fontSize: "12px",
        color: "white",
        marginTop: "8px",
        marginBottom: "28px",
        width: "min-content",
        backgroundColor: `${
          difficulty === "easy"
            ? "var(--green)"
            : difficulty === "medium"
            ? "var(--yellow)"
            : "var(--red)"
        }`,
      }}
    >
      {difficulty}
    </div>
  );
};
