import React from "react";
import styled from "styled-components";
import ImageSlider, { Slide } from "react-auto-image-slider";
import carousel1 from './../../imgs/carousel1.png'
import carousel2 from './../../imgs/carousel2.png'
import carousel3 from './../../imgs/carousel3.png'
import carousel4 from './../../imgs/carousel4.png'

//carousel
const Carousels = styled.div`
 background-color: #FCF9E9;
 width: 100vw;
 height: 500px;
 overflow: hidden;
`;
const Img = styled.img`
  height: 100vh;
  background-repeat: no-repeat;
  /* object-fit: contain; */
`;
const Carousel = () => {
  return (
    <Carousels>
      {/* 화면 전환효과 딜레이 / 자동 슬라이드 전환 시간 */}
      <ImageSlider effectDelay={400} autoPlayDelay={2000}>
        <Slide>
          <Img alt="img1" src={carousel1} />
        </Slide>
        <Slide>
          <Img alt="img2" src={carousel2} />
        </Slide>
        <Slide>
          <Img alt="img3" src={carousel3} />
        </Slide>
        <Slide>
          <Img alt="img4" src={carousel4} />
        </Slide>
      </ImageSlider>
    </Carousels>
  );
}

export default Carousel;