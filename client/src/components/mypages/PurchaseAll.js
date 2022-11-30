import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PostReview from "./PostReview";
import { getMyOrder } from "../../reduxstore/slices/myOrderSlice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
const ProductContainer = styled.div``;

const AllOrderTitle = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 30px;
`;

//상단
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 390px) {
    margin: 3px 10px;
  }
`;
const SubTop = styled.h2`
  font-weight: 600;
  font-size: 1rem;
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
`;

const Hr = styled.hr`
  height: 2px;
  border: none;
  background-color: var(--color-center-line);
  margin: 5px 0;
`;

//콘텐츠
const Content = styled.div`
  display: flex;
  flex-direction: column;
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
  @media screen and (max-width: 390px) {
    flex-direction: column;
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 10px;
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
    flex-direction: row;
    justify-content: flex-start;
  }
`;
const BrandName = styled(Link)`
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 5px;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 390px) {
    font-weight: 300;
    font-size: 10px;
    margin-right: 5px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    font-weight: 500;
  }
`;
const Option = styled.h2`
  margin-top: 5px;
  font-size: 1em;
  color: #aaa;
`;
const Price = styled.h2`
  margin: 10px 0;
  font-size: 1rem;
  span {
    font-weight: 700;
  }
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
  &.hidden {
    display: none;
  }
  padding: 10px 30px;
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
    &.hidden {
      display: none;
    }
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

//결제정보
const PaymentTitle = styled.h2`
  font-weight: 600;
  margin-top: 50px;
`;
const PaySubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  width: 280px;
  @media screen and (max-width: 479px) {
    width: 90%;
  }
`;
const PaySubTitle = styled.h2`
  color: #aaaaaa;
`;
const PaySubContent = styled.h2``;
const PaymentContainer = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 1023px) {
    flex-direction: column;
  }
`;

const PurchaseAll = ({ getUserdata, click }) => {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const myOrderData = useSelector((state) => state.myorder.myorder.content);
  const filterData = myOrderData?.filter((order) => order.orderId == id);
  const filterProduct = filterData[0]?.orderProducts;
  console.log(filterData);
  const filterProductId = filterProduct[0]?.productId;
  const clickModal = () => {
    setIsModal(!isModal);
  };
  useEffect(() => {
    dispatch(getMyOrder(click));
  }, []);

  return (
    <>
      {isModal ? (
        <>
          <Container>
            <PostReview
              clickModal={clickModal}
              filterProductId={filterProductId}
              filterData={filterData}
            />
            {/* <PostReview clickModal={clickModal} /> */}
            <AllOrderTitle>주문상세정보</AllOrderTitle>
            <Top>
              <SubTop>
                {filterData[0].orderNumber}&nbsp;|&nbsp;
                {filterData[0].createdAt.slice(0, 10)}
              </SubTop>
            </Top>
            {filterProduct?.map((p, i) => (
              <ProductContainer key={i}>
                <Hr />
                <Content>
                  <Detail>
                    <ReactionSubDetail>
                      <Img src={p.img.fullPath} />
                      <BP>
                        <BrandName to={`/detail/${p.productId}`}>
                          [{p.brandName}] {p.title}
                        </BrandName>
                        <Option>색상: {p.color}</Option>
                        <Price>
                          <span>₩&nbsp;{p.price.toLocaleString("en-US")}</span>
                          &nbsp;|&nbsp;{p.count}개
                        </Price>
                      </BP>
                    </ReactionSubDetail>
                    <Btns>
                      <ReviewBtn
                        className={
                          filterData[0].status === "주문 취소" ? "hidden" : ""
                        }
                        onClick={clickModal}
                      >
                        리뷰작성
                      </ReviewBtn>
                    </Btns>
                  </Detail>
                  <ReactionSpace>
                    <ReactionReviewBtn
                      className={
                        filterData[0].status === "주문 취소" ? "hidden" : ""
                      }
                    >
                      구매후기
                    </ReactionReviewBtn>
                  </ReactionSpace>
                </Content>
                <PaymentTitle>결제정보</PaymentTitle>
                <Hr />
                <PaymentContainer>
                  <PaySubContainer>
                    <PaySubTitle>상품금액</PaySubTitle>
                    <PaySubContent>{}원</PaySubContent>
                  </PaySubContainer>
                  <PaySubContainer>
                    <PaySubTitle>선불배송비</PaySubTitle>
                    <PaySubContent>(+) 0원</PaySubContent>
                  </PaySubContainer>
                  <PaySubContainer>
                    <PaySubTitle>결제금액</PaySubTitle>
                    <PaySubContent>26,800원</PaySubContent>
                  </PaySubContainer>
                </PaymentContainer>
              </ProductContainer>
            ))}
          </Container>
        </>
      ) : (
        <>
          <Container>
            <AllOrderTitle>주문상세정보</AllOrderTitle>
            <Top>
              <SubTop>
                {filterData[0].orderNumber}&nbsp;|&nbsp;
                {filterData[0].createdAt.slice(0, 10)}
              </SubTop>
            </Top>
            {filterProduct?.map((p, i) => (
              <ProductContainer key={i}>
                <Hr />
                <Content>
                  <Detail>
                    <ReactionSubDetail>
                      <Img src={p.img.fullPath} />
                      <BP>
                        <BrandName to={`/detail/${p.productId}`}>
                          [{p.brandName}] {p.title}
                        </BrandName>
                        <Option>색상: {p.color}</Option>
                        <Price>
                          <span>₩&nbsp;{p.price.toLocaleString("en-US")}</span>
                          &nbsp;|&nbsp;{p.count}개
                        </Price>
                      </BP>
                    </ReactionSubDetail>
                    <Btns>
                      <ReviewBtn
                        className={
                          filterData[0].status === "주문 취소" ? "hidden" : ""
                        }
                        onClick={clickModal}
                      >
                        리뷰작성
                      </ReviewBtn>
                    </Btns>
                  </Detail>
                  <ReactionSpace>
                    <ReactionReviewBtn
                      className={
                        filterData[0].status === "주문 취소" ? "hidden" : ""
                      }
                    >
                      구매후기
                    </ReactionReviewBtn>
                  </ReactionSpace>
                </Content>
              </ProductContainer>
            ))}
            <PaymentTitle>결제정보</PaymentTitle>
            <Hr />
            <PaymentContainer>
              <PaySubContainer>
                <PaySubTitle>상품금액</PaySubTitle>
                <PaySubContent>26,800원</PaySubContent>
              </PaySubContainer>
              <PaySubContainer>
                <PaySubTitle>선불배송비</PaySubTitle>
                <PaySubContent>(+) 0원</PaySubContent>
              </PaySubContainer>
              <PaySubContainer>
                <PaySubTitle>결제금액</PaySubTitle>
                <PaySubContent>26,800원</PaySubContent>
              </PaySubContainer>
            </PaymentContainer>
          </Container>
        </>
      )}
    </>
  );
};

export default PurchaseAll;
