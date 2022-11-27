import React, { useEffect, useState, useCallback, useRef } from "react";
// import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../reduxstore/slices/userSlice";
import styled from "styled-components/macro";
import PurchaseList from "../components/mypages/PurchaseList";
import EditProfile from "../components/mypages/EditProfile";
import { Routes, Route, Link } from "react-router-dom";
import MyReview from "../components/mypages/MyReview";
import Recent from "../components/mypages/Recent";
import ProfileImg from '../components/mypages/ProfileImg';
import PurchaseAll from "../components/mypages/PurchaseAll";

const Container = styled.div`
  display: flex;
  /* height: 100%; */
  padding: 145px 16px 25px 30px;
  width: 100%;
  @media screen and (max-width: 390px) {
    flex-direction: column;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

//왼쪽 nav bar
const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 20%;
  padding: 20px 0;
  border-right: 1px solid var(--color-center-line);
  @media screen and (max-width: 390px) {
    justify-content: center;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-center-line);
  }
  @media (min-width: 391px) and (max-width: 768px) {
    justify-content: center;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-center-line);
  }
`;
const Reaction = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 390px) {
    flex-direction: row;
    justify-content: center;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    flex-direction: row;
  }
`;
const ProfileImgConponent = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  padding: 10px;
  cursor: pointer;
  @media screen and (max-width: 390px) {
    width: 60px;
    height: 60px;
  }
`;
const Hello = styled.h2`
  white-space: nowrap;
  padding: 5px 0;
  font-weight: 500;
  font-size: 1.3rem;
  color: var(--font-ligthblack);
  @media screen and (max-width: 390px) {
    font-size: 1rem;
  }
`;

const Nav = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-center-line);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 390px) {
    border-top: none;
    flex-direction: row;
    justify-content: center;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    border-top: none;
    flex-direction: row;
    justify-content: center;
  }
`;
const ReactionDetail = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 390px) {
    flex-direction: column;
  }
`;

const NavDetail = styled.nav`
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 500;
  margin-top: 20px;
  color: var(--font-ligthblack);
  &:hover {
    color: #aaa;
  }
  &.clicked {
    color: #ffaf51;
  }
  &.clicked::after {
    color: #ffaf51;
  }
  &:active {
    color: #ffaf51;
  }
  @media screen and (max-width: 390px) {
    margin-right: 10px;
    background-color: #ecece8;
    padding: 10px 5px;
    font-size: 1rem;
    width: 100px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    white-space: nowrap;
    &:hover {
      background-color: #aaaaaa;
      color: white;
    }
    &.clicked {
      background-color: #ffaf51;
      color: white;
    }
    &.clicked::after {
      background-color: #ffaf51;
      color: white;
    }
  }
  @media (min-width: 391px) and (max-width: 768px) {
    margin-right: 10px;
    background-color: #ecece8;
    padding: 11px 10px;
    width: 120px;
    font-size: 1.1rem;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    white-space: nowrap;
    &:hover {
      background-color: #aaaaaa;
      color: white;
    }
    &.clicked {
      background-color: #ffaf51;
      color: white;
    }
    &.clicked::after {
      background-color: #ffaf51;
      color: white;
    }
  }
`;
const Mypage = () => {
  const dispatch = useDispatch();
  const getUserdata = useSelector((state) => state.user.users);
  console.log(getUserdata);
  // console.log(myOrderData);
  //tab click
  const [clicked, setClicked] = useState("");

  //user 정보 받아오기
  useEffect(() => {
    dispatch(getUser());
  }, []);

  //탭 클릭 이벤트
  const tabClick = (e) => {
    const text = e.target.innerText;
    setClicked(text);
  };

  //프로필 이미지 바꾸기
  const handleChangeImg = () => {
    ProfileImg();
  };

  return (
    <Container>
      <Left>
        <Reaction>
          <ProfileImgConponent
            src={`https://source.boringavatars.com/beam/120/daily?colors=FFAF51,FFC007,AAAAAA,0C8F8F,002C6D`}
            alt="avator"
            onclick={handleChangeImg}
          ></ProfileImgConponent>
          <Hello>안녕하세요,&nbsp;</Hello>
          <Hello>{getUserdata?.nickname}&nbsp;님</Hello>
        </Reaction>
        <Nav>
          <ReactionDetail path="*">
            <Link to="purchase" style={{ textDecoration: "none" }}>
              <NavDetail
                name="purchaseTab"
                className={clicked === "구매 내역" ? "clicked" : ""}
                onClick={tabClick}
              >
                구매 내역
              </NavDetail>
            </Link>
            <Link to="edit" style={{ textDecoration: "none" }}>
              <NavDetail
                name="editProfileTab"
                className={clicked === "정보 수정" ? "clicked" : ""}
                onClick={tabClick}
              >
                정보 수정
              </NavDetail>
            </Link>
          </ReactionDetail>
          <ReactionDetail>
            <Link to="like" style={{ textDecoration: "none" }}>
              <NavDetail
                name="like"
                className={clicked === "좋아요" ? "clicked" : ""}
                onClick={tabClick}
              >
                좋아요
              </NavDetail>
            </Link>
            <Link to="myboard" style={{ textDecoration: "none" }}>
              <NavDetail
                name="myboard"
                className={clicked === "작성한 리뷰" ? "clicked" : ""}
                onClick={tabClick}
              >
                작성한 리뷰
              </NavDetail>
            </Link>
            <Link to="recent" style={{ textDecoration: "none" }}>
              <NavDetail
                name="recent"
                className={clicked === "최근본 상품" ? "clicked" : ""}
                onClick={tabClick}
              >
                최근본 상품
              </NavDetail>
            </Link>
          </ReactionDetail>
        </Nav>
      </Left>
      <Routes>
        <Route
          path="/edit"
          element={<EditProfile getUserdata={getUserdata} />}
        ></Route>
        <Route path="/purchase/*" element={<PurchaseList />}></Route>
        <Route path="/myboard" element={<MyReview />}></Route>
        <Route path="/recent" element={<Recent />}></Route>
        <Route path="/purchase/orderall" element={<PurchaseAll />}></Route>
      </Routes>
    </Container>
  );
};
export default Mypage;
