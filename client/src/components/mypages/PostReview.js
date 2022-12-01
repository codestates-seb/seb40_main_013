import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { postReview } from "../../reduxstore/slices/reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import noImg from "../../imgs/noImg.gif";

function PostReview({ clickModal, filterProductId, filterData }) {
  const dispatch = useDispatch();
  const [userWriteImg, setUserWriteImg] = useState("");
  const [userWriteContent, setUserWriteContent] = useState("");
  const [userWriteScroe, setUserWriteScroe] = useState("");
  const navigate = useNavigate();
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const clickNumber = [1, 2, 3, 4, 5];
  const [lengthScore, setLengthScore] = useState(0);
  const [fileImage, setFileImage] = useState("");

  const changeImg = async (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    console.log(e);
    e.preventDefault();
    if (e.target.files) {
      const [file] = e.target.files;

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      console.log("압축시작");
      const compressFile = await imageCompression(file, options);
      const myFile = new File([compressFile], "imageName.JPG");
      setUserWriteImg(myFile);
    }
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  const changeContent = (e) => {
    setUserWriteContent(e.target.value);
  };

  const postSubmit = (e) => {
    e.preventDefault();
    let postData = {
      content: userWriteContent,
      score: lengthScore,
      img: userWriteImg,
      filterProductId: filterProductId,
    };
    dispatch(postReview({ postData, navigate }));
  };
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 1; i <= 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    setLengthScore(score);
  };
  useEffect(() => {
    sendReview();
  }, [clicked]);
  console.log(lengthScore);
  return (
    <Wrapper>
      <Container>
        <PostReviewTopSpace>
          <PostReviewContentImg
            src={filterData[0]?.orderProducts[0].img.fullPath}
          />
          <PostReviewContentRightSpace>
            <PostReviewTopContent>
              {filterData[0]?.orderProducts[0].brandName}
            </PostReviewTopContent>
            <PostReviewTopContent>
              {filterData[0]?.orderProducts[0].title}
            </PostReviewTopContent>
          </PostReviewContentRightSpace>
        </PostReviewTopSpace>
        <Hr />
        <PostReviewDownSpace>
          <PostReviewDownTitle>어떤 점이 좋았나요?</PostReviewDownTitle>
          <PostReviewDownInput
            placeholder="사용하시면서 만족도에 대한 후기를 남겨주세요!"
            onChange={changeContent}
          />
          <PostReviewDownTitle>리뷰 별점</PostReviewDownTitle>
          <PostReviewStarSpace>
            {clickNumber.map((item, idx) => {
              return (
                <BsStar
                  key={idx}
                  size="30"
                  onClick={() => handleStarClick(item)}
                  className={clicked[item] && "yellowStar"}
                />
              );
            })}
          </PostReviewStarSpace>
          <PostReviewDownTitle>사진 추가하기</PostReviewDownTitle>
          <SumContainer>
            <UploadDelete>
              <ImgLabel htmlFor="sumnail">
                {userWriteImg === "" ? (
                  <Img src={noImg} alt="noImg" />
                ) : (
                  <Img src={fileImage} />
                )}
              </ImgLabel>
              <SumnailUpload
                name="sumnailUpload"
                type="file"
                id="sumnail"
                accept="image/*"
                onChange={changeImg}
              />
            </UploadDelete>
          </SumContainer>

          <PostReviewDownBtn onClick={postSubmit}>추가 버튼</PostReviewDownBtn>
        </PostReviewDownSpace>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 75%;
  height: 60%;
  position: fixed;
  top: 140px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 530px;
  border: 1px solid #aaaaaa;
  background-color: white;
  border-radius: 5px;
  padding-top: 10px;
`;

const PostReviewTopSpace = styled.div`
  width: 80%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  border: 1px solid violet;
`;

const PostReviewContentImg = styled.img`
  width: 25%;
  height: 100%;
`;

const PostReviewContentRightSpace = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;
const PostReviewTopContent = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1vh;
  border: 1px solid blue;
  display: flex;
  align-items: center;
  &:nth-child(1) {
    color: #aaaaaa;
  }
`;
const Hr = styled.hr`
  width: 80%;
  height: 1px;
  border: none;
  background-color: var(--color-center-line);
  margin-top: 10px;
`;

const PostReviewDownSpace = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostReviewDownTitle = styled.div`
  font-size: 15px;
  margin-top: 10px;
  &:nth-child(1) {
    margin-top: 15px;
  }
`;
const PostReviewStarSpace = styled.div`
  width: 80%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
const SumContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const UploadDelete = styled.div`
  display: flex;
  justify-content: center;
`;
const ImgLabel = styled.label`
  display: inline-block;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  button {
    background-color: var(--color-navy);
    color: white;
    width: 55px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
  }
`;
const Img = styled.img`
  margin: 10px 20px 10px 0;
  border-radius: 5px;
  width: 100%;
  height: 150px;
  border: 5px solid blue;
  @media (min-width: 768px) and (max-width: 1023px) {
  }
`;
const SumnailUpload = styled.input`
  margin-left: 10px;
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
const DeleteSumnaeil = styled.button`
  background-color: var(--color-navy);
  color: white;
  width: 55px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
`;

const PostReviewDownInput = styled.textarea`
  width: 80%;
  height: 20%;
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
