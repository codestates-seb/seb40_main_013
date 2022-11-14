import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { BsStarFill, BsStarHalf, BsHeart, BsHeartFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import { getArticleDetail } from "../../reduxstore/slices/articleSlice";
import { useParams } from "react-router-dom";
function ArticleDetail() {
  const [clickSelect, setClickSelect] = useState(false);
  const [selectOptions, setSelectOptions] = useState([
    { id: 1, value: "색상선택 " },
    { id: 2, value: "화이트" },
    { id: 3, value: "검은색" },
    { id: 4, value: "네이비" },
  ]);
  const dispatch = useDispatch();
  const params = useParams();
  const detatilArticle = useSelector((state) => state.article.detailArticle);
  const filterArticle = detatilArticle?.filter(
    (data) => data.id === Number(params.id)
  );

  const clickFunction = () => {
    setClickSelect(!clickSelect);
  };

  const selectOption = (data) => {
    console.log(data);
    setSelectOptions(data);
  };
  console.log(selectOptions);
  useEffect(() => {
    dispatch(getArticleDetail(Number(params.id)));
  }, []);

  return (
    <Wrapper>
      <DetailContents>
        <DetailTopUserSelectSpace>
          <DetailTopThumbnailImg src={filterArticle[0]?.img} />
          <ArticleInformations>
            <DetailArticleNameSpace>
              <div>
                <DetailArticleName>{filterArticle[0]?.title}</DetailArticleName>
                <DetailArticleStarSpace>
                  <DetailArticleStar>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                  </DetailArticleStar>
                  <DetailArticleStaAverage>
                    {filterArticle[0]?.score}점
                  </DetailArticleStaAverage>
                </DetailArticleStarSpace>
              </div>
              <ButtonIcon>
                <BsHeart />
              </ButtonIcon>
            </DetailArticleNameSpace>
            <DetailArticlePriceSpace>
              <DetailArticlePrice>35%</DetailArticlePrice>
              <DetailArticlePrice>
                {filterArticle[0]?.price} 원
              </DetailArticlePrice>
              <DetailArticlePrice>115,000원</DetailArticlePrice>
            </DetailArticlePriceSpace>
            <DetailArticleOptionSpace>
              <DetailArticleOptionContents>
                배송 방법
              </DetailArticleOptionContents>
              <DetailArticleOptionContents>
                무료 배송
              </DetailArticleOptionContents>
            </DetailArticleOptionSpace>
            <DetailArticleOptionSpace>
              <DetailArticleOptionContents>
                옵션 선택
              </DetailArticleOptionContents>
            </DetailArticleOptionSpace>
            <DetailArticleOptionSpace clickSelect={clickSelect}>
              {clickSelect ? (
                <>
                  <DetailArticleSelectOption>
                    {selectOptions?.map((option) => (
                      <DetailArticleSelectOption
                        key={option.id}
                        value={option.value}
                        clickSelect={clickSelect}
                      >
                        {option.value}
                      </DetailArticleSelectOption>
                    ))}
                  </DetailArticleSelectOption>
                </>
              ) : (
                <>
                  <DetailArticleSelectOption>
                    색상선택
                  </DetailArticleSelectOption>
                </>
              )}
              <ButtonIcon onClick={clickFunction}>
                <FiChevronDown />
              </ButtonIcon>
            </DetailArticleOptionSpace>
            <DetailUserSubmitPriceSpace>
              <DetailUserQuantitySpace>
                <ButtonIcon>
                  <BiChevronLeft />
                </ButtonIcon>
                <div>1</div>
                <ButtonIcon>
                  <BiChevronRight />
                </ButtonIcon>
              </DetailUserQuantitySpace>
              <DetailUserPriceSpace>
                <DetailUserPrice>총 상품금액</DetailUserPrice>
                <DetailUserPrice>{filterArticle[0]?.price}</DetailUserPrice>
                <DetailUserPrice> 원</DetailUserPrice>
              </DetailUserPriceSpace>
            </DetailUserSubmitPriceSpace>
            <DetailArticlBtnSpace>
              <DetailArticlBtn>장바구니</DetailArticlBtn>
              <DetailArticlBtn>바로구매</DetailArticlBtn>
            </DetailArticlBtnSpace>
          </ArticleInformations>
        </DetailTopUserSelectSpace>
        <DetailMidImg src={filterArticle[0]?.contentImg} />
        <Review filterArticle={filterArticle[0]?.reviewList} />
      </DetailContents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: scroll;
`;

const DetailContents = styled.div`
  width: 80%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;
const DetailTopUserSelectSpace = styled.div`
  width: 1000px;
  display: flex;
  height: 450px;
  margin-top: 20px;
`;
const ArticleInformations = styled.div`
  width: 50%;
  height: 100%;
  margin-left: 40px;
  padding: 0px 20px;
`;
const DetailArticleNameSpace = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const DetailArticleName = styled.div`
  color: var(--font-navy);
  font-size: 30px;
  font-weight: bolder;
`;

const DetailTopThumbnailImg = styled.img`
  width: 500px;
  height: 100%;
`;
const DetailArticleStarSpace = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px 20px 0px;
`;
const DetailArticleStar = styled.div`
  color: var(--color-star);
`;
const DetailArticleStaAverage = styled.div`
  margin-left: 10px;
`;

const DetailMidImg = styled.img`
  width: 600px;
  margin-top: 20px;
`;
const ButtonIcon = styled.button`
  margin-top: 10px;
  font-size: 20px;
  border: none;
  background-color: white;
  &:nth-child(1) {
    margin-top: 0px;
  }
  &:nth-child(2) {
    margin-bottom: 7px;
  }

  &:nth-child(3) {
    margin-top: 0px;
  }
`;

const DetailArticlePriceSpace = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;
`;

const DetailArticlePrice = styled.div`
  font-size: 30px;
  font-weight: 700;
  &:nth-child(1) {
    color: #ffaf51;
  }
  &:nth-child(2) {
    color: var(--color-navy);
    margin-left: 15px;
  }
  &:nth-child(3) {
    font-size: var(--font-smallsize);
    text-decoration: line-through;
    color: var(--color-navy);
    margin-left: 15px;
  }
`;
const DetailArticleOptionSpace = styled.div`
  height: 45px;
  border: none;
  display: flex;
  align-items: center;
  border-top: 2px solid var(--border-navy);

  &:nth-child(5) {
    height: 35px;
    justify-content: space-between;
    border: 2px solid var(--border-navy);
  }
`;
const DetailArticleOptionContents = styled.div`
  margin-left: 10px;
  &:nth-child(2) {
    margin-left: 80px;
  }
`;
const DetailArticleSelectOption = styled.div`
  height: 35px;
  width: 107.5%;
  border: 2px solid var(--border-navy);
  position: relative;
  display: flex;
  align-items: center;
  &:nth-child(1) {
    border-right: none;
    border-left: none;
    background-color: white;
  }
  &:nth-child(2) {
    position: absolute;
    top: 32px;
    left: -2px;
    background-color: white;
  }
  &:nth-child(3) {
    margin-right: 2px;
    position: absolute;
    top: 64px;
    left: -2px;
    background-color: white;
  }
  &:nth-child(4) {
    margin-right: 2px;
    position: absolute;
    top: 96px;
    left: -2px;
    background-color: white;
  }
`;

const DetailUserSubmitPriceSpace = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const DetailUserQuantitySpace = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const DetailUserPriceSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  width: 200px;
`;

const DetailUserPrice = styled.div`
  font-size: 10px;
  height: 100%;
  color: var(--color-navy);
  font-weight: 700;
  &:nth-child(2) {
    font-size: 35px;
    margin-right: -37px;
    color: var(--color-navy);
  }
`;

const DetailArticlBtnSpace = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin-top: 30px;
`;

const DetailArticlBtn = styled.button`
  width: 225px;
  height: 40px;
  border-radius: var(--border-radius);
  &:nth-child(1) {
    background-color: white;
    border: 1px solid var(--color-navy);
    color: var(--color-navy);
    font-weight: bold;
  }
  &:nth-child(2) {
    background-color: var(--color-navy);
    border: 1px solid var(--color-navy);
    color: white;
    font-weight: bold;
  }
`;
export default ArticleDetail;
