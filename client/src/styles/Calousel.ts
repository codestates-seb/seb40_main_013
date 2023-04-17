import styled from "styled-components/macro";

export const Container = styled.div`
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
  @media (min-width: 768px) and (max-width: 1023px) {
    height: 27vh;
  }
`;
export const Prev = styled.span`
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
export const Next = styled.span`
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
export const Slides = styled.div`
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
export const Imgbox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
`;
export const Img = styled.img`
  width: 150%;
  height: 150%;
  top: -50px;
  position: absolute;
  cursor: pointer;
  /* object-fit: cover; */
  animation: slideIn 7s linear forwards;
  @keyframes slideIn {
    from {
      top: -50%;
    }
    to {
      bottom: 50%;
    }
  }
`;
export const SlideTitle = styled.h2`
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
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 6.5vh;
  }
`;
export const SlideText = styled.h3`
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
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.4rem;
  }
`;
