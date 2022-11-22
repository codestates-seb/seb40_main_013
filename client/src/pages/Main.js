import React, { useState, useEffect, useRef, useCallback } from "react";
//import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  bestOfBest,
  topBrand,
  mainData,
} from "../reduxstore/slices/articleSlice";
import { newData } from "../reduxstore/slices/mainSlice";
import styled from "styled-components/macro";
import Carousel from "../components/mains/Calousel2";
import Button from "../components/Button";
import Products from "../components/mains/Product";
import { Link } from "react-router-dom";
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
const Table = styled.table`
  margin-top: 10px;
  border-radius: 5px;
`;
const TD = styled.td`
  border: 1px solid #aaaaaa;
  padding: 20px 50px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    border: 3px solid #ffaf51;
  }
`;

const Main = () => {
  const dispatch = useDispatch();
  const bestData = useSelector((state) => state?.article.mainArticle);
  // const brandData = useSelector((state)=>state.article.mainArticle[5])
  const categoryData = useSelector((state) => state.main.main);
  const allData = useSelector((state) => state);
  console.log(allData);
  // const oneData = brandData.filter(p =>p.nickname ==='heojunyeol')

  const libraryData = bestData?.filter((p, idx) => idx < 5);
  const bedroomData = bestData?.filter((p, idx) => idx > 5);

  console.log(libraryData, bedroomData);
  // console.log(brandData)
  // console.log(categoryData)

  //자동스크롤 이벤트
  const libraryRef = useRef();
  const bedroomRef = useRef();
  const livingroomRef = useRef();
  const kitchenRef = useRef();

  const handleLibrary = () => {
    libraryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBedroom = () => {
    bedroomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLivingroom = () => {
    livingroomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleKitchen = () => {
    kitchenRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  //best of best
  useEffect(() => {
    dispatch(mainData());
    dispatch(newData());
  }, []);

  // console.log(productList.map((p) => console.log(p.img)));
  return (
    <Container id="app">
      <Carousel />
      <SubTitle>Best Selling</SubTitle>
      <Title>Best of Best</Title>
      <FullTitle name="fullTitle" className="fullTitle"></FullTitle>
      <ProductList>
        {bestData?.map((product) => (
          <Products porId={product.id} product={product} key={product.id} />
        ))}
      </ProductList>
      <Title>브랜드별 추천상품</Title>
      {/* <BrandProducts
        key={oneData.length}
        dodotList={oneData}
        sofsysList={brandData.filter((p) => p.nickname === "소프시스")}
        forthehomeList={brandData.filter((p) => p.nickname === "포더홈")}
        deskerList={brandData.filter((p) => p.nickname === "데스커")}
      /> */}
      <Title>New Arrival</Title>
      <Table>
        <tbody className="tbody">
          <tr className="tr">
            <TD onClick={handleLibrary}>서재</TD>
            <TD onClick={handleBedroom}>침실</TD>
            <TD onClick={handleLivingroom}>거실</TD>
            <TD onClick={handleKitchen}>주방</TD>
          </tr>
        </tbody>
      </Table>
      <SubTitle ref={libraryRef}>Library</SubTitle>
      <Title>서재</Title>
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView name="fullView" className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {libraryData?.map((product, key) => (
          <Products porId={product.id} product={product} key={product.id} />
        ))}
      </ProductList>
      <SubTitle ref={bedroomRef}>Bedroom</SubTitle>
      <Title>침실</Title>
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView name="fullView" className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {bedroomData?.map((product, key) => (
          <Products porId={product.id} product={product} key={product.id} />
        ))}
      </ProductList>
      <SubTitle ref={livingroomRef}>Living room</SubTitle>
      <Title>거실</Title>
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView name="fullView" className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {/* {productList.filter((product, idx) => idx < 15).map((product, key) => (
          <Products
            brand={product.brand}
            img={product.img.fullPath}
            key={key}
            title={product.title}
            price={product.price}
            score={product.score}
            colorChip={product.colorChip}
          />
        ))} */}
      </ProductList>
      <SubTitle ref={kitchenRef}>Kitchen</SubTitle>
      <Title>주방</Title>
      <FullTitle name="fullTitle" className="fullTitle">
        <FullView name="fullView" className="fullView">
          전체보기 &gt;&gt;
        </FullView>
      </FullTitle>
      <ProductList>
        {/* {productList.filter((product, idx) => idx < 15).map((product, key) => (
          <Products
            brand={product.brand}
            img={product.img.fullPath}
            key={key}
            title={product.title}
            price={product.price}
            score={product.score}
            colorChip={product.colorChip}
          />
        ))} */}
      </ProductList>
      <Button />
    </Container>
  );
};

export default Main;
