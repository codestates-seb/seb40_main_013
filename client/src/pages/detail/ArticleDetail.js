import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import { BsStarFill, BsStarHalf, BsHeart, BsHeartFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Review from "./Review";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleDetail,
  postCart,
  postLike,
  deleteLike,
} from "../../reduxstore/slices/articleSlice";
import { useNavigate, useParams } from "react-router-dom";
import { renderStar } from "../../components/Star";
import ScrollToTop from "../../components/ScrollToTop";
import Button from "../../components/Button";
import Apis from "../../apis/apis";
function ArticleDetail() {
  const [clickSelect, setClickSelect] = useState(false);
  const [selectOptions, setSelectOptions] = useState("");
  const [selectOptionColor, setSelectOptionColor] = useState("색상 선택");
  const [cartCount, setCartCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const articleRef = useRef();
  const reviewRef = useRef();
  const articlesDetail = useSelector((state) => state.article.detailArticle);
  const optionSelect = useSelector(
    (state) => state.article.detailArticle.options
  );
  let price = articlesDetail?.price;
  const isLike = articlesDetail?.existsLike;
  console.log(articlesDetail);
  const jwtToken = localStorage.getItem("Authorization");
  const clickFunction = () => {
    setClickSelect(!clickSelect);
  };
  const clickUpCart = () => {
    setCartCount(cartCount + 1);
  };
  const clickDownCart = () => {
    if (cartCount <= 0) {
      setCartCount(0);
    } else {
      setCartCount(cartCount - 1);
    }
  };

  const onMoveToElement = (idx) => {
    if (idx === 0) {
      articleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (idx === 1) {
      reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const selectOption = (id, color) => {
    setSelectOptions(id);
    setSelectOptionColor(color);
  };
  // let get_local = localStorage.getItem("product");
  // console.log(get_local);
  ScrollToTop();
  useEffect(() => {
    dispatch(getArticleDetail(Number(id)));

    // let get_local = [];
    // if (!articlesDetail) {
    //   localStorage.setItem("product", get_local);
    // } else if (articlesDetail) {
    //   let local = localStorage.getItem("product");
    //   let get_local = [articlesDetail.productId];
    //   if (local) {
    //     local = JSON.parse(local);
    //     get_local = [articlesDetail.productId, ...local];
    //   }
    //   localStorage.setItem("product", JSON.stringify(get_local));
    // }
  }, [dispatch]);

  const clickPostCart = () => {
    let postData = {
      productId: articlesDetail?.productId,
      count: cartCount,
      optionId: selectOptions,
    };
    console.log(postData);
    dispatch(postCart({ postData, navigate }));
  };
  
  const clickPostLike = () => {
    let id = articlesDetail?.productId;

    dispatch(postLike(id));
  };

  const clickDeleteLike = () => {
    let id = articlesDetail?.productId;

    dispatch(deleteLike(id));
  };

  return (
    <Wrapper>
      <DetailContents>
        <DetailTopUserSelectSpace>
          <DetailTopThumbnailImg src={articlesDetail?.img?.fullPath} />
          <ArticleInformations>
              <DetailArticleName>{articlesDetail?.title}</DetailArticleName>
              <DetailArticleNameSpace>
                <DetailArticleStarSpace onClick={() => onMoveToElement(1)}>
                  {renderStar(articlesDetail?.score)}
                  <DetailArticleStaAverage>
                    {articlesDetail?.score}점
                  </DetailArticleStaAverage>
                </DetailArticleStarSpace>
              </DetailArticleNameSpace>
            <DetailArticlePriceSpace>
              <DetailArticlePrice>
                {articlesDetail?.price?.toLocaleString("en-US")}원
              </DetailArticlePrice>
              <ButtonIcon>
                  {isLike ? (
                    <BsHeartFill onClick={clickDeleteLike} />
                  ) : (
                    <BsHeart className="heart" onClick={clickPostLike} />
                  )}
                </ButtonIcon>
            </DetailArticlePriceSpace>
            <div>
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
              <DetailArticleOptionSpaceSelect clickSelect={clickSelect}>
                <DetailArticleOptionSpaceSelectDiv>
                  {selectOptionColor}
                  <div className="cur">
                    <FiChevronDown className="button" onClick={clickFunction} />
                  </div>
                </DetailArticleOptionSpaceSelectDiv>
                {clickSelect ? (
                  <DetailArticleOptionSpaceSelectDivValueUl>
                    {optionSelect?.map((option) => (
                      <DetailArticleOptionSpaceSelectDivValueLi
                        key={option?.optionId}
                        value={option?.value}
                        onClick={() => {
                          selectOption(option.optionId, option.color),
                            clickFunction();
                        }}
                      >
                        {option?.color}
                      </DetailArticleOptionSpaceSelectDivValueLi>
                    ))}
                  </DetailArticleOptionSpaceSelectDivValueUl>
                ) : (
                  <DetailArticleOptionSpaceSelectDivValueUl></DetailArticleOptionSpaceSelectDivValueUl>
                )}
              </DetailArticleOptionSpaceSelect>
            </div>
            <DetailUserSubmitPriceSpace>
              <DetailUserQuantitySpace>
                <ButtonIcon>
                  <BiChevronLeft onClick={clickDownCart} />
                </ButtonIcon>
                <div>{cartCount}</div>
                <ButtonIcon>
                  <BiChevronRight onClick={clickUpCart} />
                </ButtonIcon>
              </DetailUserQuantitySpace>
              <DetailUserPriceSpace>
                <DetailUserPrice className="w">₩</DetailUserPrice>
                <DetailUserPrice>
                  {(price * cartCount).toLocaleString("en-US")}
                </DetailUserPrice>
              </DetailUserPriceSpace>
            </DetailUserSubmitPriceSpace>
            <DetailArticlBtnSpace>
              <DetailArticlBtn onClick={clickPostCart}>
                장바구니
              </DetailArticlBtn>
              <DetailArticlBtn>바로구매</DetailArticlBtn>
            </DetailArticlBtnSpace>
          </ArticleInformations>
        </DetailTopUserSelectSpace>
        <SelectMoveSpace ref={articleRef}>
            <SelectMoveBtn onClick={() => onMoveToElement(0)}>
              상세 설명
            </SelectMoveBtn>
            <SelectCenterLine>/</SelectCenterLine>
            <SelectMoveBtn onClick={() => onMoveToElement(1)}>
              후기
            </SelectMoveBtn>
        </SelectMoveSpace>
          {articlesDetail?.content?.map((data) => (
            <DetailMidImg src={data} key={data} />
          ))}

          <Button />
          <div className="sp">
            <Review reviewRef={reviewRef} articlesDetail={articlesDetail} renderStar={renderStar} />
          </div>
      </DetailContents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 129px;
`;

const DetailContents = styled.div`
  width: 100%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  @media screen and (min-width: 1024px) {
    width: 80%;
    height: auto;
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }
`;
const DetailTopUserSelectSpace = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media screen and (min-width: 1024px) {
    height: auto;
    display: flex;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 1023px) {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    height: auto;
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }
`;
const ArticleInformations = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1023px) {
    width: 60%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
    padding: 0px;
    margin: 30px 0px 0px 0px;
  }
`;
const DetailArticleNameSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-top: 10px; */
  height: 35px;
  cursor: pointer;
`;
const DetailArticleName = styled.div`
  color: #272727;
  font-size: 1.8rem;
  font-weight: bold;
  /* @media screen and (max-width: 1300px) {
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 1.2;
    height: 2.4em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 1.5rem;
  } */
  @media screen and (max-width: 767px) {
    font-size: 1.3rem;
  }
`;

const DetailTopThumbnailImg = styled.img`
  width: 50%;
  height: auto;
  @media screen and (max-width: 1023px) {
    width: 60%;
  }
`;
const DetailArticleStarSpace = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const DetailArticleStaAverage = styled.div`
  margin-left: 10px;
  @media screen and (max-width: 1023px) {
  }
`;

const SelectMoveSpace = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--color-gray);
  margin: 40px 0px 40px 0px;
  font-weight: 300;
  @media screen and (max-width: 1023px) {
    width: 60%;
  }
  button{
    padding: 5px;
    height: 3rem;
    background-color: white;
    color: #8a8a8a;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 300;
    &:hover {
      color: #ffaf51;
    }
  }
`;

const SelectMoveBtn = styled.button`
  padding: 5px;
  height: 3rem;
  background-color: white;
  color: #8a8a8a;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 300;
  &:hover {
    color: #ffaf51;
  }
`;
const SelectCenterLine = styled.div`
  color: #8a8a8a;
  margin: 0px 10px;
`;
const DetailMidImg = styled.img`
  width: 70%;
  margin-top: 0px;
  @media screen and (max-width: 1023px) {
    width: 80%;
  }
`;
const ButtonIcon = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 20px;
  border: none;
  background-color: white;
  cursor: pointer;

  &:nth-child(1) {
    margin: 0px 10px;
    border-radius: 5px;
    border: 1px solid var(--color-gray);
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    &:hover {
      background-color: #e7e7e7;
    }

    @media screen and (max-width: 1023px) {
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  &:nth-child(2) {
    margin-right: 10px;
    color: #aaaaaa;
    &:hover {
      cursor: pointer;
    }
    @media screen and (max-width: 1023px) {
      font-size: 1rem;
    }
  }

  &:nth-child(3) {
    margin: 0px 10px;
    border-radius: 5px;
    border: 1px solid var(--color-gray);
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    &:hover {
      background-color: #e7e7e7;
    }
    @media screen and (max-width: 1023px) {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

const DetailArticlePriceSpace = styled.div`
  display: flex;
  margin-bottom: 15px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const DetailArticlePrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #212121;

  @media screen and (max-width: 1050px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 1023px) {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 400px) {
    font-size: 1.1rem;
  }
`;

const DetailArticleOptionContents = styled.div`
  margin-left: 10px;
  font-size: 1rem;
  color: #002c6d;
  &:nth-child(2) {
    margin-right: 10px;
    color: #272727;
  }
`;
const DetailArticleOptionSpace = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-gray);
  &:nth-child(4) {
    justify-content: space-between;
  }
`;

const DetailArticleOptionSpaceSelect = styled.div`
  border-top: 1px solid var(--color-gray);
  display: inline-block;
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  border-bottom: 1px solid var(--color-gray);
`;
const DetailArticleOptionSpaceSelectDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 46px;
  align-items: center;
  color: var(--font-navy);
  margin-left: 10px;
  .button {
    font-size: 20px;
    margin-right: 10px;
  }
  .cur{
    cursor: pointer;
  }
`;

const DetailArticleOptionSpaceSelectDivValueUl = styled.ul`
  position: absolute;
  border: none;
  cursor: pointer;
  width: 450px;
  @media screen and (max-width: 1223px) {
    width: 36%;
  }
  @media screen and (max-width: 1023px) {
    width: 600px;
  }
  @media screen and (max-width: 800px) {
    width: 420px;
  }
  @media screen and (max-width: 400px) {
    width: 190px;
  }
`;
const DetailArticleOptionSpaceSelectDivValueLi = styled.li`
  text-decoration: none;
  color: var(--font-navy);
  padding: 15px 0px 15px 10px;
  display: block;
  border: none;
  &:hover {
    background-color: #cccccc;
  }
  &:nth-child(1) {
    border: none;
    border-bottom: 1px solid var(--color-gray);
    background-color: white;
  }
  &:nth-child(2) {
    border: none;
    border-bottom: 1px solid var(--color-gray);
    background-color: white;
  }
  @media screen and (min-width: 1000px) {
    height: 100%;
    background-color: red;
    &:nth-child(1) {
      border: none;
      border-bottom: 1px solid var(--color-gray);
      background-color: white;
    }
    &:nth-child(2) {
      border: none;
      border-bottom: 1px solid var(--color-gray);
      background-color: white;
    }
  }
  @media screen and (max-width: 1250px) {
    &:nth-child(1) {
      border: none;
      border-bottom: 1px solid var(--color-gray);
      background-color: white;
    }
    &:nth-child(2) {
      border: none;
      border-bottom: 1px solid var(--color-gray);
      background-color: white;
    }
  }
`;

const DetailUserSubmitPriceSpace = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  /* @media screen and (max-width: 1023px) {
    width: 90%;
  } */
`;

const DetailUserQuantitySpace = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
`;
const DetailUserPriceSpace = styled.div`
  margin-right: 10px;
  width: 35%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
`;

const DetailUserPrice = styled.div`
  font-size: 1.5rem;
  height: 100%;
  color: #272727;
  font-weight: 700;
  display: flex;
  align-items: center;
  &.w{
    margin-right: 10px;
    font-size: 1.2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
    &.w{
      font-size: 1rem;
    margin-right: 5px;
    }
  }
`;

const DetailArticlBtnSpace = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin-top: 35px;
`;

const DetailArticlBtn = styled.button`
  width: 48%;
  height: 45px;
  border-radius: var(--border-radius);
  background-color: var(--color-navy);
  border: 1px solid var(--color-navy);
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:nth-child(1) {
    background-color: white;
    color: var(--color-navy);
  }
`;

export default ArticleDetail;
