import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { getMyOrder } from '../../reduxstore/slices/myOrderSlice';
import PurchaseAll from "./PurchaseAll";
import styled from "styled-components/macro";
import PostReview from "./PostReview";
import Button from '../Button';

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
const NotOrder = styled.h3``;

const Ordercontainter = styled.div``;

//상단
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 15px;
  @media screen and (max-width: 390px) {
    margin: 7px 10px;
  }
`;
const SubTop = styled.h2`
  font-weight: 600;
  font-size: 1.2rem;
  color: #272727;
  .ordernumber{
    color: #FFAF51;
  }
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
  @media (min-width: 391px) and (max-width: 767px){
    font-size: 2.2vw;
    font-weight: 500;
  }
  @media (min-width: 768px) and (max-width: 1023px){
    font-size: 2vw;
    font-weight: 500;
  }
`;
const AllPurchase = styled(Link)`
  font-weight: 700;
  font-size: 1.1rem;
  display:flex;
  align-items: flex-end;
  color: var(--font-ligthblack);
  cursor: pointer;
  &:hover {
    color: #ffaf51;
  }
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
  @media (min-width: 391px) and (max-width: 767px){
    font-size: 2vw;
    align-items: flex-end;
    color: #515151;
  }
  @media (min-width: 768px) and (max-width: 1023px){
    font-size: 1.7vw;
  }
