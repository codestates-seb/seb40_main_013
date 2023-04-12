import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import PostReview from "./PostReview";
import { filterMyOrder } from "../../reduxstore/slices/myOrderSlice";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 40px;
  width: 75vw;
  @media screen and (max-width: 390px) {
    width: 88vw;
    padding: 0;
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

// 상단
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
  height: 1px;
  border: none;
  background-color: var(--color-center-line);
  margin: 5px 0;
`;

// 콘텐츠
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
  border-radius: 5px;
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
    width: 88vw;
    justify-content: space-between;
    padding-right: 10px;
    margin-top: 10px;
    margin-left: 0;
  }
`;
const ReactionNameOption = styled.div`
  display: flex;
  flex-direction: column;
`;
const BrandName = styled(Link)`
  font-weight: 600;
  font-size: 1rem;
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
  @media screen and (max-width: 390px) {
    font-size: 0.7rem;
  }
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
    white-space: nowrap;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    margin: 5px 0;
  }
`;
const Btns = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const ReviewBtn = styled.button`
  white-space: nowrap;
  &.hidden {
    display: none;
  }
  padding: 10px 30px;
  background-color: #002c6d;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #123b77;
  }
  @media screen and (max-width: 390px) {
    display: none;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    padding: 8px 30px;
  }
`;

// 반응형 구매후기
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

// 결제정보
const PaymentTitle = styled.h2`
  font-weight: 600;
  margin-top: 50px;
`;
const PaySubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;
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

const PurchaseAll = () => {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const filterData = useSelector((state) => state.myorder.filterorder);
  const filterProduct = useSelector((state) => state.myorder.filterorder.orderProducts);

  const priceMap = filterProduct?.map((p) => p.price * p.count);
  const price = priceMap?.reduce((acc, cur) => acc + cur);
  const [filterItem, setFilterItem] = useState("");

  const clickModal = (id) => {
    const filterItem = filterProduct.filter((el) => el.productId === id);
    setFilterItem(filterItem);
    setIsModal(!isModal);
  };

  useEffect(() => {
    dispatch(filterMyOrder(id));
  }, []);

  return (
    <>
      {isModal ? (
        <>
          <Container onClick={clickModal}>
            <PostReview clickModal={clickModal} onClick={(e) => e.preventDefault()} filterData={filterItem} />
            <AllOrderTitle>주문상세정보</AllOrderTitle>
            <Top>
              <SubTop>
                {filterData.orderNumber}&nbsp;|&nbsp;
                {filterData.createdAt?.slice(0, 10)}
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
                        <ReactionNameOption>
                          <BrandName to={`/detail/${p.productId}`}>
                            [{p.brandName}] {p.title}
                          </BrandName>
                          <Option>색상: {p.color}</Option>
                        </ReactionNameOption>
                        <Price>
                          <span>₩&nbsp;{p.price.toLocaleString("en-US")}</span>
                          &nbsp;|&nbsp;{p.count}개
                        </Price>
                      </BP>
                    </ReactionSubDetail>
                    <Btns>
                      <ReviewBtn className={filterData.status === "주문 취소" ? "hidden" : ""} onClick={clickModal}>
                        리뷰작성
                      </ReviewBtn>
                    </Btns>
                  </Detail>
                  <ReactionSpace>
                    <ReactionReviewBtn className={filterData.status === "주문 취소" ? "hidden" : ""}>구매후기</ReactionReviewBtn>
                  </ReactionSpace>
                </Content>
              </ProductContainer>
            ))}
            <PaymentTitle>결제정보</PaymentTitle>
            <Hr />
            <PaymentContainer>
              <PaySubContainer>
                <PaySubTitle>상품금액</PaySubTitle>
                <PaySubContent>{price?.toLocaleString("en-US")}&nbsp;원</PaySubContent>
              </PaySubContainer>
              <PaySubContainer>
                <PaySubTitle>선불배송비</PaySubTitle>
                <PaySubContent>(+) 0&nbsp;원</PaySubContent>
              </PaySubContainer>
              <PaySubContainer>
                <PaySubTitle>결제금액</PaySubTitle>
                <PaySubContent>{price?.toLocaleString("en-US")}&nbsp;원</PaySubContent>
              </PaySubContainer>
            </PaymentContainer>
          </Container>
        </>
      ) : (
        <>
          <Container>
            <AllOrderTitle>주문상세정보</AllOrderTitle>
            <Top>
              <SubTop>
                {filterData.orderNumber}&nbsp;|&nbsp;
                {filterData.createdAt?.slice(0, 10)}
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
                        <ReactionNameOption>
                          <BrandName to={`/detail/${p.productId}`}>
                            [{p.brandName}] {p.title}
                          </BrandName>
                          <Option>색상: {p.color}</Option>
                        </ReactionNameOption>
                        <Price>
                          <span>₩&nbsp;{p.price.toLocaleString("en-US")}</span>
                          &nbsp;|&nbsp;{p.count}개
                        </Price>
                      </BP>
                    </ReactionSubDetail>
                    <Btns>
                      <ReviewBtn className={filterData.status === "주문 취소" ? "hidden" : ""} onClick={() => clickModal(p.productId)}>
                        리뷰작성
                      </ReviewBtn>
                    </Btns>
                  </Detail>
                  <ReactionSpace>
                    <ReactionReviewBtn className={filterData.status === "주문 취소" ? "hidden" : ""}>구매후기</ReactionReviewBtn>
                  </ReactionSpace>
                </Content>
              </ProductContainer>
            ))}
            <PaymentTitle>결제정보</PaymentTitle>
            <Hr />
            <PaymentContainer>
              <PaySubContainer>
                <PaySubTitle>상품금액</PaySubTitle>
                <PaySubContent>{price?.toLocaleString("en-US")}&nbsp;원</PaySubContent>
              </PaySubContainer>
              <PaySubContainer>
                <PaySubTitle>선불배송비</PaySubTitle>
                <PaySubContent>(+) 0&nbsp;원</PaySubContent>
              </PaySubContainer>
              <PaySubContainer>
                <PaySubTitle>결제금액</PaySubTitle>
                <PaySubContent>{price?.toLocaleString("en-US")}&nbsp;원</PaySubContent>
              </PaySubContainer>
            </PaymentContainer>
          </Container>
        </>
      )}
    </>
  );
};

export default PurchaseAll;
