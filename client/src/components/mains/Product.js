import React from "react";
import styled from "styled-components/macro";
import starimg from "../../imgs/star.png";
import { Link, useParams } from "react-router-dom";

const Products = styled(Link)`
  width: 18vw;
  margin: 0 10px;
  @media screen and (max-width: 390px){
    width: 150px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 17vw;
  }
`;
const Img = styled.img`
  width: 100%;
  display: flex;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 18vw;
  margin-top: 10px;
  @media screen and (max-width: 390px){
    width: 150px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 17vw;
  }
`;
const Brand = styled.h5`
  color: var(--font-ligthblack);
`;
const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 500;
  text-overflow: ellipsis; 
  height: 34px;
  word-break:break-all;
  @media screen and (max-width: 390px){
    font-size: 1.6vw;
    font-weight: 400;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    font-size: 1.5vw;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.6vw;
  }
`;
const Price = styled.h5`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  margin-right: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  @media screen and (max-width: 390px){
    font-size: 1.3rem;
    font-weight: 500;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    font-size: 1.6vw;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.7vw;
  }
`;
const Colorchip = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;
const Color = styled.div`
  border-radius: 50%;
  background-color: orange;
  width: 8px;
  height: 8px;
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
  const {id} = useParams();

  const { img, nickname, score, title, price} = product;

  return(
    <Products to={`/detail/${proId}`}>
      <Img src={img.fullPath}></Img>
      <Detail>
        <SubDetail>
          <Brand>{nickname}</Brand>
          <StarDetail>
            <Star src={starimg}></Star>
            <StarAerage>{score}</StarAerage>
          </StarDetail>
        </SubDetail>
        <Title>{title}</Title>
        <SubDetail>
          <Price>{price.toLocaleString('en-US')}</Price>
        </SubDetail>
      </Detail>
    </Products>
  );
}

export default Product;
