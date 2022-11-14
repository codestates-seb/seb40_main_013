import React from "react";
<<<<<<< HEAD
import styled from "styled-components";
=======
import styled from "styled-components/macro";
>>>>>>> dab95ec5c2f7f888c1e204edffd7f222bea84032
import 화장대 from '../../imgs/화장대.png'

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
const Brand = styled.h5``;
const Title = styled.h3`
  font-weight: 600;
  margin-left: 10px;
`;
const Price = styled.h5`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  margin-right: 10px;
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

const Product = ({ brand, name, price }) => {
  return(
    <ProductList>
      <Img src={화장대}></Img>
      <Detail>
        <Brand>{brand}</Brand>
        <Title>{name}</Title>
        <Price>{price}</Price>
        <Colorchip>
          <Color />
        </Colorchip>
      </Detail>
    </ProductList>
  );
}

export default Product;