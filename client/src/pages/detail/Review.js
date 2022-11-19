import React from "react";
import styled from "styled-components/macro";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { renderStar } from "../../components/Star";

function Review({ articlesDetail }) {
  return (
    <ReviewWrapper>
      <ReviewTitle>상품 후기 ( OO건 )</ReviewTitle>
      <ReviewStarSpace>
        <ReviewStar>
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
        </ReviewStar>
        <ReviewStaAverage>
          평균 별점<ReviewNumber> 5</ReviewNumber>점
        </ReviewStaAverage>
      </ReviewStarSpace>
      <Boundary />

      {articlesDetail?.reviews?.map((data) => (
        <ReviewContentsSpace key={data.reviewId}>
          <ReviewContentsLeftSpace>
            <ReviewContentsNumber>{data.reviewId}</ReviewContentsNumber>
            {/* <ReviewContentsImg src={data.img}></ReviewContentsImg> */}
            <ReviewContentsMainSpace>
              {renderStar(data.score)}
              <ReviewMainTitle>{data.title}</ReviewMainTitle>
              <ReviewMainContent>{data.content}</ReviewMainContent>
            </ReviewContentsMainSpace>
          </ReviewContentsLeftSpace>
          <ReviewContentsRightSpace>
            <ReviewContentsUser>사용자</ReviewContentsUser>
            <ReviewContentsUser>
              {new Date(data.createdAt).getFullYear() +
                "." +
                [new Date(data.createdAt).getMonth() + 1] +
                "." +
                new Date(data.createdAt).getDate()}
            </ReviewContentsUser>
          </ReviewContentsRightSpace>
        </ReviewContentsSpace>
      ))}

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
  width: 600px;
  height: 100%;
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
const ReviewStar = styled.div`
  color: var(--color-star);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 90px;
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
  height: 2px;
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
`;
const ReviewContentsMainSpace = styled.div`
  width: 68%;
  height: 70px;
  display: flex;
  flex-direction: column;
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
  margin-right: 20px;
`;

const ReviewMainTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
`;

const ReviewMainContent = styled.div`
  font-size: 10px;
  margin-top: 5px;
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
