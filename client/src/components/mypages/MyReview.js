import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReview,
  getAllReview,
} from "../../reduxstore/slices/reviewSlice";
import styled from "styled-components";
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
      {userWriteReviews?.map((data, idx) => (
        <ReviewContentsSpace key={data?.reviewId}>
          <ReviewContentsLeftSpace>
            <ReviewContentsNumber>{idx + 1}</ReviewContentsNumber>
            {data?.img ? (
              <ReviewContentsImg src={data?.img.fullPath}></ReviewContentsImg>
            ) : (
              <ReviewContentsImg></ReviewContentsImg>
            )}
            <ReviewContentsMainSpace>
              {renderStar(data?.score)}
              <ReviewMainTitle>{data?.productTitle}</ReviewMainTitle>
              <ReviewMainContent>{data?.content}</ReviewMainContent>
            </ReviewContentsMainSpace>
          </ReviewContentsLeftSpace>
          <ReviewContentsRightSpace>
            <ReviewContentsSmallBtnSpace>
              <ReviewContentsBtnSpace>
                <ReviewContentsBtn>수정</ReviewContentsBtn>
                <ReviewContentsBtn
                  onClick={() => clickDelete(data?.productId, data?.reviewId)}
                >
                  삭제
                </ReviewContentsBtn>
              </ReviewContentsBtnSpace>
              <ReviewContentsUser>
                {new Date(data.createdAt).getFullYear() +
                  "." +
                  [new Date(data.createdAt).getMonth() + 1] +
                  "." +
                  new Date(data.createdAt).getDate()}
              </ReviewContentsUser>
            </ReviewContentsSmallBtnSpace>
          </ReviewContentsRightSpace>
        </ReviewContentsSpace>
      ))}
      <PageNationSpace>
        {list?.map((data) => (
          <PageNationBtn1
            key={data.props.children}
            onClick={() => clickPage(data.props.children)}
          >
            {data.props.children}
          </PageNationBtn1>
        ))}
      </PageNationSpace>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 20px;
  width: 80%;
  border: 1px solid var(--color-center-line);
`;
const ReviewContentsSpace = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ReviewStar = styled.div`
  color: var(--color-star);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 90px;
`;
const ReviewContentsLeftSpace = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const ReviewContentsMainSpace = styled.div`
  width: 78%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ReviewContentsNumber = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ReviewContentsImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const ReviewMainTitle = styled.div`
  font-weight: bold;
  font-size: 12px;
  margin-top: 10px;
`;

const ReviewMainContent = styled.div`
  font-size: 10px;
  margin-top: 15px;
`;

const ReviewContentsRightSpace = styled.div`
  width: 25%;
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const ReviewContentsUser = styled.div`
  font-size: var(--font-smallsize);
  font-weight: bolder;
`;

const ReviewContentsSmallBtnSpace = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
  width: 70px;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ReviewContentsBtnSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  position: absolute;
  top: 0px;
`;
const ReviewContentsBtn = styled.button`
  border-radius: 5px;
  background-color: white;
  font-size: 10px;
  margin-right: 5px;
`;
const PageNationSpace = styled.span`
  width: 98%;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const PageNationBtn1 = styled.button`
  width: 30px;
  height: 30px;
  margin: 0px 5px;
  border: none;
  background-color: white;
  &:hover {
    cursor: pointer;
    background-color: #aaaaaa;
    border-radius: 50%;
  }
`;

export default MyReview;
