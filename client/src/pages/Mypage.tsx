import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../reduxstore/hooks";
import { Routes, Route, Link } from "react-router-dom";
import { getUser } from "../reduxstore/slices/userSlice";
import * as Style from "../styles/mypage/MypageStyle";
import PurchaseList from "../components/mypages/PurchaseList";
import EditProfile from "../components/mypages/EditProfile";
import MyReview from "../components/mypages/MyReview";
import ProfileImg from "../components/mypages/ProfileImg";
import PurchaseAll from "../components/mypages/PurchaseDetail";
import Like from "../components/mypages/Like";

const Mypage = () => {
  const dispatch = useAppDispatch();
  const getUserdata = useAppSelector((state) => state.user.users);
  // tab click
  const [clicked, setClicked] = useState("");

  // user 정보 받아오기
  useEffect(() => {
    void dispatch(getUser());
  }, []);

  // 탭 클릭 이벤트
  const tabClick = (e) => {
    const text = e.target.innerText;
    setClicked(text);
  };

  // 프로필 이미지 바꾸기
  const handleChangeImg = () => {
    ProfileImg();
  };

  return (
    <Style.Container>
      <Style.Left>
        <Style.Reaction>
          <Style.ProfileImgConponent
            src={`https://source.boringavatars.com/beam/40/${getUserdata?.nickname ?? ""}?colors=FFAF51,FFC007,AAAAAA,0C8F8F,002C6D`}
            alt="avator"
            onClick={handleChangeImg}
          ></Style.ProfileImgConponent>
          <Style.Hello>안녕하세요,&nbsp;</Style.Hello>
          <Style.Hello>
            <span>{getUserdata?.nickname}</span>&nbsp;님
          </Style.Hello>
        </Style.Reaction>
        <Style.Nav>
          <Style.ReactionDetail>
            <Link to="purchase" style={{ textDecoration: "none" }}>
              <Style.NavDetail className={clicked === "구매 내역" ? "clicked" : ""} onClick={tabClick}>
                구매 내역
              </Style.NavDetail>
            </Link>
            <Link to="edit" style={{ textDecoration: "none" }}>
              <Style.NavDetail className={clicked === "정보 수정" ? "clicked" : ""} onClick={tabClick}>
                정보 수정
              </Style.NavDetail>
            </Link>
          </Style.ReactionDetail>
          <Style.ReactionDetail>
            <Link to="like" style={{ textDecoration: "none" }}>
              <Style.NavDetail className={clicked === "좋아요" ? "clicked" : ""} onClick={tabClick}>
                좋아요
              </Style.NavDetail>
            </Link>
            <Link to="myboard" style={{ textDecoration: "none" }}>
              <Style.NavDetail className={clicked === "작성한 리뷰" ? "clicked" : ""} onClick={tabClick}>
                작성한 리뷰
              </Style.NavDetail>
            </Link>
          </Style.ReactionDetail>
        </Style.Nav>
      </Style.Left>
      <Style.Right>
        <Routes>
          <Route path="/edit" element={<EditProfile getUserdata={getUserdata} />}></Route>
          <Route path="/purchase/*" element={<PurchaseList />}></Route>
          <Route path="/myboard" element={<MyReview />}></Route>
          <Route path="/like" element={<Like />}></Route>
          <Route path="/purchase/:id" element={<PurchaseAll />}></Route>
        </Routes>
      </Style.Right>
    </Style.Container>
  );
};
export default Mypage;
