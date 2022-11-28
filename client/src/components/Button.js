import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { IoMdArrowRoundUp } from "react-icons/io";

const ArrowUpButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 70px;
  height: 70px;
  font-size: 50px;
  color: white;
  background-color: #ffaf51;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease-in;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 30%);
  z-index: 10;
  cursor: pointer;
  &.visible {
    opacity: 1;
    pointer-events: auto;
  }
`;
const Button = () => {
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    setBtnStatus(false);
  };

  const ShowButtonClick = () => {
    if (window.scrollY > 800) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };
  //윈도우가 높이가 800 이상일때 버튼이 보이도록
  useEffect(() => {
    window.addEventListener("scroll", ShowButtonClick);
    return () => {
      window.removeEventListener("scroll", ShowButtonClick); // addEventListener 함수를 삭제
    };
  });

  return (
    <ArrowUpButton
      className={BtnStatus ? "visible" : "topBtn"} // 버튼 노출 여부
      onClick={handleTop} // 버튼 클릭시 함수 호출
      type="button"
    >
      <IoMdArrowRoundUp />
    </ArrowUpButton>
  );
};

export default Button;
