import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import logo from "../assets/Logo.svg";
import { fetchStorage } from "../utils/LocalStorageService";
import { ReactComponent as ChevronDownIcon } from "../assets/icons/ChevronDownIcon.svg";
import UserIcon from "../assets/icons/UserIcon.svg";
import SettingsIcon from "../assets/icons/SettingsIcon.svg";
import LogoutIcon from "../assets/icons/LogoutIcon.svg";
import Dropdown from "react-bootstrap/Dropdown";
import PlaceholderDp from "./PlaceholderDp";
import PropTypes from "prop-types";
import useLogOut from "../utils/useLogOut";

const Navbar = ({ layout }) => {
  const currentUsername = fetchStorage("currentUsername");
  const { logoutUser } = useLogOut();
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <>
      {layout === "protected" && currentUsername && (
        <ProtectedLayoutNav
          currentUsername={currentUsername}
          logoutFunction={handleLogout}
        />
      )}

      {layout === "public" && <PublicLayoutNav />}
    </>
  );
};

export default Navbar;

const ProtectedLayoutNav = ({ currentUsername, logoutFunction }) => {
  return (
    <StyledNav>
      <a href="/">
        <img src={logo} alt="logo" />
      </a>

      <Dropdown>
        <Dropdown.Toggle className="remove-styling">
          <div className="userInfo">
            <PlaceholderDp initial={currentUsername} />
            <p className="m-0 mx-2">{currentUsername}</p>
            <ChevronDownIcon />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu" style={{ marginTop: "16px" }}>
          <Dropdown.Item eventKey="1" href={"/profile/" + currentUsername}>
            <div className="d-flex align-items-center">
              <PlaceholderDp initial={currentUsername} />
              <div className="d-flex flex-column px-2">
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
          <Dropdown.Item eventKey="2" href={"/profile/" + currentUsername}>
            <img src={UserIcon} alt="" />
            Profile
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" href="/settings">
            <img src={SettingsIcon} alt="" />
            Settings
          </Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={() => logoutFunction()}>
            <img src={LogoutIcon} alt="" />
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

Navbar.propTypes = {
  layout: PropTypes.string.isRequired,
};

ProtectedLayoutNav.propTypes = {
  currentUsername: PropTypes.string.isRequired,
  logoutFunction: PropTypes.func,
};

const StyledNav = styled.nav`
  width: 100%;
  height: 64px;
  margin-left: auto;
  margin-right: auto;
  padding: 8px 16px;

  border-bottom: 1px solid var(--base-100);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 640px) {
    padding-top: 12px;
    padding: 8px 32px;
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

  .remove-styling:active {
    color: transparent;
    background-color: transparent;
    border-color: transparent;
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

  .dropdown-item:active {
    background-color: var(--base-300);
  }
`;
