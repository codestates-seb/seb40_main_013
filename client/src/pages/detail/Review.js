import React from "react";
import styled from "styled-components/macro";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { renderStar } from "../../components/Star";
import noImg from "../../imgs/noImg.gif";

function Review({ articlesDetail, reviewRef }) {
  const reviewLength = articlesDetail?.reviews?.length;
  return (
    <ReviewWrapper ref={reviewRef}>
      <ReviewTitle>상품 후기 ( {reviewLength}건 )</ReviewTitle>
      <ReviewStarSpace>
        {renderStar(articlesDetail?.score)}
        <ReviewStaAverage>
          평균 별점&nbsp;
          <ReviewNumber> {articlesDetail?.score}&nbsp;</ReviewNumber>점
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
            </ReviewContentsLeftSpace>
            <ReviewContent>
              <ReviewContentsMainSpace>
                {renderStar(data.score)}
                <ReviewMainTitle>{data.title}</ReviewMainTitle>
                <ReviewMainContent>{data.content}</ReviewMainContent>
              </ReviewContentsMainSpace>
              <ReviewContentsRightSpace>
                <ReviewContentsUser className="reviewName">
                  {data.nickname}
                </ReviewContentsUser>
                <ReviewContentsUser>
                  {new Date(data.createdAt).getFullYear() +
                    "." +
                    [new Date(data.createdAt).getMonth() + 1] +
                    "." +
                    new Date(data.createdAt).getDate()}
                </ReviewContentsUser>
              </ReviewContentsRightSpace>
            </ReviewContent>
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
  width: 85%;
  height: 100%;
  @media screen and (max-width: 1024px) {
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
  margin-bottom: 20px;
  @media screen and (max-width: 400px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const ReviewContentsLeftSpace = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 400px) {
    margin-left: 10px;
  }
`;
const ReviewContentsMainSpace = styled.div`
  width: 68%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 400px) {
    margin-left: 15px;
    display: flex;
    align-items: center;
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
  height: 80px;
  margin: 0px 20px;
  @media screen and (max-width: 520px) {
    width: 60px;
    height: 80%;
  }
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
    display: none;
  }
`;
const ReviewContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 100%;

  @media screen and (max-width: 800px) {
    max-width: 77%;
    display: flex;
  }
  @media screen and (max-width: 720px) {
    width: 70%;
    height: 80%;
    display: flex;
    align-items: center;
  }
  @media screen and (max-width: 500px) {
    width: 70%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 320px;
  }
`;

const ReviewContentsRightSpace = styled.div`
  width: 70%;
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 400px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const ReviewContentsUser = styled.div`
  font-size: var(--font-smallsize);
  font-weight: bolder;
  margin-left: 10px;
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
