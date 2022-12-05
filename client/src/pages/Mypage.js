import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../reduxstore/slices/userSlice";
import styled from "styled-components/macro";
import PurchaseList from "../components/mypages/PurchaseList";
import EditProfile from "../components/mypages/EditProfile";
import { Routes, Route, Link } from "react-router-dom";
import MyReview from "../components/mypages/MyReview";
import ProfileImg from "../components/mypages/ProfileImg";
import PurchaseAll from "../components/mypages/PurchaseAll";
import Like from "../components/mypages/Like"

const Container = styled.div`
  display: flex;
  /* height: 100%; */
  padding: 145px 16px 25px 30px;
  width: 100%;
  @media screen and (max-width: 390px) {
    flex-direction: column;
    padding: 145px 16px 25px 16px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 145px 16px 25px 16px;
  }
`;

//왼쪽 nav bar
const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 20vw;
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

const Right = styled.div`
  width: 80vw;
  @media screen and (max-width: 767px) {
    width: 100vw;
    padding-left: 10px;
  }
`;
const Reaction = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  @media screen and (max-width: 479px) {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 0%;
  }
  @media (min-width: 480px) and (max-width: 768px) {
    flex-direction: row;
    margin-bottom: 0;
  }
`;
const ProfileImgConponent = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  padding: 10px;
  cursor: pointer;
  @media screen and (max-width: 479px) {
    width: 80px;
    height: 80px;
    margin-bottom: 0;
  }
`;
const Hello = styled.h2`
  white-space: nowrap;
  padding: 5px 0;
  font-weight: 500;
  font-size: 1.3rem;
  color: var(--font-ligthblack);
  span{
    color: #002C6D;
  }
  @media screen and (max-width: 479px) {
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
  @media screen and (max-width: 768px) {
    border-top: none;
    justify-content: center;
  }
`;
const ReactionDetail = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    border-top: none;
    justify-content: center;
    margin-top: -10px;
    flex-direction: row;
  }
`;

const NavDetail = styled.nav`
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 20px;
  color: #272727;
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
  @media screen and (max-width: 479px) {
    margin-right: 10px;
    background-color: var(--button-gray);
    padding: 10px 5px;
    font-size: 1rem;
    width: 100px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    white-space: nowrap;
    &:hover {
      background-color: var(--color-gray);
      color: white;
    }
    &.clicked {
      background-color: var(--color-gray);
      color: white;
    }
    &.clicked::after {
      background-color: var(--color-gray);
      color: white;
    }
  }
  @media (min-width: 480px) and (max-width: 768px) {
    margin-right: 10px;
    background-color: var(--button-gray);
    padding: 11px 10px;
    width: 120px;
    font-size: 1.1rem;
    border-radius: 5px;
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
console.log(getUserdata)
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
            src={`https://source.boringavatars.com/beam/40/${getUserdata?.nickname}?colors=FFAF51,FFC007,AAAAAA,0C8F8F,002C6D`}
            alt="avator"
            onclick={handleChangeImg}
          ></ProfileImgConponent>
          <Hello>안녕하세요,&nbsp;</Hello>
          <Hello><span>{getUserdata?.nickname}</span>&nbsp;님</Hello>
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
          </ReactionDetail>
        </Nav>
      </Left>
      <Right>
        <Routes>
          <Route
            path="/edit"
            element={<EditProfile getUserdata={getUserdata} />}
          ></Route>
          <Route path="/purchase/*" element={<PurchaseList />}></Route>
          <Route path="/myboard" element={<MyReview />}></Route>
          <Route path="/like" element={<Like />}></Route>
          <Route path="/purchase/:id" element={<PurchaseAll />}></Route>
        </Routes>
      </Right>
    </Container>
  );
};
export default Mypage;
