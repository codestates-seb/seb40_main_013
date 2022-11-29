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
            <>
              <DetailArticleName>{articlesDetail?.title}</DetailArticleName>
              <DetailArticleNameSpace>
                <DetailArticleStarSpace>
                  {renderStar(articlesDetail?.score)}
                  <DetailArticleStaAverage>
                    {articlesDetail?.score}점
                  </DetailArticleStaAverage>
                </DetailArticleStarSpace>
                <ButtonIcon>
                  {isLike ? (
                    <BsHeartFill onClick={clickDeleteLike} />
                  ) : (
                    <BsHeart className="heart" onClick={clickPostLike} />
                  )}
                </ButtonIcon>
              </DetailArticleNameSpace>
            </>
            <DetailArticlePriceSpace>
              <DetailArticlePrice>
                {articlesDetail?.price?.toLocaleString("en-US")}원
              </DetailArticlePrice>
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
                  <FiChevronDown className="button" onClick={clickFunction} />
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
                <DetailUserPrice>₩</DetailUserPrice>
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
        <>
          <SelectMoveSpace ref={articleRef}>
            <SelectMoveBtn onClick={() => onMoveToElement(0)}>
              상세 설명
            </SelectMoveBtn>
            <SelectCenterLine>/</SelectCenterLine>
            <SelectMoveBtn onClick={() => onMoveToElement(1)}>
              후기
            </SelectMoveBtn>
            <SelectCenterLine>/</SelectCenterLine>
            <SelectMoveBtn>QnA</SelectMoveBtn>
          </SelectMoveSpace>
          {articlesDetail?.content?.map((data) => (
            <DetailMidImg src={data} key={data} />
          ))}

          <Button />
          <span ref={reviewRef}></span>
          <Review articlesDetail={articlesDetail} renderStar={renderStar} />
        </>
      </DetailContents>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 160px;
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
  margin-top: 10px;
  height: 35px;
`;
const DetailArticleName = styled.div`
  color: #1c1c1c;
  font-size: 1.6rem;
  font-weight: bold;
  height: 2.4em;
  @media screen and (max-width: 1300px) {
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
  }
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
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
  width: 65%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid var(--color-gray);
  margin: 20px 0px 50px 0px;
  @media screen and (max-width: 500px) {
    width: 100%;
    border: 1px solid red;
  }
`;
const SelectMoveBtn = styled.button`
  width: 10%;
  height: 3rem;
  border: 1x solid blue;
  background-color: white;
  color: #aaaaaa;
  font-weight: 300;
  &:nth-child(5) {
    font-weight: 100;
  }
  &:hover {
    color: #ffaf51;
    border-bottom: 2px solid #aaaaaa;
  }
  @media screen and (max-width: 500px) {
    width: 20%;
    &:nth-child(5) {
      display: none;
    }
  }

  @media screen and (max-width: 1023px) {
    height: 2rem;
  }
`;
const SelectCenterLine = styled.div`
  color: #aaaaaa;
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
      background-color: #aaaaaa;
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
      background-color: #aaaaaa;
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
  justify-content: end;
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
    margin-right: 30px;
  }
`;
const DetailArticleOptionSpace = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid var(--color-gray);
  &:nth-child(4) {
    justify-content: space-between;
  }
`;

const DetailArticleOptionSpaceSelect = styled.div`
  border-top: 2px solid var(--color-gray);
  display: inline-block;
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  border-bottom: 2px solid var(--color-gray);
`;
const DetailArticleOptionSpaceSelectDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 46px;
  align-items: center;
  color: var(--font-navy);
  padding-left: 9px;
  .button {
    font-size: 20px;
    margin-right: 10px;
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
    border-bottom: 2px solid var(--color-gray);
    background-color: white;
  }
  &:nth-child(2) {
    border: none;
    border-bottom: 2px solid var(--color-gray);
    background-color: white;
  }
  @media screen and (min-width: 1000px) {
    height: 100%;
    background-color: red;
    &:nth-child(1) {
      border: none;
      border-bottom: 2px solid var(--color-gray);
      background-color: white;
    }
    &:nth-child(2) {
      border: none;
      border-bottom: 2px solid var(--color-gray);
      background-color: white;
    }
  }
  @media screen and (max-width: 1250px) {
    &:nth-child(1) {
      border: none;
      border-bottom: 2px solid var(--color-gray);
      background-color: white;
    }
    &:nth-child(2) {
      border: none;
      border-bottom: 2px solid var(--color-gray);
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
  padding-right: 20px;
  @media screen and (max-width: 1023px) {
    width: 90%;
  }
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
  justify-content: space-between;
  @media screen and (max-width: 1023px) {
    width: 30%;
  }
`;

const DetailUserPrice = styled.div`
  font-size: 11px;
  height: 100%;
  color: var(--color-navy);
  font-weight: 700;
  display: flex;
  align-items: center;
  &:nth-child(1) {
    color: #464646;
    font-size: 1.5rem;
  }
  &:nth-child(2) {
    font-size: 1.5rem;
    color: #272727;
  }
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
    &:nth-child(1) {
      color: #464646;
      font-size: 1.5rem;
    }
    &:nth-child(2) {
      font-size: 1.5rem;
    }
  }
  @media screen and (max-width: 400px) {
    font-size: 1rem;
    &:nth-child(1) {
      color: #464646;
      font-size: 1.2rem;
    }
    &:nth-child(2) {
      font-size: 1.2rem;
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
  @media screen and (max-width: 1023px) {
  }
`;
export default ArticleDetail;
