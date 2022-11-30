import React from "react";
import styled from "styled-components/macro";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { renderStar } from "../../components/Star";
import noImg from "../../imgs/noImg.gif";

function Review({ articlesDetail, reviewRef }) {
  console.log(articlesDetail);
  const reviewLength = articlesDetail?.reviews?.length;
  console.log(articlesDetail?.reviews);
  return (
    <ReviewWrapper ref={reviewRef}>
      <ReviewTitle>상품 후기 ( {reviewLength}건 )</ReviewTitle>
      <ReviewStarSpace>
        {renderStar(articlesDetail?.score)}
        <ReviewStaAverage>
          평균 별점<ReviewNumber> {articlesDetail?.score}</ReviewNumber>점
        </ReviewStaAverage>
      </ReviewStarSpace>
      <Boundary />
      {articlesDetail?.reviews
        ?.map((data, idx) => (
          <ReviewContentsSpace key={data.reviewId}>
            <ReviewContentsLeftSpace>
              <ReviewContentsNumber>{idx + 1}</ReviewContentsNumber>
              {data?.img ? (
                <ReviewContentsImg src={data?.img.fullPath}></ReviewContentsImg>
              ) : (
                <ReviewContentsImg src={noImg}></ReviewContentsImg>
              )}
              <ReviewContentsMainSpace>
                {renderStar(data.score)}
                <ReviewMainTitle>{data.title}</ReviewMainTitle>
                <ReviewMainContent>{data.content}</ReviewMainContent>
              </ReviewContentsMainSpace>
            </ReviewContentsLeftSpace>
            <ReviewContentsRightSpace>
              <ReviewContentsUser>{data.nickname}</ReviewContentsUser>
              <ReviewContentsUser>
                {new Date(data.createdAt).getFullYear() +
                  "." +
                  [new Date(data.createdAt).getMonth() + 1] +
                  "." +
                  new Date(data.createdAt).getDate()}
              </ReviewContentsUser>
            </ReviewContentsRightSpace>
          </ReviewContentsSpace>
        ))
        .reverse()}

      <Boundary />
      <ReviewPageNationSpace>
        <ButtonIcon>
          <BiChevronLeft />
        </ButtonIcon>
        <div>1</div>
        <ButtonIcon>
          <BiChevronRight />
        </ButtonIcon>
      </ReviewPageNationSpace>
    </ReviewWrapper>
  );
}

const ReviewWrapper = styled.div`
  scroll-margin-top: 130px;
  width: 100%;
  height: 100%;
  border: 1px solid red;
  @media screen and (max-width: 1024px) {
    width: 70%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }
`;
const ReviewTitle = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-navy);
  font-weight: bolder;
  font-size: 20px;
  margin-top: 20px;
`;
const ReviewStarSpace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ReviewStaAverage = styled.div`
  margin: 10px 0px;
`;
const ReviewNumber = styled.span`
  color: var(--color-star);
  margin-bottom: 10px;
`;
const Boundary = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0px;
  background-color: var(--color-gray);
`;

const ReviewContentsSpace = styled.div`
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
`;
const ReviewContentsLeftSpace = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 400px) {
    margin-left: 10px;
  }
`;
const ReviewContentsMainSpace = styled.div`
  width: 68%;
  height: 70px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 400px) {
    margin-left: 15px;
  }
`;
const ReviewContentsNumber = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ReviewContentsImg = styled.img`
  width: 80px;
  height: 90px;
  margin: 0px 20px;
`;

const ReviewMainTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
`;

const ReviewMainContent = styled.div`
  font-size: 10px;
  margin-top: 5px;
  @media screen and (max-width: 400px) {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    height: 3em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 0.5rem;
  }
`;

const ReviewContentsRightSpace = styled.div`
  width: 30%;
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const ReviewContentsUser = styled.div`
  font-size: var(--font-smallsize);
  font-weight: bolder;
  @media screen and (max-width: 400px) {
    &:nth-child(2) {
      display: none;
    }
  }
`;
const ReviewPageNationSpace = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonIcon = styled.button`
  font-size: 20px;
  border: none;
  background-color: white;
`;

export default Review;
