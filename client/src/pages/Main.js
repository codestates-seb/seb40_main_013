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
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 160px;
  z-index: 1;
`;

//best of best
const SubTitle = styled.h2`
  color: #AAAAAA;
  font-size: 1rem;
  margin-top: 40px;
`;
const Title = styled.h2`
  display: flex;
  font-weight: 400;
  font-size: 2rem;
  margin: 10px 0 10px 0;
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
  color: #AAAAAA;
`;
const FullView = styled(Link)`
  font-size: 1.5rem;
  margin: 20px 40px 5px 0;
  cursor: pointer;
`;
const ProductList = styled.div`
  /* width: 70%; */
  margin: 30px 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  @media screen and (max-width: 390px){
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 391px) and (max-width: 768px){
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;


//신상품
const Table = styled.table`
  margin-top: 10px;
`;
const TD = styled.td`
  border: 1px solid #AAAAAA;
  padding: 20px 50px;
  font-size: 1rem;
`;

const Main = () => {
  const [productList, setProductList] = useState([]);  

  useEffect(() => {
    Apis.get(`products/화장실`).then((data) => 
    setProductList(data.data.content));
  }, []);

  return (
    <Container>
      <Carousel />
      <SubTitle>Best Selling</SubTitle>
      <Title>Best of Best</Title>
      <FullTitle name="fullTitle" className="fullTitle">
      </FullTitle>
      <ProductList>
        {productList.filter(product => product.id < 5).map(product =>
          <Products
            brand={product.brand}
            img={product.img.fullPath}
            alt={product.img.fileName}
            key={product.id}
            title={product.title}
            price={product.price}
            score={product.score}
          />
        )}
      </ProductList>
      {/* <Title>브랜드별 추천상품</Title>
      <BrandProducts
        key={productList.length}
        dodotList={productList.filter(p => p.brand === 'dodot' && p.id < 9)}
        sofsysList={productList.filter(p => p.brand === '소프시스')}
        forthehomeList={productList.filter(p => p.brand === '포더홈')}
        deskerList={productList.filter(p => p.brand === '데스커')}/>
      <Title>New Arrival</Title>
      <Table>
        <tbody className="tbody">
          <tr className="tr">
            <TD>서재</TD>
            <TD>침실</TD>
            <TD>거실</TD>
            <TD>주방</TD>
          </tr>
        </tbody>
      </Table>
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView name="fullView" className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {productList.map((product, key) => (
          <Products
            brand={product.brand}
            img={product.img.fullPath}
            key={key}
            title={product.title}
            price={product.price}
            score={product.score}
            colorChip={product.colorChip}
          />
        ))}
      </ProductList> */}
      <Button />
    </Container>
  );
};

export default Main;