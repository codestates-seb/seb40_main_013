import React, { useState, useCallback } from "react";
import styled from "styled-components/macro";
import PurchaseList from "../components/mypages/PurchaseList";
import EditProfile from "../components/mypages/EditProfile";
import { Routes, Route, Link } from "react-router-dom";
import MyReview from "../components/mypages/MyReview";

const Container = styled.div`
  display: flex;
  height: 100%;
  margin-top: 180px;
  width: 80%;
  @media screen and (max-width: 390px) {
    flex-direction: column;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    flex-direction: column;
  }
`;

//왼쪽 nav bar
const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 20%;
  padding: 20px;
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
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  margin-right: 20px;
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
    color: #ffaf51;
  }
  &.clicked {
    color: #ffaf51;
  }
  &.clicked::after {
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
    padding: 20px 10px;
    width: 120px;
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
  const [clicked, setClicked] = useState();

  const onClick = useCallback((e) => {
    const text = e.target.innerText;
    setClicked(text);
  }, []);

  return (
    <Container>
      <Left>
        <Reaction>
          <ProfileImg
            src={`https://avatars.dicebear.com/api/bottts/1.svg?size=20`}
            alt="avator"
          ></ProfileImg>
          <Hello>안녕하세요,</Hello>
          <Hello>집가구싶다 님</Hello>
        </Reaction>
        <Nav>
          <ReactionDetail>
            <Link to="purchase" style={{ textDecoration: "none" }}>
              <NavDetail
                name="purchaseTab"
                className={clicked === "구매 내역" ? "clicked" : ""}
                onClick={onClick}
              >
                구매 내역
              </NavDetail>
            </Link>
            <Link to="*" style={{ textDecoration: "none" }}>
              <NavDetail
                name="editProfileTab"
                className={clicked === "정보 수정" ? "clicked" : ""}
                onClick={onClick}
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
                onClick={onClick}
              >
                좋아요
              </NavDetail>
            </Link>
            <Link to="myboard" style={{ textDecoration: "none" }}>
              <NavDetail
                name="myboard"
                className={clicked === "작성한 리뷰" ? "clicked" : ""}
                onClick={onClick}
              >
                작성한 리뷰
              </NavDetail>
            </Link>
          </ReactionDetail>
        </Nav>
      </Left>
      <Routes>
        <Route path="/*" element={<EditProfile />}></Route>
        <Route path="/purchase" element={<PurchaseList />}></Route>
        <Route path="/myboard" element={<MyReview />}></Route>
      </Routes>
    </Container>
  );
};
export default Mypage;
