import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solide blue;
  height: 20%;
`;
const PL = styled.div``;
const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;
const Title = styled.h2`
  font-size: 1rem;
`;
const BrandProductDetail = ({ productList }) => {
  console.log(productList);

  return (
    <Container>
      {productList.map((p) => {
        <PL>
          <Img src={p.img} />
          <Title>{p.title}</Title>
        </PL>;
      })}
    </Container>
  );
};
export default BrandProductDetail;
