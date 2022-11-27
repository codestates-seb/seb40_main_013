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
  box-shadow: 1px 2px 2px gray;
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
  }

  const ShowButtonClick = () => {
    if(window.scrollY > 800) {
      // console.log('800이상이예요')
      setBtnStatus(true)
    } else {
      // console.log('800이하입니다')
      setBtnStatus(false)
    }
  }
  //윈도우가 높이가 800 이상일때 버튼이 보이도록
  useEffect(()=>{
    window.addEventListener("scroll", ShowButtonClick)
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
  )
};

export default Button;
