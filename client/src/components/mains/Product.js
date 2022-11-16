import React from "react";
import styled from "styled-components/macro";
import starimg from '../../imgs/star.png'
import { Link } from "react-router-dom";

const Products = styled(Link)`
  width: 250px;
  margin: 0 10px;
`;
const Img = styled.img`
  width: 100%;
  display: flex;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-top: 10px;
`;
const Brand = styled.h5`
  color: var(--font-ligthblack);
`;
const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 500;
`;
const Price = styled.h5`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  margin-right: 10px;
  font-size: 1.5rem;
  font-weight: 700;
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
const Product = ({ img, brand, title, price, score }) => {
  return(
    <Products to="/detail/:id">
      <Img src={img}></Img>
      <Detail>
        <SubDetail>
          <Brand>{brand}</Brand>
          <StarDetail>
            <Star src={starimg}></Star>
            <StarAerage>{score}</StarAerage>
          </StarDetail>
        </SubDetail>
        <Title>{title}</Title>
        <SubDetail>
          <Colorchip>
            <Color />
          </Colorchip>
          <Price>{price.toLocaleString('en-US')}</Price>
        </SubDetail>
      </Detail>
    </Products>
  );
}

export default Product;