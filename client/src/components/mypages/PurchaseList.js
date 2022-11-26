import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components/macro";
import PostReview from "./PostReview";
import { getMyOrder } from '../../reduxstore/slices/myOrderSlice';
import PurchaseAll from './PurchaseAll';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 40px;
  width: 80%;
  @media screen and (max-width: 390px) {
    width: 100%;
    padding: 0 20px;
    margin: 30px 0;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    margin: 30px 0;
  }
`;

//상단
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 15px;
  @media screen and (max-width: 390px) {
    margin: 3px 10px;
  }
`;
const SubTop = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
`;
const AllPurchase = styled(Link)`
  font-weight: 700;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    color: #ffaf51;
  }
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
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
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
`;
const DelieveryStatus = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
  color: #ffaf51;
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  @media screen and (max-width: 390px) {
    margin: 5px 10px;
    justify-content: flex-start;
  }
`;
const SubDetail = styled.div`
  display: flex;
`;
const ReactionSubDetail = styled.div`
  display: flex;
  @media screen and (max-width: 390px) {
    flex-direction: column;
  }
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 10px;
  @media screen and (max-width: 390px) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;
const BP = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  @media screen and (max-width: 390px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;
const BrandName = styled.h4`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 5px;
  @media screen and (max-width: 390px) {
    font-weight: 300;
    font-size: 10px;
    margin-right: 5px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    font-weight: 500;
  }
`;
const ProductName = styled.h2`
  font-weight: 700;
  font-size: 1.3rem;
  @media screen and (max-width: 390px) {
    font-weight: 500;
    font-size: 12px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
const Option = styled.h2`
  margin-top: 5px;
`;
const Price = styled.h2`
  margin: 10px 0;
  @media screen and (max-width: 390px) {
    margin: 5px 5px 5px 0;
    font-size: 12px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    margin: 5px 0;
  }
`;
const Btns = styled.div`
  display: flex;
  flex-direction: column;
`;
const ReviewBtn = styled.button`
  padding: 8px 30px;
  /* height: 50px; */
  background-color: #002c6d;
  color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media screen and (max-width: 390px) {
    display: none;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    padding: 8px 30px;
  }
`;
const CancleBtn = styled.button`
  padding: 8px 30px;
  /* height: 50px; */
  /* border: 1px solid red; */
  color: red;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: red;
    color: white;
  }
  @media screen and (max-width: 390px) {
    display: none;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    padding: 8px 30px;
  }
`;

//반응형 구매후기
const ReactionSpace = styled.div`
  display: none;
  @media screen and (max-width: 390px) {
    display: flex;
    justify-content: flex-end;
    margin: 5px 10px;
  }
`;

const ReactionReviewBtn = styled.button`
  display: none;
  @media screen and (max-width: 390px) {
    display: flex;
    color: #515151;
    border: 0.7px solid #aaaaaa;
    border-radius: 5px;
    padding: 3px 10px;
    cursor: pointer;
    &:hover {
      background-color: #002c6d;
      color: white;
    }
  }
`;

//브랜드 정보
const BrandDetail = styled.div`
  height: 150px;
  background-color: #ecece8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 390px) {
    height: 70px;
  }
`;
const DelieveryWay = styled.div`
  color: rgba(81, 81, 81, 0.47);
  font-size: 1rem;
  margin-bottom: 10px;
  @media screen and (max-width: 390px) {
    font-size: 12px;
  }
`;
const BrandPhone = styled.div`
  font-weight: 800;
  font-size: 1.3rem;
  @media screen and (max-width: 390px) {
    font-size: 15px;
  }
`;


const PurchaseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myOrderData = useSelector((state)=> state.myorder.myorder);
  console.log(myOrderData);
  const [isModal, setIsModal] = useState(false);

  const clickModal = () => {
    setIsModal(!isModal);
  };

  useEffect(()=>{
    // dispatch(getMyOrder({click}))
  }, []);


  return (
    <>
      {isModal ? (
        <>
          <Container>
            <PostReview clickModal={clickModal} />
            <Top>
              <SubTop>830495 | 2022.01.11</SubTop>
              <AllPurchase to="orderall" style={{ textDecoration: "none" }}>상세보기 &gt;</AllPurchase>
            </Top>
            <Hr />
            <Content>
              <PD>
                <ProductStatus>구매확정</ProductStatus>
                <DelieveryStatus>도착완료</DelieveryStatus>
              </PD>
              <Detail>
                <Img />
                <ReactionSubDetail>
                  <BP>
                    <BrandName>두닷</BrandName>
                    <ProductName>화장대</ProductName>
                    <Option>색상: white</Option>
                  </BP>
                  <SubDetail>
                    <BP>
                      {/* <ProductName>화장대</ProductName> */}
                      <Price>13900 | 1개</Price>
                    </BP>
                  </SubDetail>
                </ReactionSubDetail>
                <Btns>
                  <ReviewBtn onClick={clickModal}>리뷰작성</ReviewBtn>
                  <CancleBtn onClick={clickModal}>주문취소</CancleBtn>
                </Btns>
              </Detail>
              <ReactionSpace>
                <ReactionReviewBtn>구매후기</ReactionReviewBtn>
              </ReactionSpace>
            </Content>
            <BrandDetail>
              <DelieveryWay>무료배송</DelieveryWay>
              <BrandPhone>두닷 02-000-0000</BrandPhone>
            </BrandDetail>
          </Container>
        </>
      ) : (
        <Container>
          <Top>
            <SubTop>830495 | 2022.01.11</SubTop>
            <AllPurchase to="orderall" style={{ textDecoration: "none" }}>상세보기 &gt;</AllPurchase>
          </Top>
          <Hr />
          <Content>
            <PD>
              <ProductStatus>구매확정</ProductStatus>
              <DelieveryStatus>도착완료</DelieveryStatus>
            </PD>
            <Detail>
              <Img />
              <ReactionSubDetail>
                <BP>
                  <BrandName>두닷</BrandName>
                  <ProductName>화장대</ProductName>
                  <Option>색상: white</Option>
                </BP>
                <SubDetail>
                  <BP>
                    {/* <ProductName>화장대</ProductName> */}
                    <Price>13900 | 1개</Price>
                  </BP>
                </SubDetail>
              </ReactionSubDetail>
              <Btns>
                <ReviewBtn onClick={clickModal}>리뷰작성</ReviewBtn>
                <CancleBtn onClick={clickModal}>주문취소</CancleBtn>
              </Btns>
            </Detail>
            <ReactionSpace>
              <ReactionReviewBtn>구매후기</ReactionReviewBtn>
            </ReactionSpace>
          </Content>
          <BrandDetail>
            <DelieveryWay>무료배송</DelieveryWay>
            <BrandPhone>두닷 02-000-0000</BrandPhone>
          </BrandDetail>
        </Container>
      )}
    </>
  );
};

export default PurchaseList;
