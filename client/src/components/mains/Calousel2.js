import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import ImgSlider from "./ImgSlider";
import { Link } from "react-router-dom";

const len = ImgSlider.length - 1;

const Carousel2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <Container>
      {ImgSlider.map((slide, index) => (
        <Slides
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
          <Img className="slide-image" src={slide.urls} alt="" />
          <SlideTitle>{slide.title}</SlideTitle>
          <SlideText>{slide.description}</SlideText>
          {/* <FurnitureContainer>
            <SlideFurniture>{slide.furniture}</SlideFurniture>
          </FurnitureContainer> */}
        </Slides>
      ))}
      <Arrows className="arrows">
        <Prev
          className="prev"
          onClick={() =>
            setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
          }
        >
          &#10094;
        </Prev>
        <Next
          className="next"
          onClick={() =>
            setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
          }
        >
          &#10095;
        </Next>
      </Arrows>
      <AllDots className="all-dots">
        {ImgSlider.map((slide, index) => (
          <Dot
            key={index}
            className={`${activeIndex === index ? "dot active-dot" : "dot"}`}
            onClick={(activeIndex) => setActiveIndex(activeIndex)}
          />
        ))}
      </AllDots>
    </Container>
  );
};
const Container = styled.div`
  height: 28vh;
  width: 94%;
  position: relative;
  margin-top: 10px;
  overflow: hidden;
  @media screen and (max-width: 479px) {
    height: 22vh;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    height: 24vh;
  }
  @media (min-width:768px) and (max-width: 1023px){
    height: 27vh;
  }
`;
const Arrows = styled.div``;
const Prev = styled.span`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 1rem;
  margin-top: -2rem;
  margin-left: 10px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 0 5px 5px 0;
  color: #272727;
  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.5s ease-in-out;
  }
  @media screen and (max-width: 479px) {
    font-size: 1.5rem;
  }
`;
const Next = styled.span`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0;
  width: auto;
  padding: 1rem;
  margin-top: -2rem;
  margin-right: 10px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 5px 0 0 5px;
  color: #272727;
  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.5s ease-in-out;
  }
  @media screen and (max-width: 479px) {
    font-size: 1.5rem;
  }
`;
const AllDots = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;
  top: 10%;
  justify-content: center;
  z-index: 1;
`;
const Dot = styled.span`
  cursor: pointer;
  height: 1rem;
  width: 1rem;
  margin: 0 3px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: inline-block;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  &.active-dot {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
const Slides = styled.div`
  &.active {
    display: inline-block;
  }
  &.inactive {
    display: none;
  }
  &.slides {
    height: 28vh;
    width: 100%;
    position: relative;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  /* object-fit: cover; */
`;
const SlideTitle = styled.h2`
  color: white;
  font-size: 7vh;
  font-weight: 600;
  color: #525252;
  position: absolute;
  top: 25%;
  left: 17%;
  z-index: 10;
  animation: fadeInLeft 4s;
  @keyframes fadeInLeft {
      0% {
          opacity: 0;
          transform: translate3d(-10%, 0, 0);
      }
      to {
          opacity: 1;
          transform: translateZ(0);
      }
  }
  @media screen and (max-width: 479px) {
    font-size: 4.5vh;
    top: 32%;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 6.1vh;
    top: 28%;
  }
  @media (min-width:768px) and (max-width: 1023px){
    font-size: 6.5vh;
  }
`;
const SlideText = styled.h3`
  color: #525252;
  font-size: 1.6rem;
  position: absolute;
  top: 50%;
  left: 17.2%;
  font-weight: 500;
  z-index: 10;
  animation: fadeInUp 3s;
  @keyframes fadeInUp {
      0% {
          opacity: 0;
          transform: translate3d(0, 10%, 0);
      }
      to {
          opacity: 1;
          transform: translateZ(0);
      }
  }
  @media screen and (max-width: 479px) {
    font-size: 1rem;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.2rem;
  }
  @media (min-width:768px) and (max-width: 1023px){
    font-size: 1.4rem;
  }
`;
const FurnitureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SlideFurniture = styled.h3`
  position: absolute;
  display: flex;
  /* width: 100%;
  height: 100%; */
  top: 64%;
  left: 17%;
  color: white;
  font-size: 1.4rem;
  background-color: #FFAF51;
  border-radius: 5px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export default Carousel2;
