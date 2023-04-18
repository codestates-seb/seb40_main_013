import React, { useState, useEffect } from "react";
import * as Style from "../../styles/mypage/PurchaseDetailStyle";
import PostReview from "./PostReview";
import { filterMyOrder } from "../../reduxstore/slices/myOrderSlice";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../reduxstore/hooks";

const PurchaseAll = () => {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const filterData = useAppSelector((state) => state.myorder.filterorder);
  const filterProduct = useAppSelector((state) => state.myorder.filterorder.orderProducts);

  const priceMap = filterProduct?.map((p) => p.price * p.count);
  const price = priceMap?.reduce((acc: number, cur: number) => acc + cur, 0);
  const [filterItem, setFilterItem] = useState("");

  const clickModal = (id) => {
    const filterItem = filterProduct.filter((el) => el.productId === id);
    setFilterItem(filterItem);
    setIsModal(!isModal);
  };

  useEffect(() => {
    void dispatch(filterMyOrder(id));
  }, []);

  return (
    <>
      {isModal ? (
        <>
          <Style.Container onClick={clickModal}>
            <PostReview clickModal={clickModal} onClick={(e) => e.preventDefault} filterData={filterItem} />
            <Style.AllOrderTitle>주문상세정보</Style.AllOrderTitle>
            <Style.Top>
              <Style.SubTop>
                {filterData.orderNumber}&nbsp;|&nbsp;
                {filterData.createdAt?.slice(0, 10)}
              </Style.SubTop>
            </Style.Top>
            {filterProduct?.map((p, i) => (
              <Style.ProductContainer key={i}>
                <Style.Hr />
                <Style.Content>
                  <Style.Detail>
                    <Style.ReactionSubDetail>
                      <Style.Img src={p.img.fullPath} />
                      <Style.BP>
                        <Style.ReactionNameOption>
                          <Style.BrandName to={`/detail/${p.productId}`}>
                            [{p.brandName}] {p.title}
                          </Style.BrandName>
                          <Style.Option>색상: {p.color}</Style.Option>
                        </Style.ReactionNameOption>
                        <Style.Price>
                          <span>₩&nbsp;{p.price.toLocaleString("en-US")}</span>
                          &nbsp;|&nbsp;{p.count}개
                        </Style.Price>
                      </Style.BP>
                    </Style.ReactionSubDetail>
                    <Style.Btns>
                      <Style.ReviewBtn className={filterData.status === "주문 취소" ? "hidden" : ""} onClick={clickModal}>
                        리뷰작성
                      </Style.ReviewBtn>
                    </Style.Btns>
                  </Style.Detail>
                  <Style.ReactionSpace>
                    <Style.ReactionReviewBtn className={filterData.status === "주문 취소" ? "hidden" : ""}>구매후기</Style.ReactionReviewBtn>
                  </Style.ReactionSpace>
                </Style.Content>
              </Style.ProductContainer>
            ))}
            <Style.PaymentTitle>결제정보</Style.PaymentTitle>
            <Style.Hr />
            <Style.PaymentContainer>
              <Style.PaySubContainer>
                <Style.PaySubTitle>상품금액</Style.PaySubTitle>
                <Style.PaySubContent>{price?.toLocaleString("en-US")}&nbsp;원</Style.PaySubContent>
              </Style.PaySubContainer>
              <Style.PaySubContainer>
                <Style.PaySubTitle>선불배송비</Style.PaySubTitle>
                <Style.PaySubContent>(+) 0&nbsp;원</Style.PaySubContent>
              </Style.PaySubContainer>
              <Style.PaySubContainer>
                <Style.PaySubTitle>결제금액</Style.PaySubTitle>
                <Style.PaySubContent>{price?.toLocaleString("en-US")}&nbsp;원</Style.PaySubContent>
              </Style.PaySubContainer>
            </Style.PaymentContainer>
          </Style.Container>
        </>
      ) : (
        <>
          <Style.Container>
            <Style.AllOrderTitle>주문상세정보</Style.AllOrderTitle>
            <Style.Top>
              <Style.SubTop>
                {filterData.orderNumber}&nbsp;|&nbsp;
                {filterData.createdAt?.slice(0, 10)}
              </Style.SubTop>
            </Style.Top>
            {filterProduct?.map((p, i) => (
              <Style.ProductContainer key={i}>
                <Style.Hr />
                <Style.Content>
                  <Style.Detail>
                    <Style.ReactionSubDetail>
                      <Style.Img src={p.img.fullPath} />
                      <Style.BP>
                        <Style.ReactionNameOption>
                          <Style.BrandName to={`/detail/${p.productId}`}>
                            [{p.brandName}] {p.title}
                          </Style.BrandName>
                          <Style.Option>색상: {p.color}</Style.Option>
                        </Style.ReactionNameOption>
                        <Style.Price>
                          <span>₩&nbsp;{p.price.toLocaleString("en-US")}</span>
                          &nbsp;|&nbsp;{p.count}개
                        </Style.Price>
                      </Style.BP>
                    </Style.ReactionSubDetail>
                    <Style.Btns>
                      <Style.ReviewBtn
                        className={filterData.status === "주문 취소" ? "hidden" : ""}
                        onClick={() => {
                          clickModal(p.productId);
                        }}
                      >
                        리뷰작성
                      </Style.ReviewBtn>
                    </Style.Btns>
                  </Style.Detail>
                  <Style.ReactionSpace>
                    <Style.ReactionReviewBtn className={filterData.status === "주문 취소" ? "hidden" : ""}>구매후기</Style.ReactionReviewBtn>
                  </Style.ReactionSpace>
                </Style.Content>
              </Style.ProductContainer>
            ))}
            <Style.PaymentTitle>결제정보</Style.PaymentTitle>
            <Style.Hr />
            <Style.PaymentContainer>
              <Style.PaySubContainer>
                <Style.PaySubTitle>상품금액</Style.PaySubTitle>
                <Style.PaySubContent>{price?.toLocaleString("en-US")}&nbsp;원</Style.PaySubContent>
              </Style.PaySubContainer>
              <Style.PaySubContainer>
                <Style.PaySubTitle>선불배송비</Style.PaySubTitle>
                <Style.PaySubContent>(+) 0&nbsp;원</Style.PaySubContent>
              </Style.PaySubContainer>
              <Style.PaySubContainer>
                <Style.PaySubTitle>결제금액</Style.PaySubTitle>
                <Style.PaySubContent>{price?.toLocaleString("en-US")}&nbsp;원</Style.PaySubContent>
              </Style.PaySubContainer>
            </Style.PaymentContainer>
          </Style.Container>
        </>
      )}
    </>
  );
};

export default PurchaseAll;
