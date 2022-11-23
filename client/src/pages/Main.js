import React, { useState, useEffect, useRef, useCallback } from "react";
//import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bestOfBest, topBrand, mainData } from "../reduxstore/slices/articleSlice";
import { newData } from "../reduxstore/slices/mainSlice";
import { categoryData } from "../reduxstore/slices/categorySlice";
import styled from "styled-components/macro";
import Carousel from "../components/mains/Calousel2";
import Button from "../components/Button";
import Products from "../components/mains/Product";
import { Link } from "react-router-dom";
import Apis from "../apis/apis";
import NewProducts from "../components/mains/NewProducts";

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
  color: #aaaaaa;
  font-size: 1rem;
  margin-top: 30px;
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
  color: #aaaaaa;
`;
const FullView = styled(Link)`
  font-size: 1.1rem;
  margin: 20px 40px 0 0;
  cursor: pointer;
`;
const ProductList = styled.div`
  /* width: 70%; */
  margin: 30px 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  @media screen and (max-width: 390px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

//신상품
const BrandTab = styled.div`
  margin-top: 10px;
  border-radius: 5px;
  display: flex;
`;
const BrandData = styled.div``;
const TD = styled.div`
  border: 1px solid #aaaaaa;
  padding: 20px 50px;
  font-size: 1rem;
  cursor: pointer;
  &:hover{
    border: 3px solid #FFAF51;
  }
`;

const Main = () => {
  const dispatch = useDispatch();

  const bestData = useSelector((state)=> state.article.mainArticle);

  const libraryData = useSelector((state)=>state.category.category[1]);
  const bedData = useSelector((state)=>state.category.category[0]);

  const brandData = useSelector((state)=>state.main.main);
  // const brandTab = brandData?.map(brand => brand[0]?.nickname)
  const marketbeeData = useSelector((state)=>state.main.main[0]);
  const deskerData = useSelector((state)=>state.main.main[1]);
  const forthehomeData = useSelector((state)=>state.main.main[3]);
  const hudoData = useSelector((state)=>state.main.main[5]);
  const sofsysData = useSelector((state)=>state.main.main[6]);

  console.log(brandData)
  // console.log(brandData?.map(brand => brand[0]?.nickname))
  console.log(marketbeeData)
  // console.log(marketbeeData[0]?.nickname)

  //자동스크롤 이벤트
  const marketbeeRef = useRef();
  const deskerRef = useRef();
  const forthehomeRef = useRef();
  const hudoRef = useRef();
  const sofsysRef = useRef();

  const handlemarketbee = () => {
    marketbeeRef.current?.scrollIntoView({ behavior: 'smooth'})
  }

  const handledesker = () => {
    deskerRef.current?.scrollIntoView({ behavior: 'smooth'})
  }

  const handleforthehome = () => {
    forthehomeRef.current?.scrollIntoView({ behavior: 'smooth'})
  }
  const handlehudo= () => {
    hudoRef.current?.scrollIntoView({ behavior: 'smooth'})
  }
  const handlesofsys= () => {
    sofsysRef.current?.scrollIntoView({ behavior: 'smooth'})
  }

  //자동스크롤시 탭 헤더 밑으로 고정시키기
  // useEffect(() => { 
  //   document.getElementById('app')?.scrollTo(0, -170); // 첫 렌더시 스크롤이 최상단 고정된다
  //  }, []);
   
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll, { capture: true }); // 스크롤 이벤트 등록
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 등록 제거(성능저하방지)
  //   };
  // }, []);

  // const handleScroll = useCallback(() => {
  //   if (!tabRef.current || !detailRef.current || !document.getElementById('app')){
  //     return;
  //   }
  //   // 스크롤의 실시간 위치
  //   const scrollTop = document.getElementById('app')?.scrollTop; // 최상단 div 기준으로 스크롤 위치를 감지
      
  //     // 스크롤 위치가 tabRef(하위메뉴 탭)의 위치보다 아래이면
  //     if (scrollTop >= tabRef.current.offsetTop) {
  //       fixTab.current = true;   // fixTab 변수는 트루
  //     } else {		         // 그렇지 않으면
  //       fixTab.current = false;  // fixTab 변수는 false
  //     }

  //     // 스크롤 위치가 detailRef(하위메뉴 2번)의 위치보다 위이면
  //     if (scrollTop < detailRef.current.offsetTop - offset) {
  //       setTab(0); // 하위메뉴 탭은 자동으로 인덱스 0을 보여주자
  //     } 
  //     // 스크롤 위치가 detailRef(하위메뉴 2번)의 위치이거나 아래이면
  //     else if (scrollTop >= detailRef.current.offsetTop - offset) {
  //       setTab(1); // 하위메뉴 탭은 자동으로 인덱스 0을 보여주자
  //     } 

    
  // }, [tabRef.current, detailRef.current]);

  // 데이터 받아오기
  useEffect(()=>{
    dispatch(mainData());
    dispatch(categoryData());
    dispatch(newData());
  }, [])

  return (
    <Container id="app">
      {/* 캐러셀 */}
      <Carousel />
      {/* Best of Best */}
      <SubTitle>Best Selling</SubTitle>
      <Title>Best of Best</Title>
      <FullTitle name="fullTitle" className="fullTitle"></FullTitle>
      <ProductList>
        {bestData?.map((product) => (
            <Products
            key={product.id}
            proId={product.id}
            product={product}
            />
          ))}
      </ProductList>
      {/* 카테고리별 신상품 */}
      <SubTitle>New Arrival</SubTitle>
      <Title>신상품</Title>
      <NewProducts
        key={libraryData?.length}
        libraryList={libraryData}
        bedList = {bedData}
        // kitchenList={kitchenData}
      />
      {/* 브랜드별 추천상품 */}
      <SubTitle>Recommendation by brand</SubTitle>
      <Title>브랜드별 추천상품</Title>
      <BrandTab>
        {/* <TD onClick={handlemarketbee}>{brandTab[0]}</TD>
        <TD onClick={handledesker}>{brandTab[2]}</TD>
        <TD onClick={handleforthehome}>{brandTab[3]}</TD>
        <TD onClick={handlehudo}>{brandTab[5]}</TD>
        <TD onClick={handlesofsys}>{brandTab[6]}</TD> */}
      </BrandTab>
      <SubTitle ref={marketbeeRef}>marketbee</SubTitle>
      {/* <Title>{brandTab[0]}</Title> */}
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView 
          name="fullView" 
          className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {marketbeeData?.map((product) => (
            <Products
            key={product.id}
            proId={product.id}
            product={product}
            />
          ))}
      </ProductList>
      <SubTitle ref={deskerRef}>marketbee</SubTitle>
      {/* <Title>{brandTab[1]}</Title> */}
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView 
          name="fullView" 
          className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {deskerData?.map((product) => (
            <Products
            key={product.id}
            proId={product.id}
            product={product}
            />
          ))}
      </ProductList>
      <SubTitle ref={forthehomeRef}>marketbee</SubTitle>
      {/* <Title>{brandTab[3]}</Title> */}
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView 
          name="fullView" 
          className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {forthehomeData?.map((product) => (
            <Products
            key={product.id}
            proId={product.id}
            product={product}
            />
          ))}
      </ProductList>
      <SubTitle ref={hudoRef}>marketbee</SubTitle>
      {/* <Title>{brandTab[5]}</Title> */}
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView 
          name="fullView" 
          className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {hudoData?.map((product) => (
            <Products
            key={product.id}
            proId={product.id}
            product={product}
            />
          ))}
      </ProductList>
      <SubTitle ref={sofsysRef}>marketbee</SubTitle>
      {/* <Title>{brandTab[6]}</Title> */}
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView 
          name="fullView" 
          className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {sofsysData?.map((product) => (
            <Products
            key={product.id}
            proId={product.id}
            product={product}
            />
          ))}
      </ProductList>
      <Button />
    </Container>
  );
};

export default Main;
