import React, { useEffect, useState } from "react";
import * as Style from "../../styles/mypage/LikeStyle";
import starimg from "../../imgs/star.png";
import { likeData } from "../../reduxstore/slices/likeSlice";
import Pagination from "./Pagination";
import { useAppSelector, useAppDispatch } from "../../reduxstore/hooks";
import { type ProductArgs } from "../../type";

const Like = () => {
  const dispatch = useAppDispatch();
  const likeProduct = useAppSelector((state) => state.like.like.content);
  // 페이지네이션
  const [curPage, setCurPage] = useState(0); // 현재페이지
  const [totalpage, setTotalpage] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    let count = 0;
    if (curPage > 0) {
      count = curPage - 1;
    } else {
      count = 0;
    }
    void dispatch(likeData({ count, setTotalpage }));
  }, [curPage]);

  return (
    <>
      {likeProduct?.length === 0 ? (
        <Style.NotContainer>
          <Style.NotIcon>!</Style.NotIcon>
          <Style.NotOrder>
            <span>좋아요</span>&nbsp;한 상품이 없습니다.
          </Style.NotOrder>
          <Style.ShowProduct to="/">상품 보러가기</Style.ShowProduct>
        </Style.NotContainer>
      ) : (
        <Style.Container>
          <Style.LikeTitle>내가 좋아하는 상품</Style.LikeTitle>
          <Style.ProductList>
            {likeProduct?.map((product: ProductArgs, i: number) => (
              <Style.Products key={i} to={`/detail/${product.id}`}>
                <Style.Imgbox>
                  <Style.Img src={product.img?.fullPath}></Style.Img>
                </Style.Imgbox>
                <Style.Detail>
                  <Style.SubDetail>
                    <Style.Brand>{product.nickname}</Style.Brand>
                    <Style.StarDetail>
                      <Style.Star src={starimg}></Style.Star>
                      <Style.StarAerage>{product.score}</Style.StarAerage>
                    </Style.StarDetail>
                  </Style.SubDetail>
                  <Style.Title>{product.title}</Style.Title>
                  <Style.SubDetail className="end">
                    <Style.Price>
                      <span className="won">₩</span>
                      &nbsp;{product.price?.toLocaleString("en-US")}
                    </Style.Price>
                  </Style.SubDetail>
                </Style.Detail>
              </Style.Products>
            ))}
          </Style.ProductList>
          <Style.PaginationContainer>
            <Pagination totalpage={totalpage} page={curPage} setPage={setCurPage} />
          </Style.PaginationContainer>
        </Style.Container>
      )}
    </>
  );
};
export default Like;
