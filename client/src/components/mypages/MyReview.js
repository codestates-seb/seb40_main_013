import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReview,
  getAllReview,
} from "../../reduxstore/slices/reviewSlice";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { renderStar } from "../Star";
import ScrollToTop from "../ScrollToTop";

function MyReview() {
  const dispatch = useDispatch();
  const userWriteReviews = useSelector(
    (state) => state?.review.review?.content
  );
  const userWriteReviewsPage = useSelector(
    (state) => state?.review.review.pageInfo
  );
  const [isClick, setIsClick] = useState(1);
  console.log(userWriteReviews);
  let list = [];

  for (let i = 1; i <= userWriteReviewsPage?.totalPages; i++) {
    list.push(<span>{i}</span>);
  }

  const clickPage = (number) => {
    setIsClick(number);
  };
  console.log(isClick);
  const clickDelete = (productId, reviewId) => {
    let deleteData = {
      productId: productId,
      reviewId: reviewId,
    };
    dispatch(deleteReview({ deleteData }));
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(getAllReview(isClick));
  }, [isClick]);

  return (
    <Container>
      <Hr />
      {userWriteReviews?.map((data, idx) => (
        <Ordercontainter key={data?.reviewId}>
          <Top>
            <SubTop>
              {new Date(data.createdAt).getFullYear() +
                "." +
                [new Date(data.createdAt).getMonth() + 1] +
                "." +
                new Date(data.createdAt).getDate()}
            </SubTop>
          </Top>
          <Content>
            <Detail>
              <ReactionSubDetail>
                {data?.img ? <Img src={data?.img.fullPath}></Img> : <Img></Img>}
                <BP>
                  <BrandName to={`/detail/${data?.productId}`}>
                    {data?.productTitle}
                  </BrandName>
                  {renderStar(data?.score)}
                  <Option>{data?.content}</Option>
                </BP>
              </ReactionSubDetail>
              <Btns>
                <CancleBtn>수정하기</CancleBtn>
                <CancleBtn>삭제하기</CancleBtn>
              </Btns>
            </Detail>
            <ReactionSpace>
              <ReactionReviewBtn></ReactionReviewBtn>
            </ReactionSpace>
          </Content>
          <Hr />
        </Ordercontainter>
      ))}
    </Container>
  );
}

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
  margin: 10px 15px;
  @media screen and (max-width: 390px) {
    margin: 7px 10px;
  }
`;
const SubTop = styled.h2`
  font-weight: 600;
  font-size: 1.1rem;
  color: #272727;
  .orderStatus {
    color: #ffaf51;
  }
  .ordercancle {
    color: red;
  }
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    font-size: 2.2vw;
    font-weight: 500;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.6vw;
    font-weight: 500;
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
`;

const Img = styled.img`
  width: 130px;
  height: 130px;
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
    justify-content: center;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    justify-content: center;
    margin-left: 0;
  }
`;
const BrandName = styled(Link)`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 5px;
  &:hover {
    color: #515151;
  }
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
  color: white;
  background-color: var(--color-navy);
  border-radius: 10px;
  white-space: nowrap;
  &:nth-child(1) {
    margin-bottom: 10px;
  }
  cursor: pointer;
  &:hover {
    /* background-color: red;
    color: white; */
    color: var(--color-navy);
    background-color: white;
    border: 1px solid #aaaaaa;
  }
  @media screen and (max-width: 479px) {
    display: none;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 8px 30px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 8px 26px;
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
  &:hover {
    cursor: pointer;
    background-color: #aaa;
    border-radius: 50%;
    color: white;
  }
`;

export default MyReview;
