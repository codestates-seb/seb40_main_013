import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReview } from "../../reduxstore/slices/reviewSlice";
import styled from "styled-components";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

function MyReview() {
  const dispatch = useDispatch();
  const userWriteReviews = useSelector((state) => state.review.review.content);
  useEffect(() => {
    dispatch(getAllReview());
  }, []);

  return (
    <Container>
      {userWriteReviews?.map((data) => (
        <ReviewContentsSpace key={data.reviewId}>
          <ReviewContentsLeftSpace>
            <ReviewContentsNumber>{data.reviewId}</ReviewContentsNumber>
            <ReviewContentsImg src={data.img}></ReviewContentsImg>
            <ReviewContentsMainSpace>
              <ReviewStar>
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
              </ReviewStar>
              <ReviewMainTitle>{data.productTitle}</ReviewMainTitle>
              <ReviewMainContent>{data.content}</ReviewMainContent>
            </ReviewContentsMainSpace>
          </ReviewContentsLeftSpace>
          <ReviewContentsRightSpace>
            <ReviewContentsUser>{data.productId}</ReviewContentsUser>
            <ReviewContentsBtnSpace>
              <div>
                <div></div>
                <div></div>
              </div>
              <ReviewContentsUser>2</ReviewContentsUser>
            </ReviewContentsBtnSpace>
          </ReviewContentsRightSpace>
        </ReviewContentsSpace>
      ))}
    </Container>
  );
}
const Container = styled.form`
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

const ReviewContentsBtnSpace = styled.div`
  display: flex;
`;

export default MyReview;
