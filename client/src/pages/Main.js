import React, { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { mainData } from "../reduxstore/slices/articleSlice";
import { newData } from "../reduxstore/slices/mainSlice";
import { categoryData } from "../reduxstore/slices/mainCategorySlice";
import styled from "styled-components/macro";
import Carousel from "../components/mains/Calousel2";
import Products from "../components/mains/Product";
import NewProducts from "../components/mains/NewProducts";

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 127.5px;
  z-index: 1;
`;

//best of best
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;
const SubTitle = styled.h2`
  color: #aaaaaa;
  font-size: 1rem;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 479px) {
    font-size: 0.9rem;
  }
`;
const MainTitle = styled.h2`
  display: flex;
  font-weight: 400;
  font-size: 2rem;
  margin-top: 10px;
  color: var(--font-black);
  scroll-margin-top: 170px;
  @media screen and (max-width: 479px) {
    font-size: 1.4rem;
    margin-top: 5px;
  }
`;
const ProductList = styled.div`
  /* width: 70%; */
  margin: 10px 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  @media screen and (max-width: 479px) {
    margin: 5px 0;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

//브랜드 리스트
const BrandTab = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  border-radius: 5px;
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
  .tbody{
    display: flex;
    border: 2px solid #ECECE8;
  }
  .reactionbody{
     display:flex;
    }
  @media screen and (max-width: 479px) {
    .tbody{
      flex-direction: column;
    }
    .reactionbody{
      flex-direction: column;
    }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    .tbody{
      flex-direction: column;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .tbody{
      flex-direction: column;
    }
  }
`;
const TH = styled.div`
  display: flex;
`;
const TD = styled.div`
  display: flex;
  justify-content: center;
  border: 3px solid #ECECE8;
  padding: 20px 50px;
  font-size: 1rem;
  width: 50px;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: #ffaf51;
    color: white;
  }
  @media screen and (max-width: 479px) {
    font-size: 0.9rem;
    padding: 15px 35px;
  }
`;
const BrandTabTitle = styled.div`
  margin-top: 5vh;
  @media screen and (max-width: 390px) {
    margin-top: 1vh;
  }
`;
const BrandTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 0 20px;
`;
const BrandTitle = styled.h2`
  font-size: 1.6rem;
  margin-left: 10px;
`;
const FullView = styled(Link)`
  display: flex;
  align-items: flex-end;
  font-size: 1rem;
  margin: 20px 40px 0 0;
  color: #aaaaaa;
  cursor: pointer;
`;

const BrandProduct = styled.div``;

const Main = () => {
  const dispatch = useDispatch();

  //best of best
  const bestData = useSelector((state) => state.article.mainArticle);

  // 신상품
  const newArivalData = useSelector((state) => state.maincategory.category);

  //브랜드리스트
  const brandData = useSelector((state) => state?.main.main);
  const brandTab = Object.keys(brandData);

  //자동스크롤 이벤트
  const myRefs = useRef({});
  const onMoveToElement = (key) => {
    myRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Object?.entries(brandData)?.filter(key => key[0] !== 'guest')
  //           ?.map(([key,value]) => console.log(key))
  //자동스크롤시 탭 헤더 밑으로 고정시키기

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
  useLayoutEffect(() => {
    dispatch(mainData());
    dispatch(categoryData());
    dispatch(newData());
  }, []);

  return (
    <Container id="app">
      {/* 캐러셀 */}
      <Carousel />
      {/* Best of Best */}
      <Title>
        <SubTitle>Best Selling</SubTitle>
        <MainTitle>Best of Best</MainTitle>
      </Title>
      <ProductList>
        {bestData?.map((product) => (
          <Products key={product.id} proId={product.id} product={product} />
          ))}
      </ProductList>
      {/* 카테고리별 신상품 */}
      <Title>
        <SubTitle>New Arrival</SubTitle>
        <MainTitle>카테고리별 신상품</MainTitle>
      </Title>
      <NewProducts
        key={newArivalData.침실?.length}
        newArivalList={newArivalData}
      />
      {/* 브랜드별 추천상품 */}
      <BrandTabTitle>
        <SubTitle>Best Selling</SubTitle>
        <MainTitle>브랜드별 추천상품</MainTitle>
      </BrandTabTitle>
      <BrandTab>
        <div className="tbody">
          <div className="reactionbody">
            <TH>
              {brandTab
                ?.filter((t, i) => t !== "guest" && i <= 1)
                ?.map((tab) => (
                  <TD key={tab} onClick={() => onMoveToElement(tab)}>
                    {tab}
                  </TD>
                ))}
            </TH>
            <TH>
              {brandTab
                ?.filter((t, i) => t !== "guest" && i <= 3 && i > 1)
                ?.map((tab) => (
                  <TD key={tab} onClick={() => onMoveToElement(tab)}>
                    {tab}
                  </TD>
                ))}
            </TH>
          </div>
          <div className="reactionbody">
            <TH>
              {brandTab
                ?.filter((t, i) => t !== "guest" && i > 3 && i < 6)
                ?.map((tab) => (
                  <TD key={tab} onClick={() => onMoveToElement(tab)}>
                    {tab}
                  </TD>
                ))}
            </TH>
            <TH>
              {brandTab
                ?.filter((t, i) => t !== "guest" && i >= 6)
                ?.map((tab) => (
                  <TD key={tab} onClick={() => onMoveToElement(tab)}>
                    {tab}
                  </TD>
                ))}
            </TH>
          </div>
        </div>
      </BrandTab>
      {Object?.entries(brandData)
        ?.filter((key) => key[0] !== "guest")
        ?.map(([key, value]) => (
          <BrandProduct key={key}>
            <BrandTitleContainer>
              <BrandTitle ref={(element) => (myRefs.current[key] = element)}>
                {key}
              </BrandTitle>
              <FullView name="fullView" className="fullView">
                전체보기 &gt;&gt;
              </FullView>
            </BrandTitleContainer>
            <ProductList>
              {value?.map((product) => (
                <Products
                  key={product.id}
                  proId={product.id}
                  product={product}
                />
              ))}
            </ProductList>
          </BrandProduct>
        ))}
    </Container>
  );
};

export default Main;