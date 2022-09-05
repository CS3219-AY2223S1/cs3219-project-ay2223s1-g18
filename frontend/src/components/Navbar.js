import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import logo from "../assets/Logo.svg";
import { fetchStorage } from "../storage";

const Navbar = ({ layout }) => {
  const currentUsername = fetchStorage("currentUsername");

  return (
    <StyledNav>
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      {layout === "protected" && currentUsername && (
        <p className="m-0">{currentUsername}</p>
      )}

      {layout === "public" && (
        <div className="d-flex">
          <Link to="/login">
            <Button
              variant="secondary"
              size="small"
              style={{ marginRight: "8px" }}
            >
              Log in
            </Button>
          </Link>

          <Link to="/signup">
            <Button variant="primary" size="small">
              Sign up
            </Button>
          </Link>
        </div>
      )}
    </StyledNav>
  );
};

export default Navbar;

const StyledNav = styled.nav`
  width: 100%;
  height: 64px;
  margin-left: auto;
  margin-right: auto;
  padding: 8px 32px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 640px) {
    padding-top: 12px;
  }
`;
