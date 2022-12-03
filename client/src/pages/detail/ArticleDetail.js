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
  // postLike,
  // deleteLike,
  articleLike,
} from "../../reduxstore/slices/articleSlice";
import { useNavigate, useParams } from "react-router-dom";
import { renderStar } from "../../components/Star";
import ScrollToTop from "../../components/ScrollToTop";
import Button from "../../components/Button";
import Apis from "../../apis/apis";
import Swal from "sweetalert2";
import { Toast } from "../../components/Alert";
import useIntersect from "../../components/useIntersect";

function ArticleDetail() {
  const [clickSelect, setClickSelect] = useState(false);
  const [clickHeart, setClickHeart] = useState(false);
  const [clickCheck, setClickCheck] = useState(0);
  const [selectOptions, setSelectOptions] = useState("");
  const [selectOptionColor, setSelectOptionColor] = useState("색상 선택");
  const [cartCount, setCartCount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const articleRef = useRef();
  const reviewRef = useRef();
  const articlesDetail = useSelector((state) => state.article.detailArticle);
  const articlesLike = useSelector((state) => state.article.articleLike);
  const optionSelect = useSelector(
    (state) => state.article.detailArticle.options
  );
  let price = articlesDetail?.price;
  const isLike = articlesDetail?.existsLike;
  const clickFunction = () => {
    setClickSelect(!clickSelect);
  };

  const clickUpCart = () => {
    if (cartCount >= 100) {
      setCartCount(100);
    } else {
      setCartCount(cartCount + 1);
    }
  };
  const clickDownCart = () => {
    if (cartCount <= 1) {
      setCartCount(1);
    } else {
      setCartCount(cartCount - 1);
    }
  };
  console.log(articlesDetail);
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
  ScrollToTop();

  useEffect(() => {
    if (clickHeart === true || clickHeart === false) {
      setTimeout(() => {
        dispatch(getArticleDetail(Number(id)));
      }, 1500);
    } else {
      dispatch(getArticleDetail(Number(id)));
    }
  }, [clickHeart]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getArticleDetail(Number(id)));
  //   }, 500);
  // }, [clickHeart]);

  const clickPostCart = () => {
    let postData = {
      productId: articlesDetail?.productId,
      count: cartCount,
      optionId: selectOptions,
    };
    dispatch(postCart({ postData, navigate }));
  };

  const clickPostLike = () => {
    let id = articlesDetail?.productId;
    setClickHeart(true);
    setClickCheck(Date.now());
    dispatch(articleLike(id));
  };

  const clickDeleteLike = () => {
    let id = articlesDetail?.productId;
    setClickHeart(false);
    setClickCheck(Date.now());
    dispatch(articleLike(id));
  };

  const nowPayHandler = () => {
    Swal.fire({
      title: "",
      text: "상품을 바로 구매하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002C6D",
      cancelButtonColor: "#FFAF51",
      showCancelButton: true,
      confirmButtonText: "바로 구매",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        successNowPay();
      }
    });
  };

  const successNowPay = () => {
    const checkList = [
      {
        productId: articlesDetail?.productId,
        optionId: selectOptions,
        count: cartCount,
      },
    ];
    console.log(checkList);
    Apis.post(
      `orders`,
      {
        orderProducts: checkList,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("Authorization")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        // console.log(res);
        navigate("/members/mypage/purchase");
      })
      .catch((err) => {
        console.log(err);
      });
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
                  {articlesDetail?.score}&nbsp;점
                </DetailArticleStaAverage>
              </DetailArticleStarSpace>
            </DetailArticleNameSpace>
            <DetailArticlePriceSpace>
              <DetailArticlePrice>
                {articlesDetail?.price?.toLocaleString("en-US")}원
              </DetailArticlePrice>
              {clickHeart ? (
                <ButtonIcon>
                  {isLike ? (
                    <BsHeartFill
                      size="20"
                      color="#FFAF51"
                      onClick={clickDeleteLike}
                    />
                  ) : (
                    <BsHeart
                      size="20"
                      className="heart"
                      color="gray"
                      onClick={clickPostLike}
                    />
                  )}
                </ButtonIcon>
              ) : (
                <ButtonIcon>
                  {articlesLike ? (
                    <BsHeartFill
                      size="20"
                      color="#FFAF51"
                      onClick={clickDeleteLike}
                    />
                  ) : (
                    <BsHeart
                      size="20"
                      className="heart"
                      color="gray"
                      onClick={clickPostLike}
                    />
                  )}
                </ButtonIcon>
              )}
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
              <DetailUserQuantitySpace selectOptions={selectOptions}>
                <ButtonIcon>
                  <BiChevronLeft onClick={clickDownCart} />
                </ButtonIcon>
                <div>{cartCount}</div>
                <ButtonIcon>
                  <BiChevronRight onClick={clickUpCart} />
                </ButtonIcon>
              </DetailUserQuantitySpace>
              <DetailUserPriceSpace>
                {selectOptions === "" ? (
                  <div className="zero">
                    <DetailUserPrice className="w">₩</DetailUserPrice>
                    <DetailUserPrice>0</DetailUserPrice>
                  </div>
                ) : (
                  <div>
                    <DetailUserPrice className="w">₩</DetailUserPrice>
                    <DetailUserPrice>
                      {(price * cartCount).toLocaleString("en-US")}
                    </DetailUserPrice>
                  </div>
                )}
              </DetailUserPriceSpace>
            </DetailUserSubmitPriceSpace>
            <DetailArticlBtnSpace>
              {localStorage.getItem("Authorization") ? (
                <DetailArticlBtn onClick={clickPostCart}>
                  장바구니
                </DetailArticlBtn>
              ) : (
                <DetailArticlBtn
                  onClick={() => Toast("warning", "로그인 해주세요!")}
                >
                  장바구니
                </DetailArticlBtn>
              )}
              {localStorage.getItem("Authorization") ? (
                <DetailArticlBtn onClick={nowPayHandler}>
                  바로구매
                </DetailArticlBtn>
              ) : (
                <DetailArticlBtn
                  onClick={() => Toast("warning", "로그인 해주세요!")}
                >
                  바로구매
                </DetailArticlBtn>
              )}
            </DetailArticlBtnSpace>
          </ArticleInformations>
        </DetailTopUserSelectSpace>
        <SelectMoveSpace ref={articleRef}>
          <SelectMoveBtn onClick={() => onMoveToElement(0)}>
            상세 설명
          </SelectMoveBtn>
          <SelectCenterLine>|</SelectCenterLine>
          <SelectMoveBtn onClick={() => onMoveToElement(1)}>후기</SelectMoveBtn>
        </SelectMoveSpace>
        {articlesDetail?.content?.map((data) => (
          <DetailMidImg src={data} key={data} />
        ))}

        <Button />
        <Review
          reviewRef={reviewRef}
          articlesDetail={articlesDetail}
          renderStar={renderStar}
        />
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
  button {
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
  position: relative;
`;
const DetailArticleOptionSpaceSelectDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 46px;
  align-items: center;
  color: var(--font-navy);
  margin-left: 10px;
  position: relative;
  .button {
    font-size: 20px;
    margin-right: 10px;
  }
  .cur {
    cursor: pointer;
  }
`;

const DetailArticleOptionSpaceSelectDivValueUl = styled.ul`
  position: absolute;
  border: none;
  cursor: pointer;
  width: 100%;
`;
const DetailArticleOptionSpaceSelectDivValueLi = styled.li`
  text-decoration: none;
  color: var(--font-navy);
  padding: 15px 0px 15px 10px;
  display: block;
  border: none;
  &:nth-child(1) {
    border: none;
    border-top: 1px solid var(--color-gray);
    border-bottom: 1px solid var(--color-gray);
    background-color: white;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  &:nth-child(2) {
    border: none;
    border-bottom: 1px solid var(--color-gray);
    background-color: white;
    &:hover {
      background-color: #f0f0f0;
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
  display: ${(props) => (props.selectOptions ? "" : "none")};
`;
const DetailUserPriceSpace = styled.div`
  margin-right: 10px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  div {
    display: flex;
  }
  .zero {
  }
`;

const DetailUserPrice = styled.div`
  font-size: 1.5rem;
  height: 100%;
  color: #272727;
  font-weight: 700;
  display: flex;
  align-items: center;
  &.w {
    margin-right: 10px;
    font-size: 1.2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
    &.w {
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
  &:hover {
    background-color: #123b77;
  }
  &:nth-child(1) {
    background-color: white;
    color: var(--color-navy);
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

export default ArticleDetail;
