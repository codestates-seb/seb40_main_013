import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import starimg from "../../imgs/star.png"
import { likeData } from "../../reduxstore/slices/likeSlice";
import Pagination from "./Pagination";

const Container =styled.div`
  /* border: 1px solid red; */
  width: 75%;
  padding: 2rem;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 2rem 0;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 2rem 0;
  }
`;
const LikeTitle = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  color: #272727;
  @media screen and (max-width: 479px) {
    padding-left: 1.5rem;
    font-size: 1.3rem;
    font-weight: 500;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding-left: 1.3rem;
  }  
  @media (min-width: 768px) and (max-width: 1023px) {
    padding-left: 1.5rem;
  }
`;
const ProductList = styled.div`
  width: 80%;
  margin: 10px 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media screen and (max-width: 479px) {
    width: 90vw;
    justify-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 95vw;
    justify-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 83vw;
    justify-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const Products = styled(Link)`
  width: 14vw;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 479px) {
    width: 35vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 30vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 17.5vw;
  }
`;
const Imgbox = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  &:hover img {
    object-fit: cover;
    transform: scale(1.3);
    transition: transform 1s;
  }
  @media screen and (max-width: 479px) {
    width: 34vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 16vw;
  }
`;
const Img = styled.img`
  width: 12vw;
  display: flex;
  border-radius: 5px;
  @media screen and (max-width: 479px) {
    width: 34vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 15vw;
  }
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 12vw;
  margin-top: 10px;
  @media screen and (max-width: 479px) {
    width: 33vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 15vw;
  }
`;
const Brand = styled.h5`
  color: var(--font-ligthblack);
  font-size: 0.8rem;
  font-weight: 300;
  @media screen and (max-width: 479px) {
    font-size: 0.8em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9em;
  }
`;
const Title = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1em;
  max-height: 2.2em;
  min-height: 2.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media screen and (max-width: 479px) {
    font-size: 0.8em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9em;
  }
`;
const Price = styled.h5`
  display: flex;
  justify-content: flex-end;
  padding: 5px 0;
  /* margin-right: 10px; */
  font-size: 1.3rem;
  font-weight: 700;
  @media screen and (max-width: 479px) {
    font-size: 1.1em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.2em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.2em;
  }
  .won{
    font-size: 0.9rem;
    display: flex;
    align-items: center;
  }
`;
const SubDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  &.end{
    justify-content: flex-end;
  }
`;
const StarDetail = styled.div`
  display: flex;
`;
const Star = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  @media screen and (max-width: 479px) {
    width: 10px;
    height: 10px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 10px;
    height: 10px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 12px;
    height: 12px;
  }
`;
const StarAerage = styled.div`
  display: flex;
  @media screen and (max-width: 479px) {
    font-size: 0.8em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.8em;
  }
`;

//페이지네이션
const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Like = () => {
  const dispatch = useDispatch();
  const likeProduct = useSelector((state)=> state.like.like.content);
  //페이지네이션
  const [curPage, setCurPage] = useState(0); //현재페이지
  const [totalpage, setTotalpage] = useState(0);
  console.log(curPage);

    useEffect(()=>{
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      dispatch(likeData({curPage, setTotalpage}))
    }, [curPage]);

  return (
    <Container>
      <LikeTitle>내가 좋아하는 상품</LikeTitle>
      <ProductList>
        {likeProduct?.map((product ,i)=>(
          <Products key={i} to={`/detail/${product.id}`}>
            <Imgbox>
              <Img src={product.img?.fullPath}></Img>
            </Imgbox>
            <Detail>
              <SubDetail>
                <Brand>{product.nickname}</Brand>
                <StarDetail>
                  <Star src={starimg}></Star>
                  <StarAerage>{product.score}</StarAerage>
                </StarDetail>
              </SubDetail>
              <Title>{product.title}</Title>
              <SubDetail className="end">
                <Price>
                  <span className="won">
                    ₩
                  </span>
                  &nbsp;{product.price?.toLocaleString("en-US")}</Price>
              </SubDetail>
            </Detail>
          </Products>
        ))}
      </ProductList>
      <PaginationContainer>
      <Pagination 
            totalpage={totalpage}
            page={curPage}
            setPage={setCurPage}
            />
      </PaginationContainer>
    </Container>
  );
};
export default Like;
