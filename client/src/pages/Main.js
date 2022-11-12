import React, { useState, useEffect } from "react";
//import { Link } from 'react-router-dom';
import styled from "styled-components/macro";
import Carousel from "../components/mains/Calousel";
import Button from "../components/Button";
import Products from "../components/mains/Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;
const Title = styled.h2`
  display: flex;
  font-weight: 700;
  font-size: 2rem;
  margin: 30px 0 10px 0;
  color: #515151;
`;
const Hr = styled.hr`
  height: 7px;
  width: 70px;
  background-color: #515151;
  margin-bottom: 20px;
  color: #515151;
`;
const FullTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
  margin-bottom: 10px;
  color: #515151;
`;
const FullView = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-right: 40px;
  cursor: pointer;
`;
const ProductList = styled.div`
  width: 80%;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const Main = () => {
  const [productList, setProductList] = useState([]);

  useEffect(()=> {
    axios.get("http://localhost:3001/products")
    .then((data) => setProductList(data.data));
  }, []);
  console.log(productList);

return(
  <Container>
    <Carousel />
    <Title>거실</Title>
    <Hr />
    <FullTitle name="fullTitle" className="fullTitle">
      <FullView name="fullView" className="fullView">전체보기 &gt;&gt;</FullView>
    </FullTitle>
    <ProductList>
      {productList.map(product => (
        <Products 
          brand={product.brand} 
          // img={product.img} 
          name={product.name} 
          price={product.price}/>
        )
      )}
    </ProductList>
    <Title>서재</Title>
    <Hr />
    <FullTitle name="fullTitle" className="fullTitle">
      <FullView name="fullView" className="fullView">전체보기 &gt;&gt;</FullView>
    </FullTitle>
    <ProductList>
      <Products />
      <Products />
      <Products />
      <Products />
    </ProductList>
    <Title>침실</Title>
    <Hr />
    <FullTitle name="fullTitle" className="fullTitle">
      <FullView name="fullView" className="fullView">전체보기 &gt;&gt;</FullView>
    </FullTitle>
    <ProductList>
      <Products />
      <Products />
      <Products />
      <Products />
    </ProductList>
    <Button />
  </Container>
)
}

export default Main;