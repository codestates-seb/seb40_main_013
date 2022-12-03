import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import { postReview, updateReview } from "../../reduxstore/slices/reviewSlice";
import { useDispatch } from "react-redux";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import noImg from "../../imgs/noImg.gif";

function PostReview({ clickModal, filterData, filteReview }) {
  console.log(filterData, filteReview);
  const dispatch = useDispatch();
  const [userWriteImg, setUserWriteImg] = useState("");
  const [userWriteContent, setUserWriteContent] = useState("");
  const [userWriteScroe, setUserWriteScroe] = useState("");
  const navigate = useNavigate();
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const clickNumber = [1, 2, 3, 4, 5];
  const [lengthScore, setLengthScore] = useState(0);
  const [fileImage, setFileImage] = useState("");
  console.log(filterData);
  const changeImg = async (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    e.preventDefault();
    if (e.target.files) {
      const [file] = e.target.files;

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
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
      filterProductId: filterData[0]?.productId,
    };
    dispatch(postReview({ postData, navigate }));
  };
  const updateSubmit = (e) => {
    e.preventDefault();
    let filterProductId = filteReview[0]?.productId;
    let updateData = {
      reviewId: filteReview[0]?.reviewId,
      content: userWriteContent,
      score: lengthScore,
    };
    console.log(updateData);
    dispatch(updateReview({ filterProductId, updateData, navigate }));
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

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <Container>
        <PostReviewTopSpace>
          {filterData === undefined ? (
            <>
              {filteReview[0].img !== null ? (
                <PostReviewContentImg src={filteReview[0]?.img.fullPath} />
              ) : (
                <PostReviewContentImg src={noImg} />
              )}
            </>
          ) : (
            <>
              {filterData[0].img !== null ? (
                <PostReviewContentImg src={filterData[0]?.img.fullPath} />
              ) : (
                <PostReviewContentImg src={noImg} />
              )}
            </>
          )}

          <PostReviewContentRightSpace>
            {filterData === undefined ? (
              <PostReviewTopContent>
                {filteReview[0]?.nickname}
              </PostReviewTopContent>
            ) : (
              <PostReviewTopContent>
                {filterData[0]?.brandName}
              </PostReviewTopContent>
            )}
            {filterData === undefined ? (
              <PostReviewTopContent>
                {filteReview[0]?.productTitle}
              </PostReviewTopContent>
            ) : (
              <PostReviewTopContent>
                {filterData[0]?.title}
              </PostReviewTopContent>
            )}
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
                <BsStarFill
                  key={idx}
                  size="30"
                  onClick={() => handleStarClick(item)}
                  className={clicked[item] && "yellowStar"}
                />
              );
            })}
          </PostReviewStarSpace>
          {filterData === undefined ? (
            <></>
          ) : (
            <>
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
            </>
          )}

          <BtnSpace filteReview={filteReview}>
            {filterData === undefined ? (
              <PostReviewDownBtn onClick={updateSubmit}>등록</PostReviewDownBtn>
            ) : (
              <PostReviewDownBtn onClick={postSubmit}>등록</PostReviewDownBtn>
            )}
            <PostReviewDownBtn className="cancleBtn" onClick={clickModal}>
              취소
            </PostReviewDownBtn>
          </BtnSpace>
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
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 530px;
  border: 1px solid #aaaaaa;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 30%);
  @media screen and (max-width: 400px) {
    max-width: 350px;
    justify-content: center;
    align-items: center;
  }
`;

const PostReviewTopSpace = styled.div`
  width: 80%;
  height: 15%;
  display: flex;
  justify-content: space-between;
`;

const PostReviewContentImg = styled.img`
  width: 70px;
  height: 75px;
`;

const PostReviewContentRightSpace = styled.div`
  width: 70%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PostReviewTopContent = styled.div`
  width: 90%;
  height: 100%;
  font-size: 13px;
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
  height: 80%;
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
    color: #e0e0e0;
    cursor: pointer;
  }

  :hover svg {
    color: #ffaf51;
  }

  & svg:hover ~ svg {
    color: #e0e0e0;
  }

  .yellowStar {
    color: #ffaf51;
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

const PostReviewDownInput = styled.textarea`
  width: 80%;
  height: 30%;
  margin-top: 10px;
  padding: 8px;
  max-width: 80%;
  min-width: 70%;
  min-height: 90px;
  max-height: 100px;
`;
const BtnSpace = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.filteReview ? "50px" : "0px")};
`;
const PostReviewDownBtn = styled.button`
  width: 20%;
  height: 38px;
  border-radius: 5px;
  color: white;
  background-color: var(--color-navy);
  border: 1px solid #aaaaaa;
  cursor: pointer;
  &:nth-child(1) {
    margin-right: 20px;
  }
  &.cancleBtn {
    background-color: white;
    color: var(--color-navy);
  }
  &:hover {
    opacity: 0.6;
  }
`;

export default PostReview;
