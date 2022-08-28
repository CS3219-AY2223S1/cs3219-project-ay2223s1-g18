import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return <StyledNav>Navbar</StyledNav>;
};

export default Navbar;

const StyledNav = styled.nav`
  width: 100%;
  min-height: 40px;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding: 12px 32px;
  border-bottom: 1px solid #f3f4f6;

  @media (min-width: 640px) {
    padding-top: 16px;
  }
`;
