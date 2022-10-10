import React from "react";
import styled from "styled-components";

const DifficultyChip = ({ difficulty }) => {
  return (
    <StyledChip
      style={{
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
    </StyledChip>
  );
};

export default DifficultyChip;

const StyledChip = styled.div`
  color: white !important;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: capitalize;
  font-size: 12px;
  width: min-content;
`;
