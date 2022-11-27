import React from "react";
import styled from "styled-components/macro";
import starimg from "../../imgs/star.png";
import { Link, useParams } from "react-router-dom";

const Products = styled(Link)`
  width: 18vw;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 479px) {
    width: 45vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 30vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 23vw;
  }
`;
const Imgbox = styled.div`
  overflow: hidden;
  &:hover img {
    object-fit: cover;
    transform: scale(1.3);
    transition: transform 1s;
  }
  @media screen and (max-width: 479px) {
    width: 35vw;
  }
    @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
    @media (min-width: 768px) and (max-width: 1023px) {
    width: 20vw;
  }
`;
const Img = styled.img`
  width: 13vw;
  display: flex;
  border-radius: 5px;
  @media screen and (max-width: 479px) {
    width: 35vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20vw;
  }
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 13vw;
  margin-top: 10px;
  @media screen and (max-width: 479px) {
    width: 35vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20vw;
  }
`;
const Brand = styled.h5`
  color: var(--font-ligthblack);
  font-size: 0.8rem;
  font-weight: 300;
  @media screen and (max-width: 479px) {
    font-size: 0.8em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1em;
  }
`;
const Title = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1em;
  max-height: 2.2em;
  min-height: 2.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media screen and (max-width: 479px) {
    font-size: 0.8em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1em;
  }
`;
const Price = styled.h5`
  display: flex;
  justify-content: flex-end;
  padding: 5px 0;
  /* margin-right: 10px; */
  font-size: 1.3rem;
  font-weight: 700;
  @media screen and (max-width: 479px) {
    font-size: 1.1em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.2em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.3em;
  }
  .won{
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
`;
const SubDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  &.end{
    justify-content: flex-end;
  }
`;
const StarDetail = styled.div`
  display: flex;
`;
const Star = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  @media screen and (max-width: 479px) {
    width: 10px;
    height: 10px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 10px;
    height: 10px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 13px;
    height: 13px;
  }
`;
const StarAerage = styled.div`
  display: flex;
  @media screen and (max-width: 479px) {
    font-size: 0.8em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9em;
  }
`;
const Product = ({ proId, product }) => {
  const { img, nickname, score, title, price } = product;
  return (
    <Products to={`/detail/${proId}`}>
      <Imgbox>
        <Img src={img?.fullPath}></Img>
      </Imgbox>
      <Detail>
        <SubDetail>
          <Brand>{nickname}</Brand>
          <StarDetail>
            <Star src={starimg}></Star>
            <StarAerage>{score}</StarAerage>
          </StarDetail>
        </SubDetail>
        <Title>{title}</Title>
        <SubDetail className="end">
          <Price>
            <span className="won">
              ₩
            </span>
            &nbsp;{price?.toLocaleString("en-US")}</Price>
        </SubDetail>
      </Detail>
    </Products>
  );
};

export default Product;
