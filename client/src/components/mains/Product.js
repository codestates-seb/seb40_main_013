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
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0 0 11px #aaaaaa;
  }
  @media screen and (max-width: 390px) {
    width: 150px;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    width: 18vw;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 20vw;
  }
`;
const Img = styled.img`
  width: 13vw;
  display: flex;
  border-radius: 5px;
  @media (min-width: 391px) and (max-width: 767px) {
    width: 15vw;
  }
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 13vw;
  margin-top: 10px;
  @media screen and (max-width: 390px) {
    width: 150px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 17vw;
    padding: 0 10px;
  }
`;
const Brand = styled.h5`
  color: var(--font-ligthblack);
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.3vw;
  }
`;
const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  /* height: 3vh; //수정필요... */
  word-break: break-all;
  height: 30px;
  @media screen and (max-width: 390px) {
    font-size: 1.6vw;
    font-weight: 400;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    font-size: 1.8vw;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.6vw;
  }
`;
const Price = styled.h5`
  display: flex;
  justify-content: flex-end;
  padding: 5px 0;
  margin-right: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  @media screen and (max-width: 390px) {
    font-size: 1.3rem;
    font-weight: 500;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    font-size: 1.8vw;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.7vw;
  }
`;
const SubDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;
const StarDetail = styled.div`
  display: flex;
`;
const Star = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;
const StarAerage = styled.div`
  display: flex;
`;
const Product = ({ proId, product }) => {
  const { img, nickname, score, title, price } = product;
  return (
    <Products to={`/detail/${proId}`}>
      <Img src={img?.fullPath}></Img>
      <Detail>
        <SubDetail>
          <Brand>{nickname}</Brand>
          <StarDetail>
            <Star src={starimg}></Star>
            <StarAerage>{score}</StarAerage>
          </StarDetail>
        </SubDetail>
        <Title>{title.length > 22 ? title.slice(0, 19) : title}</Title>
        <SubDetail>
          <Price>{price?.toLocaleString("en-US")}</Price>
        </SubDetail>
      </Detail>
    </Products>
  );
};

export default Product;
