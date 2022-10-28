import React from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  size = "medium",
  loading = false,
  ...props
}) => {
  return (
    <StyledButton
      className={`${disabled || loading ? "disabled" : ""} ${variant} ${size}`}
      onClick={disabled || loading ? () => {} : onClick}
      {...props}
    >
      {loading ? <Spinner animation="border" variant="light" /> : children}
    </StyledButton>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

const StyledButton = styled.button`
  transition: 200ms ease-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: none;
  cursor: pointer;

  &.disabled {
    cursor: default;
    opacity: 0.4;
    pointer-events: none !important;
  }

  &.small {
    padding: 12px;
    height: 44px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
  }
  &.medium {
    padding: 16px;
    height: 56px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
  }
  &.big {
    padding: 20px 24px;
    height: 60px;
    border-radius: 16px;
    font-size: 20px;
    font-weight: 800;
  }

  &.primary {
    color: #fff;
    background-color: var(--accent);
  }
  &.primary:hover {
    background-color: var(--base-900);
  }

  &.secondary {
    color: var(--base-800);
    background-color: var(--base-100);
  }
  &.secondary:hover {
    background-color: var(--base-300);
  }

  &.destructive {
    color: #fff;
    background-color: var(--red);
  }
  &.destructive:hover {
    background-color: #b91c1c;
  }
`;

export default Button;
