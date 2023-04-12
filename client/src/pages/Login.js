import React, { useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, guestUser } from "../reduxstore/slices/userSlice";
import loginImg from "../imgs/chairImage.png";
import { AiOutlineCheckCircle } from "react-icons/ai";

function Login() {
  const [userWriteEmail, setUserWriteEmail] = useState("");
  const [userWritePwd, setUserWritePwd] = useState("");
  const [userWriteInput, setUserWriteInput] = useState(false);
  const [userStateCheck, setUserStateCheck] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const routeSignup = () => {
    navigate("/signup");
  };

  const writeChangeEmail = (e) => {
    setUserWriteEmail(e.target.value);
  };

  const writeChangePwd = (e) => {
    setUserWritePwd(e.target.value);
  };

  const clickState = () => {
    setUserStateCheck(!userStateCheck);
  };

  const clickGuest = (e) => {
    e.preventDefault();
    dispatch(guestUser({ navigate }));
  };

  const clickLogin = (e) => {
    e.preventDefault();
    let loginData = {};
    if (userWriteEmail === "" || userWritePwd === "") {
      setUserWriteInput(true);
    } else {
      setUserWriteInput(false);
    }
    if (userStateCheck === true) {
      loginData = {
        email: userWriteEmail,
        password: userWritePwd,
        keepState: true,
      };
    } else if (userStateCheck === false) {
      loginData = {
        email: userWriteEmail,
        password: userWritePwd,
      };
    }

    if (userWriteEmail !== "" && userWritePwd !== "" && userWriteInput === false) {
      dispatch(loginUser({ loginData, navigate }));
    }
  };

  // content

  return (
    <Wrapper>
      <LoginWrapper>
        <LoginImg src={loginImg} />
        <LoginContentSpace>
          <LoginTitle>Log In</LoginTitle>
          <LoginInputSpace>
            <LoginInput placeholder="Email" onChange={writeChangeEmail} autocomplete="off" />
            <LoginInput placeholder="Password" type="password" autocomplete="current-password" onChange={writeChangePwd} />
          </LoginInputSpace>
          <LoginButton onClick={clickLogin}>로그인</LoginButton>
          <LoginButton onClick={clickGuest} className="adminLogin">
            관리자 로그인
          </LoginButton>

          <LoginInformationSpace>
            <LoginCheckSpace isCheck={userStateCheck} onClick={clickState}>
              <LoginState />
              <LoginStateContent>로그인 상태 유지</LoginStateContent>
            </LoginCheckSpace>
          </LoginInformationSpace>
          <LoginRouteSign>
            <div>Don't have an account?</div>
            <LoginSignBtn onClick={routeSignup}>Sign Up</LoginSignBtn>
          </LoginRouteSign>
        </LoginContentSpace>
      </LoginWrapper>
      <Bubble>
        <BubbleContents>
          관리자 로그인 버튼을 누르면 <br /> 아이디, 비번 입력 없이 로그인 가능합니다
        </BubbleContents>
      </Bubble>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
  margin-top: 200px;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

const LoginWrapper = styled.div`
  width: 70%;
  max-width: 740px;
  height: 100%;
  border: 1px solid var(--color-gray);
  display: flex;
  border-radius: 7px;
  position: relative;

  @media screen and (max-width: 500px) {
    min-width: 240px;
    height: 95%;
    display: flex;
    justify-content: center;
  }
`;

const LoginImg = styled.img`
  width: 45%;
  height: 100%;
  /* @media screen and (max-width: 1023px) and (min-width: 768) {
    width: 50%;
  } */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LoginContentSpace = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LoginTitle = styled.div`
  width: 90%;
  height: 50px;
  font-size: 40px;
  color: var(--color-navy);
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  @media screen and (max-width: 1023px) {
    font-size: 4vw;
  }
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

const LoginInputSpace = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const LoginInput = styled.input`
  width: 85%;
  height: 60px;
  border: none;
  border-bottom: 1px solid var(--color-gray);
  font-size: 20px;
  &:nth-child(1) {
    margin-bottom: 10px;
  }
  @media screen and (max-width: 1023px) {
    font-size: 2vw;
  }
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const LoginButton = styled.button`
  width: 77%;
  height: 45px;
  border: 1px solid var(--color-navy);
  background-color: var(--color-navy);
  color: white;
  font-size: 20px;
  margin-top: 15px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  &.adminLogin {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: var(--color-navy);
  }
`;

const LoginInformationSpace = styled.div`
  display: flex;
  width: 77%;
  height: 40px;
  font-size: 18px;
  color: var(--color-gray);
  cursor: pointer;
`;

const LoginCheckSpace = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  color: ${(state) => (state.isCheck ? "#FFAF51" : "#AAAAAA")};
  margin-top: 10px;
`;

const LoginState = styled(AiOutlineCheckCircle)`
  margin-right: 5px;
  margin-top: -1.5px;
`;

const LoginStateContent = styled.div`
  font-size: 16px;
  @media screen and (max-width: 380px) {
    font-size: 12px;
  }
  @media (min-width: 381px) and (max-width: 767px) {
    font-size: 14px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`;

const LoginRouteSign = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  justify-content: center;
  align-items: center;
  color: var(--color-gray);
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 13px;
  @media (min-width: 1023px) {
    font-size: 15px;
  }
`;

const LoginSignBtn = styled.div`
  color: #ffaf51;
  background: none;
  border: none;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    color: var(--color-navy);
  }
`;
const Bubble = styled.div`
  width: 20%;
  height: 15%;
  position: relative;
  background: #ffffff;
  border: 4px solid var(--color-navy);
  border-radius: 15px;
  top: 55%;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after,
  &::before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &::after {
    border-color: rgba(255, 255, 255, 0);
    border-right-color: #ffffff;
    border-width: 25px;
    margin-top: -25px;
  }
  &::before {
    border-color: rgba(24, 0, 245, 0);
    border-right-color: var(--color-navy);
    border-width: 31px;
    margin-top: -31px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const BubbleContents = styled.p`
  color: var(--color-navy);
  font-size: 0.9vw;
  @media screen and (max-width: 767px) {
    font-size: 0.6vw;
  }
`;

export default Login;
