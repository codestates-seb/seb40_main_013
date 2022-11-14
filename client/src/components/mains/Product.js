import React from "react";
import styled from "styled-components/macro";
import starimg from '../../imgs/star.png'

const ProductList = styled.div`
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
  font-size: 1.2rem;
  font-weight: 600;
`;
const Price = styled.h5`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  margin-right: 10px;
  font-size: 1.7rem;
  font-weight: 900;
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
const Product = ({ img, brand, name, price, star }) => {
  return(
    <ProductList>
      <Img src={img}></Img>
      <Detail>
        <SubDetail>
          <Brand>{brand}</Brand>
          <StarDetail>
            <Star src={starimg}></Star>
            <StarAerage>{star}</StarAerage>
          </StarDetail>
        </SubDetail>
        <Title>{name}</Title>
        <SubDetail>
          <Colorchip>
            <Color />
          </Colorchip>
          <Price>{price}</Price>
        </SubDetail>
      </Detail>
    </ProductList>
  );
}

export default Product;