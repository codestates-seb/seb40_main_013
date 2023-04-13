import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/macro";
import Carousel from "../components/mains/Calousel2";
import Products from "../components/common/Product";
import NewProducts from "../components/mains/NewProducts";
import { getMain } from "../apis/mainAPI";

interface ImgDetail {
  fileName: string;
  fullPath: string;
}
interface brand {
  id: number;
  img: ImgDetail;
  main: string;
  nickname: string;
  price: number;
  reviews: number;
  score: number;
  title: string;
}
type newProduct = Record<string, object[]>;
type brandProduct = Record<string, brand[]>;

const Main = () => {
  const [bestData, setBestData] = useState([]);
  const [newArivalData, setNewArivalData] = useState<newProduct>({});
  const [brandData, setBrandData] = useState<brandProduct>({});
  console.log(bestData);
  useEffect(() => {
    // best of best
    void getMain({ endPoint: "score", setData: setBestData });
    // 브랜드리스트
    void getMain({ endPoint: "categoryCreated", setData: setNewArivalData });
    // 브랜드리스트
    void getMain({ endPoint: "brandListLike", setData: setBrandData });
  }, [setBestData, setNewArivalData, setBrandData]);

  const brandTab = Object.keys(brandData);

  // 자동스크롤 이벤트
  const myRefs = useRef({});
  const onMoveToElement = (key: string) => {
    myRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      <div id="newArrival">
        <Title>
          <SubTitle>New Arrival</SubTitle>
          <MainTitle>카테고리별 신상품</MainTitle>
        </Title>
        <NewProducts key={newArivalData.침실?.length} newArivalList={newArivalData} />
      </div>
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
                ?.filter((t, i) => i <= 1)
                ?.map((tab) => (
                  <TD
                    key={tab}
                    onClick={() => {
                      onMoveToElement(tab);
                    }}
                  >
                    {tab}
                  </TD>
                ))}
            </TH>
            <TH>
              {brandTab
                ?.filter((t, i) => i <= 3 && i > 1)
                ?.map((tab) => (
                  <TD
                    key={tab}
                    onClick={() => {
                      onMoveToElement(tab);
                    }}
                  >
                    {tab}
                  </TD>
                ))}
            </TH>
          </div>
          <div className="reactionbody">
            <TH>
              {brandTab
                ?.filter((t, i) => i > 3 && i < 6)
                ?.map((tab) => (
                  <TD
                    key={tab}
                    onClick={() => {
                      onMoveToElement(tab);
                    }}
                  >
                    {tab}
                  </TD>
                ))}
            </TH>
            <TH>
              {brandTab
                ?.filter((t, i) => i >= 6)
                ?.map((tab) => (
                  <TD
                    key={tab}
                    onClick={() => {
                      onMoveToElement(tab);
                    }}
                  >
                    {tab}
                  </TD>
                ))}
            </TH>
          </div>
        </div>
      </BrandTab>
      {Object?.entries(brandData)?.map(([key, value]) => (
        <div key={key}>
          <BrandTitleContainer>
            <BrandTitle ref={(element) => (myRefs.current[key] = element)}>{key}</BrandTitle>
          </BrandTitleContainer>
          <ProductList>
            {value?.map((product) => (
              <Products key={product.id} proId={product.id} product={product} />
            ))}
          </ProductList>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 127.5px;
  z-index: 1;
  padding: 0 15px;
`;

// best of best
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
  scroll-margin-top: 130px;
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

// 브랜드 리스트
const BrandTab = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
  border-radius: 5px;
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
  .tbody {
    display: flex;
    border: 2px solid #ecece8;
  }
  .reactionbody {
    display: flex;
  }
  @media screen and (max-width: 479px) {
    .tbody {
      flex-direction: column;
    }
    .reactionbody {
      flex-direction: column;
    }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    .tbody {
      flex-direction: column;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .tbody {
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
  border: 3px solid #ecece8;
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
  scroll-margin-top: 140px;
`;

export default Main;
