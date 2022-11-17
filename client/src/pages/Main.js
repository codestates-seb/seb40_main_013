import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import Carousel from "../components/mains/Calousel2";
import Button from "../components/Button";
import Products from "../components/mains/Product";
import { Link } from "react-router-dom";
import axios from "axios";
import Apis from "../apis/apis";
import BrandProducts from "../components/mains/BrandProducts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 180px;
  z-index: 1;
`;
const Title = styled.h2`
  display: flex;
  font-weight: 400;
  font-size: 2rem;
  margin: 40px 0 10px 0;
  color: var(--font-black);
`;
const Hr = styled.hr`
  height: 7px;
  width: 70px;
  background-color: var(--font-black);
  margin-bottom: 10px;
  color: var(--font-black);
`;
const FullTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;
  margin-bottom: 10px;
  color: #aaaaaa;
`;
const FullView = styled(Link)`
  font-size: 1.5rem;
  margin-bottom: 10px;
  margin-right: 40px;
  cursor: pointer;
`;
const ProductList = styled.div`
  width: 80%;
  margin: 30px 0;
  display: flex;
  justify-content: center;
`;

const Main = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    Apis.get(`products`).then((data) => setProductList(data.data));
  }, []);
  return (
    <Container>
      <Carousel />
      <Title>Best of Best</Title>
      <Hr />
      <FullTitle name="fullTitle" className="fullTitle"></FullTitle>
      <ProductList>
        {productList
          .filter((product) => product.id < 6)
          .map((product) => (
            <Products
              brand={product.brand}
              img={product.img}
              key={product.id}
              title={product.title}
              price={product.price}
              score={product.score}
            />
          ))}
      </ProductList>
      <Title>브랜드별 추천상품</Title>
      <BrandProducts productList={productList.filter((p) => p.id < 6)} />
      <Title>침실</Title>
      <Hr />
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView name="fullView" className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {productList.map((product) => (
          <Products
            brand={product.brand}
            img={product.img}
            key={product.id}
            title={product.title}
            price={product.price}
            score={product.score}
            colorChip={product.colorChip}
          />
        ))}
      </ProductList>
      <Button />
    </Container>
  );
};

export default Main;