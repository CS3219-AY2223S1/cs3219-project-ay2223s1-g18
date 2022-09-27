import React from "react";
import styled from "styled-components";

const StyledDp = styled.div`
  background-color: #eef2ff;
  color: #4f46e5;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

export default function PlaceholderDp({ initial, size = 36 }) {
  return (
    <StyledDp
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2.25}px`,
      }}
    >
      {initial.charAt(0).toUpperCase()}
    </StyledDp>
  );
}
