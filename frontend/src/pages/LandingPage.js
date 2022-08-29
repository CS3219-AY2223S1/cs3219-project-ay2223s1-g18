import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import heroImage from "../assets/heroImage.png";
import Button from "../components/Button";

const HeroPoints = [
  {
    title: "Match with people",
    description:
      "Instantly meet others that are of a similar skill level as you are.",
  },
  {
    title: "Start coding",
    description: "Collaborate and discuss problems in real time.",
  },
  {
    title: "Solve problems",
    description: "Solve questions together and get achievements!",
  },
];

const LandingPage = () => {
  return (
    <StyledHeroSection>
      <div className="hero-container px-5 mx-auto">
        <Row>
          <Col xs={12} md={8}>
            <h1>Nail your next technical interview</h1>
            <Row>
              {HeroPoints.map(({ title, description }) => {
                return (
                  <Col xs={12} sm={4} key={title}>
                    <PointBlock title={title} description={description} />
                  </Col>
                );
              })}
            </Row>

            <Link to="/signup">
              <Button
                variant="primary"
                size="big"
                style={{ marginTop: "48px" }}
              >
                Get Started for Free
              </Button>
            </Link>
          </Col>
          <Col xs={12} md={4}>
            <div className="image-wrap">
              <img src={heroImage} alt="hero" />
            </div>
          </Col>
        </Row>
      </div>
    </StyledHeroSection>
  );
};

export default LandingPage;

const PointBlock = ({ title, description }) => {
  return (
    <StyledPointBlock className="my-3 my-sm-0">
      <h2>{title}</h2>
      <p>{description}</p>
    </StyledPointBlock>
  );
};

const StyledPointBlock = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: var(--text-lg);
    font-weight: 600;
    margin-bottom: 12px;
  }

  p {
    color: var(--base-600);
    line-height: 150%;
  }
`;

const StyledHeroSection = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 96px;
  padding-bottom: 96px;

  .col-md-8 {
    min-height: 464px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
  .col-md-4 {
    min-height: 464px;
    display: flex;
    align-items: center;
  }

  h1 {
    font-size: 64px;
    font-weight: 600;
    margin-bottom: 40px;

    @media (max-width: 576px) {
      font-size: var(--text-2xl);
    }
  }

  .hero-container {
    z-index: 9998;
    width: 100%;
    max-width: 1256px;
  }

  .image-wrap {
    position: absolute;
    overflow: hidden;
    width: 1022px;
    height: 440px;

    @media (max-width: 767px) {
      position: static;
      width: auto;
      height: auto;
      margin-top: 32px;
    }
  }

  img {
    position: absolute;
    left: 48px;
    top: 0;
    right: 0;
    bottom: 0;
    display: block;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;

    @media (max-width: 767px) {
      position: static;
      width: 100%;
    }
  }
`;
