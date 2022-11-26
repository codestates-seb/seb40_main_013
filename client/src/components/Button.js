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
  /* box-shadow: 1px 2px 2px gray; */
  cursor: pointer;
`;
const Button = () => {
  const [showButton, setShowButton] = useState(false);

  //onclick 이벤트
  const handleTop = () => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
  }

  //윈도우가 높이가 800 이상일때 버튼이 보이도록
  useEffect(()=>{
    const ShowButtonClick = () => {
      if(window.scrollY > 170) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }
    window.addEventListener("scroll", ShowButtonClick)
    return () => {
      window.removeEventListener("scroll", ShowButtonClick)
    }
  }, [])

  return showButton ? (
        <ArrowUpButton
          onClick={handleTop} // 버튼 클릭시 함수 호출
          type="button"
        >
          <IoMdArrowRoundUp />
        </ArrowUpButton>
  ) : null
};

export default Button;
