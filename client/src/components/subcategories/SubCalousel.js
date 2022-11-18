import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import ImgSlider from "../mains/ImgSlider";

const len = ImgSlider.length - 1;

const SubCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  return(
    <Container>
      {
        ImgSlider.map((slide, index)=>(
          <Slides
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}>
            <Img className="slide-image" src={slide.urls} alt="" />
            {/* <SlideTitle className="slide-title">{slide.title}</SlideTitle> */}
            {/* <SlideText className="slide-text">{slide.description}</SlideText> */}
          </Slides>
        ))
      }
      <Arrows className="arrows">
        <Prev className="prev" onClick={()=> setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)}>&#10094;</Prev>
        <Next className="next" onClick={()=> setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)}>&#10095;</Next>
      </Arrows>
      {/* <AllDots className="all-dots">
        {ImgSlider.map((slide, index)=> (
          <Dot key={index}
          className={`${activeIndex === index ? "dot active-dot" : "dot"}`}
          onClick={(activeIndex)=> setActiveIndex(activeIndex)}
          />
        ))}
      </AllDots> */}
    </Container>
    )
  }
const Container = styled.div`
  height: 28vh;
  width: 100%;
  position: relative;
  margin: auto;
  overflow: hidden;
  flex-direction: column;
`;
const Arrows = styled.div`
`;
const Prev = styled.span`
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 1rem;
  margin-top: -3rem;
  margin-left: 10px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 0 5px 5px 0;
  &:hover{
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.5s ease-in-out;
  }
`;
const Next = styled.span`
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0;
  width: auto;
  padding: 1rem;
  margin-top: -3rem;
  margin-right: 10px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 5px 0 0 5px;
  &:hover{
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.5s ease-in-out;
  }
`;
// const AllDots = styled.div`
//   width: 100%;
//   /* height: 100%; */
//   display: flex;
//   top: 85%;
//   justify-content: center;
//   z-index: 200;
// `;
// const Dot = styled.span`
//   cursor: pointer;
//   height: 1rem;
//   width: 1rem;
//   margin: 0 3px;
//   background-color: rgba(0, 0, 0, 0.3);
//   border-radius: 50%;
//   display: inline-block;
//   &:hover{
//     background-color: rgba(255, 255, 255, 0.5);
//   }
//   &.active-dot{
//     background-color: rgba(255, 255, 255, 0.5);
//   }
// `;
const Slides = styled.div`
  &.active{
    display: inline-block;
  }
  &.inactive{
    display: none;
  }
  &.slides{
    height: 50vh;
    width: 100%;
    position: relative;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
`;

export default SubCarousel;