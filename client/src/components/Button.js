import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import styled from "styled-components";
import { IoMdArrowRoundUp } from 'react-icons/io'
=======
import styled from "styled-components/macro";
import { IoMdArrowRoundUp } from "react-icons/io";
>>>>>>> dab95ec5c2f7f888c1e204edffd7f222bea84032

const ArrowUpButton = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 70px;
  height: 70px;
  font-size: 50px;
  color: white;
<<<<<<< HEAD
  background-color: #FFAF51;
=======
  background-color: #ffaf51;
>>>>>>> dab95ec5c2f7f888c1e204edffd7f222bea84032
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease-in;
  box-shadow: 1px 2px 2px gray;
  cursor: pointer;
  &.visible {
    opacity: 1;
    pointer-events: auto;
    border: 1px solid white;
  }
`;
const Button = () => {
<<<<<<< HEAD
  const [ScrollY, setScrollY] = useState(0);  // 스크롤값을 저장하기 위한 상태
=======
  const [ScrollY, setScrollY] = useState(0); // 스크롤값을 저장하기 위한 상태
>>>>>>> dab95ec5c2f7f888c1e204edffd7f222bea84032
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
<<<<<<< HEAD
    if(ScrollY > 200) 
    {
=======
    if (ScrollY > 200) {
>>>>>>> dab95ec5c2f7f888c1e204edffd7f222bea84032
      // 200 이상이면 버튼이 보이게
      setBtnStatus(!BtnStatus);
    } else {
      // 200 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
<<<<<<< HEAD
  }

  const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollY(0);  // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  }


  useEffect(() => {
    // console.log("ScrollY is ", ScrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
  }, [ScrollY])

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    }
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener('scroll', handleFollow); // addEventListener 함수를 삭제
    }
  })

return(
  <ArrowUpButton 
    className={BtnStatus ? "visible" : "topBtn"} // 버튼 노출 여부
    onClick={handleTop}  // 버튼 클릭시 함수 호출
    >
    <IoMdArrowRoundUp />
  </ArrowUpButton>
)

};

export default Button;
=======
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    // console.log("ScrollY is ", ScrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
  }, [ScrollY]);

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch(); // addEventListener 함수를 실행
    return () => {
      window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
    };
  });

  return (
    <ArrowUpButton
      className={BtnStatus ? "visible" : "topBtn"} // 버튼 노출 여부
      onClick={handleTop} // 버튼 클릭시 함수 호출
    >
      <IoMdArrowRoundUp />
    </ArrowUpButton>
  );
};

export default Button;
>>>>>>> dab95ec5c2f7f888c1e204edffd7f222bea84032