`;

const Hr = styled.hr`
  height: 1px;
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
  color: #272727;
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
  @media (min-width: 391px) and (max-width: 767px){
    font-size: 3.5vw;
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
  @media (min-width: 391px) and (max-width: 767px){
    font-size: 3.5vw;
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
const ReactionSubDetail = styled.div`
  display: flex;
  /* @media screen and (max-width: 479px) {
    flex-direction: column;
  } */
`;

const Img = styled.img`
  width: 130px;
  height: 130px;
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
  justify-content: space-evenly;
  align-items: flex-start;
  margin-left: 20px;
  @media screen and (max-width: 390px) {
    justify-content: center;
  }  
  @media (min-width: 391px) and (max-width: 767px){
    justify-content: center;
    margin-left: 0;
  }
`;
const BrandName = styled.h4`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 5px;
  @media screen and (max-width: 390px) {
    font-weight: 600;
    font-size: 0.8rem;
    margin-bottom: 0;
    padding: 5px 0;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    font-weight: 500;
    font-size: 2.7vw;
    margin-right: 5px;
  }
`;
const Option = styled.h2`
  margin: 5px 0;
  @media screen and (max-width: 390px) {
    font-size: 0.7rem;
  }  
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
  @media screen and (max-width: 479px) {
    display: none;
  }
  @media (min-width: 480px) and (max-width: 768px) {
    padding: 8px 30px;
  }
`;

//반응형 구매후기
const ReactionSpace = styled.div`
  display: none;
  @media screen and (max-width: 479px) {
    display: flex;
    justify-content: flex-end;
    margin: 5px 10px;
  }
`;

const ReactionReviewBtn = styled.button`
  display: none;
  @media screen and (max-width: 479px) {
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

//페이지네이션
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Pagination = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: block;
    float: left;
    padding: 5px;

    &:first-child {
      border: none;
    }
  }
`;
const PageButton = styled.button`
    background: none;
    border: none;
    border-radius: 50%;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.6);
    display: block;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    min-width: 40px;
    padding: 0;
    &:hover{
      cursor: pointer;
      background-color: #aaa;
      border-radius: 50%;
      color: white;
    }
`;
const ThickHr= styled.hr`
  height: 2px;
  border: none;
  background-color: var(--color-center-line);
  margin: 15px 0;
`;
const DetailContent = styled.div``;

const PurchaseList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myOrderData = useSelector((state)=> state.myorder.myorder.content);
  // console.log(myOrderData);
  const [isModal, setIsModal] = useState(false);
  //page click
  const [click, setClick] = useState(0);

  const pageClick = (e) => {
    setClick(e.target.innerText);
  }

  const clickModal = () => {
    setIsModal(!isModal);
  };

  useEffect(()=>{
    dispatch(getMyOrder(click))
  }, []);

  if(myOrderData === {}) return(<NotOrder>구매 내역이 없습니다.</NotOrder>)

  return (
    <>
      {isModal ? (
        <>
          <Container>
            <PostReview clickModal={clickModal} />
            <Hr />
              {myOrderData?.map((order, i) => (
                <Ordercontainter key={i}>
                <Top>
                  <SubTop><span className="ordernumber">{order.orderNumber}</span> | {order.createdAt.slice(0, 10)}</SubTop>
                  <AllPurchase to="orderall">상세보기 &gt;</AllPurchase>
                </Top>
                <Content>
                  <Detail>
                    <ReactionSubDetail>
                    <Img src={order.orderProducts[0].img.fullPath} />
                      <BP>
                        <BrandName>{[order.orderProducts[0].brandName]}<span>{order.orderProducts[0].title}</span></BrandName>
                        <Option>색상: {order.orderProducts[0].color}</Option>
                        <Price><span>{order.orderProducts[0].price}</span> | {order.orderProducts[0].count}개</Price>
                      </BP>
                    </ReactionSubDetail>
                    <Btns>
                      <CancleBtn>주문취소</CancleBtn>
                    </Btns>
                  </Detail>
                  <ReactionSpace>
                    <ReactionReviewBtn>주문취소</ReactionReviewBtn>
                  </ReactionSpace>
                </Content>
              <Hr />
              </Ordercontainter>
              ))}
            <PaginationContainer>
              <Pagination>
                <li><PageButton className="prev" title="previous page">&#10094;</PageButton></li>
                <li>
                  <PageButton title="first page - page 1">1</PageButton>
                </li>
                <li>
                  <PageButton>2</PageButton>
                </li>
                <li>
                  <PageButton className="active" title="current page - page 9">3</PageButton>
                </li>
                <li>
                  <PageButton>4</PageButton>
                </li>
                <li>
                  <PageButton>5</PageButton>
                </li>
                <li><PageButton className="next" title="next page">&#10095;</PageButton></li>
              </Pagination>
            </PaginationContainer>
          </Container>
        </>
      ) : (
        <Container>
              <Hr />
              {myOrderData?.map((order, i) => (
                <Ordercontainter key={i}>
                <Top>
                  <SubTop><span className="ordernumber">{order.orderNumber}</span> | {order.createdAt.slice(0, 10)}</SubTop>
                  <AllPurchase to="orderall">상세보기 &gt;</AllPurchase>
                </Top>
                <Content>
                  <Detail>
                    <ReactionSubDetail>
                    <Img />
                      <BP>
                        <BrandName>{[order.orderProducts[0].brandName]}<span>{order.orderProducts[0].title}</span></BrandName>
                        <Option>색상: {order.orderProducts[0].color}</Option>
                        <Price><span>{order.orderProducts[0].price}</span> | {order.orderProducts[0].count}개</Price>
                      </BP>
                    </ReactionSubDetail>
                    <Btns>
                      <CancleBtn>주문취소</CancleBtn>
                    </Btns>
                  </Detail>
                  <ReactionSpace>
                    <ReactionReviewBtn>주문취소</ReactionReviewBtn>
                  </ReactionSpace>
                </Content>
                <ThickHr />
                <DetailContent>
                  <PurchaseAll />
                </DetailContent>
              <Hr />
              </Ordercontainter>
              ))}
          <PaginationContainer>
              <Pagination>
                <li><PageButton className="prev" title="previous page">&#10094;</PageButton></li>
                <li>
                  <PageButton onClick={pageClick} title="first page - page 1">1</PageButton>
                </li>
                <li>
                  <PageButton onClick={pageClick}>2</PageButton>
                </li>
                <li>
                  <PageButton onClick={pageClick} className="active" title="current page - page 9">3</PageButton>
                </li>
                <li>
                  <PageButton onClick={pageClick}>4</PageButton>
                </li>
                <li>
                  <PageButton onClick={pageClick}>5</PageButton>
                </li>
                <li><PageButton className="next" title="next page">&#10095;</PageButton></li>
              </Pagination>
            </PaginationContainer>
        </Container>
      )}
    </>
  );
};

export default PurchaseList;
