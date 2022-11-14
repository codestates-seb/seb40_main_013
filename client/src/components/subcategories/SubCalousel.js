import React from "react";
import styled from "styled-components/macro";
import ImageSlider, { Slide } from "react-auto-image-slider";
import carousel1 from './../../imgs/carousel1.png'
import carousel2 from './../../imgs/carousel2.png'
import carousel3 from './../../imgs/carousel3.png'
import carousel4 from './../../imgs/carousel4.png'

//carousel
const Carousels = styled.div`
 background-color: #F2F2F2;
 height: 300px;
 overflow: hidden;
`;
const Img = styled.img`
  background-repeat: no-repeat;
  /* object-fit: contain; */
`;
const SubCarousel = () => {
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

export default SubCarousel;