import React, { useState } from "react";
import styled from "styled-components/macro";
import PostReview from "./PostReview";

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

const PD = styled.div`
  display: flex;
  margin: 10px;
`;
const ProductStatus = styled.h2`
  font-weight: 700;
  font-size: 1rem;
  margin-right: 10px;
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
`;
const DelieveryStatus = styled.h2`
  font-weight: 700;
  font-size: 1rem;
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
const BrandName = styled.h4`
  font-weight: 700;
  font-size: 1.1rem;
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
const CancleBtn = styled.button`
  padding: 10px 30px;
  color: #002c6d;
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

//결제정보
const PaymentTitle = styled.h2`
  font-weight: 600;
  margin-top: 50px;
`;
const PaySubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  width: 300px;
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
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  width: 100vw;
`;

const PurchaseAll = ({ getUserdata, myOrderData, click }) => {
  const [isModal, setIsModal] = useState(false);

  const clickModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      {isModal ? (
        <>
          <Container>
            <PostReview clickModal={clickModal} />
            {/* <AllOrderTitle>주문상세정보</AllOrderTitle> */}
            <Top>
              <SubTop>830495 | 2022.01.11</SubTop>
            </Top>
            <Hr />
            <Content>
              <PD>
                <ProductStatus>구매확정</ProductStatus>
                <DelieveryStatus>도착완료</DelieveryStatus>
              </PD>
              <Detail>
                <ReactionSubDetail>
                  <Img />
                  <BP>
                    <BrandName>[두닷] 화장대</BrandName>
                    <Option>색상: white</Option>
                    <Price>
                      <span>13900</span> | 1개
                    </Price>
                  </BP>
                </ReactionSubDetail>
                <Btns>
                  <ReviewBtn onClick={clickModal}>리뷰작성</ReviewBtn>
                  <CancleBtn>주문취소</CancleBtn>
                </Btns>
              </Detail>
              <ReactionSpace>
                <ReactionReviewBtn>구매후기</ReactionReviewBtn>
              </ReactionSpace>
            </Content>
            <Hr />
            <Content>
              <PD>
                <ProductStatus>구매확정</ProductStatus>
                <DelieveryStatus>도착완료</DelieveryStatus>
              </PD>
              <Detail>
                <ReactionSubDetail>
                  <Img />
                  <BP>
                    <BrandName>[두닷] 화장대</BrandName>
                    <Option>색상: white</Option>
                    <Price>
                      <span>13900</span> | 1개
                    </Price>
                  </BP>
                </ReactionSubDetail>
                <Btns>
                  <ReviewBtn>리뷰작성</ReviewBtn>
                  <CancleBtn>주문취소</CancleBtn>
                </Btns>
              </Detail>
              <ReactionSpace>
                <ReactionReviewBtn>구매후기</ReactionReviewBtn>
              </ReactionSpace>
            </Content>
            <Hr />
            <Content>
              <PD>
                <ProductStatus>구매확정</ProductStatus>
                <DelieveryStatus>도착완료</DelieveryStatus>
              </PD>
              <Detail>
                <ReactionSubDetail>
                  <Img />
                  <BP>
                    <BrandName>[두닷] 화장대</BrandName>
                    <Option>색상: white</Option>
                    <Price>
                      <span>13900</span> | 1개
                    </Price>
                  </BP>
                </ReactionSubDetail>
                <Btns>
                  <ReviewBtn>리뷰작성</ReviewBtn>
                  <CancleBtn>주문취소</CancleBtn>
                </Btns>
              </Detail>
              <ReactionSpace>
                <ReactionReviewBtn>구매후기</ReactionReviewBtn>
              </ReactionSpace>
            </Content>
            {/* <PaymentTitle>결제정보</PaymentTitle>
    <Hr /> */}
            {/* <PaymentContainer>
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
    </PaymentContainer> */}
          </Container>
        </>
      ) : (
        <>
          <Container>
            {/* <AllOrderTitle>주문상세정보</AllOrderTitle> */}
            <Top>
              <SubTop>830495 | 2022.01.11</SubTop>
            </Top>
            <Hr />
            <Content>
              <PD>
                <ProductStatus>구매확정</ProductStatus>
                <DelieveryStatus>도착완료</DelieveryStatus>
              </PD>
              <Detail>
                <ReactionSubDetail>
                  <Img />
                  <BP>
                    <BrandName>[두닷] 화장대</BrandName>
                    <Option>색상: white</Option>
                    <Price>
                      <span>13900</span> | 1개
                    </Price>
                  </BP>
                </ReactionSubDetail>
                <Btns>
                  <ReviewBtn onClick={clickModal}>리뷰작성</ReviewBtn>
                  <CancleBtn>주문취소</CancleBtn>
                </Btns>
              </Detail>
              <ReactionSpace>
                <ReactionReviewBtn>구매후기</ReactionReviewBtn>
              </ReactionSpace>
            </Content>
            <Hr />
            {/* <Content>
              <PD>
                <ProductStatus>구매확정</ProductStatus>
                <DelieveryStatus>도착완료</DelieveryStatus>
              </PD>
              <Detail>
                <ReactionSubDetail>
                  <Img />
                  <BP>
                    <BrandName>[두닷] 화장대</BrandName>
                    <Option>색상: white</Option>
                    <Price>
                      <span>13900</span> | 1개
                    </Price>
                  </BP>
                </ReactionSubDetail>
                <Btns>
                  <ReviewBtn clickModal={clickModal}>리뷰작성</ReviewBtn>
                  <CancleBtn>주문취소</CancleBtn>
                </Btns>
              </Detail>
              <ReactionSpace>
                <ReactionReviewBtn>구매후기</ReactionReviewBtn>
              </ReactionSpace>
            </Content>
            <Hr />
            <Content>
              <PD>
                <ProductStatus>구매확정</ProductStatus>
                <DelieveryStatus>도착완료</DelieveryStatus>
              </PD>
              <Detail>
                <ReactionSubDetail>
                  <Img />
                  <BP>
                    <BrandName>[두닷] 화장대</BrandName>
                    <Option>색상: white</Option>
                    <Price>
                      <span>13900</span> | 1개
                    </Price>
                  </BP>
                </ReactionSubDetail>
                <Btns>
                  <ReviewBtn clickModal={clickModal}>리뷰작성</ReviewBtn>
                  <CancleBtn>주문취소</CancleBtn>
                </Btns>
              </Detail>
              <ReactionSpace>
                <ReactionReviewBtn>구매후기</ReactionReviewBtn>
              </ReactionSpace>
            </Content> */}
            {/* <PaymentTitle>결제정보</PaymentTitle>
    <Hr /> */}
            {/* <PaymentContainer>
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
    </PaymentContainer> */}
          </Container>
        </>
      )}
    </>
  );
};

export default PurchaseAll;
