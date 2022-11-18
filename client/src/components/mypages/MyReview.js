import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReview } from "../../reduxstore/slices/reviewSlice";
import styled from "styled-components";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { postReview } from "../../reduxstore/slices/reviewSlice";
function MyReview() {
  const dispatch = useDispatch();
  const userWriteReviews = useSelector(
    (state) => state?.review.review?.content
  );
  const [userWriteTitle, setUserWriteTitle] = useState("");
  const [userWriteContent, setUserWriteContent] = useState("");
  const [userWriteScroe, setUserWriteScroe] = useState("");

  const changeTitle = (e) => {
    setUserWriteTitle(e.target.value);
  };
  const changeContent = (e) => {
    setUserWriteContent(e.target.value);
  };
  const changeScore = (e) => {
    setUserWriteScroe(e.target.value);
  };

  const postSubmit = (e) => {
    e.preventDefault();
    console.log(11);
    let postData = {
      title: userWriteTitle,
      content: userWriteContent,
      score: userWriteScroe,
    };
    dispatch(postReview({ postData }));
  };
  useEffect(() => {
    dispatch(getAllReview());
  }, []);

  return (
    <Container>
      {userWriteReviews?.map((data) => (
        <ReviewContentsSpace key={data?.reviewId}>
          <ReviewContentsLeftSpace>
            <ReviewContentsNumber>{data?.reviewId}</ReviewContentsNumber>
            <ReviewContentsImg src={data?.img}></ReviewContentsImg>
            <ReviewContentsMainSpace>
              <ReviewStar>
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
              </ReviewStar>
              <ReviewMainTitle>{data?.productTitle}</ReviewMainTitle>
              <ReviewMainContent>{data?.content}</ReviewMainContent>
            </ReviewContentsMainSpace>
          </ReviewContentsLeftSpace>
          <ReviewContentsRightSpace>
            <ReviewContentsUser>{data?.productId}</ReviewContentsUser>
            <ReviewContentsSmallBtnSpace>
              <ReviewContentsBtnSpace>
                <div>수정</div>
                <div>삭제</div>
              </ReviewContentsBtnSpace>
              <ReviewContentsUser>2</ReviewContentsUser>
            </ReviewContentsSmallBtnSpace>
          </ReviewContentsRightSpace>
        </ReviewContentsSpace>
      ))}
      {/* <div>
        <input onChange={changeTitle} />
        <input onChange={changeContent} />
        <input onChange={changeScore} />
        <button
          style={{ width: "30px", height: "50px" }}
          onClick={postSubmit}
        />
      </div> */}
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

const ReviewContentsSmallBtnSpace = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const ReviewContentsBtnSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid red;
`;
export default MyReview;
