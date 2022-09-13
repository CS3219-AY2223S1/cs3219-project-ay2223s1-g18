import React from "react";
import styled from "styled-components";

const StyledDp = styled.div`
  width: 36px;
  height: 36px;
  background-color: #eef2ff;
  color: #4f46e5;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

export default function PlaceholderDp({ initial }) {
  return <StyledDp>{initial.charAt(0).toUpperCase()}</StyledDp>;
}
