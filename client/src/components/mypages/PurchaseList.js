import React from "react";
import styled from "styled-components";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 40px;
  width: 80%;
`;

//상단
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 15px;
`;
const SubTop = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
`;

const Hr = styled.hr`
  height: 3px;
  border: none;
  background-color: var(--color-center-line);
  margin: 5px 0;
`;

//콘텐츠
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const PD = styled.div`
  display: flex;
  margin: 10px;
`;
const ProductStatus = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
  margin-right: 10px;
`;
const DelieveryStatus = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
  color: #FFAF51;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
`;
const SubDetail = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 10px;
`;
const BP = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
const BrandName = styled.h4`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 5px;
`;
const ProductName = styled.h2`
  font-weight: 700;
  font-size: 1.3rem;
`;
const Price = styled.h2`
  margin: 10px 0;
`;
const Delievery = styled.h2`
  color: #FFAF51;
`;
const Quantity = styled.h2`
  display:flex;
  align-items: center;
  margin: 0 20px;
`;

//브랜드 정보
const BrandDetail = styled.div`
  height: 150px;
  background-color: #ecece8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const DelieveryWay = styled.div`
  color: rgba(81, 81, 81, 0.47);
  font-size: 1rem;
  margin-bottom: 10px;
`;
const BrandPhone = styled.div`
  font-weight: 800;
  font-size: 1.3rem;
`;
const PurchaseList = ()=>{
  return (
    <Container>
      <Top>
        <SubTop>830495 | 2022.01.11</SubTop>
        <SubTop>상세보기 &gt;</SubTop>
      </Top>
      <Hr />
      <Content>
        <PD>
          <ProductStatus>구매확정</ProductStatus>
          <DelieveryStatus>도착완료</DelieveryStatus>
        </PD>
        <Detail>
          <SubDetail>
            <Img />
            <BP>
              <BrandName>두닷</BrandName>
              <ProductName>화장대</ProductName>
            </BP>
          </SubDetail>
          <SubDetail>
            <BP>
              <ProductName>화장대</ProductName>
              <Price>13900</Price>
              <Delievery>일반배송</Delievery>
            </BP>
            <Quantity>1개</Quantity>
          </SubDetail>
        </Detail>
      </Content>
      <BrandDetail>
        <DelieveryWay>무료배송</DelieveryWay>
        <BrandPhone>두닷 02-000-0000</BrandPhone>
      </BrandDetail>
    </Container>
  )
}

export default PurchaseList;