import React, { useRef, useState } from "react";
import styled from "styled-components";
import { postReview } from "../../reduxstore/slices/reviewSlice";
import { useDispatch, useSelector } from "react-redux";

function PostReview({ clickModal }) {
  const dispatch = useDispatch();
  const [userWriteImg, setUserWriteImg] = useState("");
  const [userWriteContent, setUserWriteContent] = useState("");
  const [userWriteScroe, setUserWriteScroe] = useState("");
  const fileInput = useRef();

  const changeImg = (e) => {
    e.preventDefault();
    if (e.target.files) {
      let uploadFile = e.target.files[0];
      console.log(uploadFile);
      setUserWriteImg(uploadFile);
    }
  };
  console.log(userWriteImg);
  const changeContent = (e) => {
    setUserWriteContent(e.target.value);
  };
  const changeScore = (e) => {
    setUserWriteScroe(e.target.value);
  };
  const postSubmit = (e) => {
    e.preventDefault();
    let postData = {
      content: userWriteContent,
      score: userWriteScroe,
      img: userWriteImg,
    };
    dispatch(postReview(postData));
  };
  console.log(userWriteImg);
  return (
    <Container>
      <PostReviewTopSpace>
        <PostReviewContentTopSpace>
          <PostReviewContentTop>상품번호 830495</PostReviewContentTop>
          <PostReviewContentTop>구매일자 2022.01.11</PostReviewContentTop>
          <PostReviewContentTop onClick={clickModal}>X</PostReviewContentTop>
        </PostReviewContentTopSpace>
        <PostReviewContentDownSpace>
          <PostReviewContentImg />
          <PostReviewContentNameSpace>
            <PostReviewContentTitle>브랜드명</PostReviewContentTitle>
            <PostReviewTopContent>두닷</PostReviewTopContent>
          </PostReviewContentNameSpace>
          <PostReviewContentNameSpace>
            <PostReviewContentTitle>상품이름</PostReviewContentTitle>
            <PostReviewTopContent>화장대</PostReviewTopContent>
          </PostReviewContentNameSpace>
          <PostReviewContentNameSpace>
            <PostReviewContentTitle>갯수</PostReviewContentTitle>
            <PostReviewTopContent>1</PostReviewTopContent>
          </PostReviewContentNameSpace>
        </PostReviewContentDownSpace>
      </PostReviewTopSpace>
      <PostReviewDownSpace>
        <PostReviewDownTitle>리뷰 내용</PostReviewDownTitle>
        <PostReviewDownInput
          placeholder="리뷰의 내용을 입력해주세요!"
          onChange={changeContent}
        />
        <PostReviewDownTitle>리뷰 별점</PostReviewDownTitle>
        <PostReviewDownInput
          placeholder="리뷰의 별점을 입력해주세요!"
          onChange={changeScore}
        />
        <input
          type="file"
          ref={fileInput}
          accept="image/*"
          onChange={changeImg}
        />
        <PostReviewDownBtn onClick={postSubmit}>추가 버튼</PostReviewDownBtn>
      </PostReviewDownSpace>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 60%;
  border: 3px solid blue;
  position: fixed;
  background-color: white;
`;

const PostReviewTopSpace = styled.div`
  width: 70%;
  height: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PostReviewContentTopSpace = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-gray);
`;
const PostReviewContentTop = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  width: 25%;
  &:nth-child(3) {
    width: 15px;
    margin-left: 17vw;
  }
`;
const PostReviewContentDownSpace = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-gray);
`;
const PostReviewContentImg = styled.img`
  width: 15%;
  height: 17vh;
  margin-left: 20px;
`;
const PostReviewContentNameSpace = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PostReviewContentTitle = styled.div`
  font-size: 15px;
  font-weight: bolder;
`;
const PostReviewTopContent = styled.div`
  font-size: 15px;
  color: #ffaf51;
  margin-top: 20px;
`;

const PostReviewDownSpace = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
`;

const PostReviewDownTitle = styled.div`
  font-size: 15px;
  margin-top: 10px;
  &:nth-child(1) {
    margin-top: 15px;
  }
`;
const PostReviewDownInput = styled.input`
  width: 30%;
  height: 25px;
  margin-top: 10px;
`;
const PostReviewDownBtn = styled.button`
  margin-top: 10px;
  width: 30%;
  height: 30px;
  border-radius: 5px;
  color: white;
  background-color: var(--color-navy);
`;

export default PostReview;
