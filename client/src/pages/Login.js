import React, { useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../reduxstore/slices/userSlice";
import loginImg from "../imgs/chairImage.png";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { guestUser } from "../reduxstore/slices/userSlice";

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

  const clickLogin = () => {
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

    if (
      userWriteEmail !== "" &&
      userWritePwd !== "" &&
      userWriteInput === false
    ) {
      dispatch(loginUser({ loginData, navigate }));
    }
  };

  //content

  return (
    <Wrapper>
      <LoginWrapper>
        <LoginImg src={loginImg} />
        <LoginContentSpace>
          <LoginTitle>Log In</LoginTitle>
          <LoginInputSpace>
            <LoginInput placeholder="Email" onChange={writeChangeEmail} />
            <LoginInput
              placeholder="Password"
              type="password"
              onChange={writeChangePwd}
            />
          </LoginInputSpace>
          <LoginButton onClick={clickLogin}>로그인</LoginButton>
          <LoginInformationSpace>
            <LoginCheckSpace>
              <LoginState isCheck={userStateCheck} onClick={clickState}>
                <AiOutlineCheckCircle />
              </LoginState>
              <LoginStateContent>로그인 상태 유지</LoginStateContent>
            </LoginCheckSpace>
          </LoginInformationSpace>
          <LoginRouteSign>
            <div>Don`t have an account?</div>
            <LoginSignBtn onClick={routeSignup}>Sign Up</LoginSignBtn>
          </LoginRouteSign>
        </LoginContentSpace>
      </LoginWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  justify-content: center;
  margin-bottom: 120px;
  margin-top: 24.5vh;
  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 391px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (max-width: 390px) and (min-height: 844px) {
    min-width: 391px;
    width: 100%;
    height: 190vh;
  }
`;

const LoginWrapper = styled.div`
  width: 740px;
  height: 100%;
  border: 1px solid var(--color-gray);
  display: flex;
  border-radius: 7px;
  @media screen and (max-width: 1023px) {
    min-width: 391px;
    width: 72%;
  }
  @media screen and (max-width: 768px) {
    width: 60%;
    height: 100%;
    min-width: 390px;
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 400px) {
    width: 300px;
    height: 90%;
    min-width: 360px;
    display: flex;
    justify-content: center;
  }
`;

const LoginImg = styled.img`
  width: 500px;
  height: 100%;
  /* @media screen and (max-width: 1023px) and (min-width: 768) {
    width: 50%;
  } */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LoginContentSpace = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 430px;
    min-width: 410px;
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
  margin-top: 40px;
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
  width: 80%;
  height: 45px;
  background-color: var(--color-navy);
  color: white;
  font-size: 20px;
  font-weight: bolder;
  margin-top: 40px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
<<<<<<< HEAD

=======
>>>>>>> 2d63094aa5edcf3aa5f0c1aed1170e0a6a7bb238
  @media screen and (max-width: 1023px) {
    font-size: 2vw;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const LoginInformationSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 40px;
  font-size: 20px;
  color: var(--color-gray);
  @media screen and (max-width: 1023px) {
    font-size: 2vw;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
const LoginCheckSpace = styled.div`
  width: 53%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 50px;
  @media screen and (max-width: 1023px) {
    width: 55%;
    font-size: 2vw;
    margin-left: 40px;
  }
  @media screen and (max-width: 790px) {
    width: 60%;
    margin-left: 30px;
  }
  @media screen and (max-width: 768px) {
    width: 60%;
    font-size: 20px;
    margin-left: 20px;
  }
`;
const LoginState = styled.div`
  color: ${(state) => (state.isCheck ? "#FFAF51" : "#AAAAAA")};
`;
const LoginStateContent = styled.div`
  font-size: 20px;
  @media screen and (max-width: 1023px) {
    font-size: 15px;
  }
  @media screen and (max-width: 790px) {
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const LoginRouteSign = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  color: var(--color-gray);
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  @media screen and (max-width: 1023px) {
    width: 100%;
    font-size: 1.5vw;
  }
  @media screen and (max-width: 790px) {
    width: 60%;
    margin-left: 60px;
  }
  @media screen and (max-width: 768px) {
    width: 70%;
    font-size: 20px;
    margin-right: 50px;
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
    font-weight: bolder;
  }
`;

export default Login;
