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
import Pagination from "./Pagination";
import PostReview from "./PostReview";
import noImg from "../../imgs/noImg.gif";

function MyReview() {
  const dispatch = useDispatch();
  const userWriteReviews = useSelector(
    (state) => state?.review.review?.content
  );
  console.log(userWriteReviews);
  const [filteReview, setFilterReview] = useState("");
  const [curPage, setCurPage] = useState(0);
  const [totalpage, setTotalpage] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const clickModal = (id) => {
    const filteData = userWriteReviews?.filter((data) => data.reviewId === id);
    setFilterReview(filteData);
    setIsModal(!isModal);
  };

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
    let count = 0;
    if (curPage > 0) {
      count = curPage - 1;
    } else {
      count = 0;
    }
    dispatch(getAllReview({ count, setTotalpage }));
  }, [curPage]);

  return (
    <>
      {isModal ? (
        <Container onClick={clickModal}>
          <PostReview
            clickModal={clickModal}
            onClick={(e) => e.preventDefault()}
            filteReview={filteReview}
          />
          <Hr />
          {userWriteReviews?.map((data, idx) => (
            <div key={data?.reviewId}>
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
                    {data?.img ? (
                      <Img src={data?.img.fullPath}></Img>
                    ) : (
                      <Img src={noImg} />
                    )}
                    <BP>
                      <BrandName to={`/detail/${data?.productId}`}>
                        {data?.productTitle}
                      </BrandName>
                      {renderStar(data?.score)}
                      <Option>{data?.content}</Option>
                    </BP>
                  </ReactionSubDetail>
                  <Btns>
                    <CancleBtn onClick={() => clickModal(data.reviewId)}>
                      수정하기
                    </CancleBtn>
                    <CancleBtn
                      className="cancleBtn"
                      onClick={() =>
                        clickDelete(data?.productId, data?.reviewId)
                      }
                    >
                      삭제하기
                    </CancleBtn>
                  </Btns>
                </Detail>
              </Content>
              <Hr />
            </div>
          ))}
          <PaginationContainer>
            <Pagination
              totalpage={totalpage}
              page={curPage}
              setPage={setCurPage}
            />
          </PaginationContainer>
        </Container>
      ) : (
        <Container>
          <Hr />
          {userWriteReviews?.map((data, idx) => (
            <div key={data?.reviewId}>
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
                    {data?.img ? (
                      <Img src={data?.img.fullPath}></Img>
                    ) : (
                      <Img src={noImg} />
                    )}
                    <BP>
                      <BrandName to={`/detail/${data?.productId}`}>
                        {data?.productTitle}
                      </BrandName>
                      {renderStar(data?.score)}
                      <Option>{data?.content}</Option>
                    </BP>
                  </ReactionSubDetail>
                  <Btns>
                    <CancleBtn onClick={() => clickModal(data.reviewId)}>
                      수정하기
                    </CancleBtn>
                    <CancleBtn
                      className="cancleBtn"
                      onClick={() =>
                        clickDelete(data?.productId, data?.reviewId)
                      }
                    >
                      삭제하기
                    </CancleBtn>
                  </Btns>
                </Detail>
              </Content>
              <Hr />
            </div>
          ))}
          <PaginationContainer>
            <Pagination
              totalpage={totalpage}
              page={curPage}
              setPage={setCurPage}
            />
          </PaginationContainer>
        </Container>
      )}
    </>
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
  @media screen and (max-width: 474px) {
    margin: 5px 10px;
    display: flex;
    /* justify-content: flex-start; */
    flex-direction: column;
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

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 474px) {
    margin: 5px 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* justify-content: flex-start; */
  }
`;
const CancleBtn = styled.button`
  padding: 8px 30px;
  color: white;
  background-color: var(--color-navy);
  border-radius: 10px;
  white-space: nowrap;
  border: 1px solid #aaaaaa;
  margin-top: 10px;
  cursor: pointer;
  &.cancleBtn {
    background-color: white;
    color: var(--color-navy);
  }
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 474px) {
    padding: 5px 20px;
    margin-left: 10px;
  }

  @media screen and (max-width: 473px) {
    width: 50%;
    /* justify-content: flex-start; */
  }
`;
//반응형 구매후기
const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default MyReview;
