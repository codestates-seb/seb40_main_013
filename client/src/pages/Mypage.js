import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PurchaseList from "../components/mypages/PurchaseList";
import EditProfile from "../components/mypages/EditProfile";
import { Routes, Route, Link } from "react-router-dom";
import MyReview from "../components/mypages/MyReview";

const Container = styled.div`
  display: flex;
  height: 100%;
  margin-top: 180px;
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
`;
const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;
const Hello = styled.h2`
  white-space: nowrap;
  padding: 5px 0;
  font-weight: 500;
  font-size: 1.3rem;
  color: var(--font-ligthblack);
`;

const Nav = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-center-line);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavDetail = styled.nav`
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
        <ProfileImg
          src={`https://avatars.dicebear.com/api/bottts/1.svg?size=20`}
          alt="avator"
        ></ProfileImg>
        <Hello>안녕하세요,</Hello>
        <Hello>집가구싶다 님</Hello>
        <Nav>
          <Link to="purchase" style={{ textDecoration: "none" }}>
            <NavDetail
              name="purchaseTab"
              className={clicked === "구매 내역" ? "clicked" : ""}
              onClick={onClick}
            >
              구매 내역
            </NavDetail>
          </Link>
          <Link to="edit" style={{ textDecoration: "none" }}>
            <NavDetail
              name="editProfileTab"
              className={clicked === "정보 수정" ? "clicked" : ""}
              onClick={onClick}
            >
              정보 수정
            </NavDetail>
          </Link>
          <Link to="review" style={{ textDecoration: "none" }}>
            <NavDetail
              name="reviewListTab"
              className={clicked === "작성한 리뷰" ? "clicked" : ""}
              onClick={onClick}
            >
              작성한 리뷰
            </NavDetail>
          </Link>
        </Nav>
      </Left>
      <Routes>
        <Route path="/*" element={<PurchaseList />}></Route>
        <Route path="/purchase" element={<PurchaseList />}></Route>
        <Route path="/edit" element={<EditProfile />}></Route>
        <Route path="/review" element={<MyReview />}></Route>
      </Routes>
    </Container>
  );
};
export default Mypage;
