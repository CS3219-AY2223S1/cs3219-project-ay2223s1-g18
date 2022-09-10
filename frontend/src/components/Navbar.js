import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import logo from "../assets/Logo.svg";
import { clearStorage, fetchStorage } from "../utils/storage";
import Avatar from "react-string-avatar";
import { ReactComponent as ChevronDownIcon } from "../assets/chevron-down.svg";
import userIcon from "../assets/user-icon.svg";
import settingsIcon from "../assets/settings-icon.svg";
import logoutIcon from "../assets/logout-icon.svg";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = ({ layout }) => {
  const currentUsername = fetchStorage("currentUsername");

  return (
    <>
      {layout === "protected" && currentUsername && (
        <ProtectedLayoutNav currentUsername={currentUsername} />
      )}

      {layout === "public" && <PublicLayoutNav />}
      {layout === "interviewRoom" && <InterviewRoomNav />}
    </>
  );
};

export default Navbar;

var InterviewRoomNav = () => {
  return (
    <StyledNav>
      <Link to="/home">
        <Button variant="secondary" size="small">
          Leave Room
        </Button>
      </Link>
      <h3 className="m-0">Practice</h3>
      <Button variant="secondary" size="small">
        Next Question
      </Button>
    </StyledNav>
  );
};

var ProtectedLayoutNav = ({ currentUsername }) => {
  const navigate = useNavigate();
  var handleLogout = () => {
    clearStorage("currentUsername");
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    navigate("/");
  };

  return (
    <StyledNav>
      <a href="/">
        <img src={logo} alt="logo" />
      </a>

      <Dropdown>
        <Dropdown.Toggle className="remove-styling">
          <div className="userInfo">
            <Avatar
              initials={currentUsername.charAt(0).toUpperCase()}
              roundShape
              bgColor="#EEF2FF"
              textColor="#4F46E5"
              width={36}
              pictureResolution={512}
              fontWeight={500}
            />
            <p className="m-0 mx-2">{currentUsername}</p>
            <ChevronDownIcon />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu" style={{ marginTop: "16px" }}>
          <Dropdown.Item eventKey="1">
            <div className="d-flex align-items-center">
              <Avatar
                initials={currentUsername.charAt(0).toUpperCase()}
                roundShape
                bgColor="#EEF2FF"
                textColor="#4F46E5"
                width={36}
                pictureResolution={512}
                fontWeight={500}
              />
              <div className="d-flex flex-column">
                <p className="m-0">{currentUsername}</p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--base-400)",
                    marginBottom: 0,
                  }}
                >
                  View profile
                </p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider
            style={{ borderTop: "1px solid var(--base-100)" }}
          />
          <Dropdown.Item eventKey="2">
            <img src={userIcon} alt="" />
            Profile
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" href="/settings">
            <img src={settingsIcon} alt="" />
            Settings
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={() => handleLogout()}>
            <img src={logoutIcon} alt="" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </StyledNav>
  );
};

var PublicLayoutNav = () => {
  return (
    <StyledNav>
      <a href="/">
        <img src={logo} alt="logo" />
      </a>

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
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  width: 100%;
  height: 64px;
  margin-left: auto;
  margin-right: auto;
  padding: 8px 32px;
  border-bottom: 1px solid var(--base-100);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 640px) {
    padding-top: 12px;
  }

  .userInfo {
    display: flex;
    align-items: center;
    color: var(--base-400);
    font-weight: 500;
    transition: 200ms ease-out;
    cursor: pointer;

    svg path {
      stroke: var(--base-400);
    }
  }

  .userInfo:hover {
    color: var(--base-700);

    svg path {
      stroke: var(--base-700);
    }
  }

  .remove-styling {
    padding: 0;
    border: none;
    box-shadow: none;
    background-color: transparent;

    ::after {
      display: none;
    }
  }

  .dropdown-menu {
    border: 1px solid var(--base-100);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
    border-radius: 16px;
  }

  .dropdown-item {
    color: var(--base-600) !important;
    font-weight: 400;
    padding: 12px 24px;
    width: 240px;
    display: flex;
    align-items: center;

    img {
      margin-right: 18px;
    }
  }
`;
