import React, { useState, useEffect, useCallback, useRef } from "react";
import * as Style from "../../styles/mypage/PurchaseDetailStyle";
import PostReview from "./PostReview";
import { filterMyOrder } from "../../reduxstore/slices/myOrderSlice";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../reduxstore/hooks";

interface Img {
  fileName: string;
  fullPath: string;
}
interface Product {
  brandName: string;
  color: string;
  count: number;
  img: Img;
  price: number;
  productId: number;
  title: string;
}

const PurchaseAll = () => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const filterData = useAppSelector((state) => state.myorder.filterorder);
  const filterProduct = useAppSelector((state) => state.myorder.filterorder.orderProducts);
  const [filterItem, setFilterItem] = useState("");
  console.log(filterData);
  const priceMap = filterProduct?.map((p: Product) => p.price * p.count);
  const price = priceMap?.reduce((acc: number, cur: number) => acc + cur, 0);

  const clickModal = useCallback(
    (id: number) => {
      const filterI = filterProduct?.filter((el: Product) => el.productId === id);
      setFilterItem(filterI);
      setIsModal(!isModal);
    },
    [filterProduct, isModal],
  );

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (isModal && modalRef.current !== null && !modalRef.current.contains(e.target as Node)) {
        setIsModal(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isModal]);

  useEffect(() => {
    void dispatch(filterMyOrder({ id }));
  }, []);

  return (
    <>
      <Style.Container>
        {isModal && <PostReview clickModal={clickModal} modalRef={modalRef} filterData={filterItem} filteReview={null} />}
        <Style.AllOrderTitle>주문상세정보</Style.AllOrderTitle>
        <Style.Top>
          <Style.SubTop>
            {filterData.orderNumber}&nbsp;|&nbsp;
            {filterData.createdAt?.slice(0, 10)}
          </Style.SubTop>
        </Style.Top>
        {filterProduct?.map((p: Product, i: number) => (
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
  );
};

export default PurchaseAll;
