import React, { useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../reduxstore/slices/userSlice";
import loginImg from "../imgs/chairImage.png";
import { AiOutlineCheckCircle } from "react-icons/ai";

function Login() {
  const [userWriteEmail, setUserWriteEmail] = useState("");
  const [userWritePwd, setUserWritePwd] = useState("");
  const [userWriteInput, setUserWriteInput] = useState(false);
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

  const clickLogin = () => {
    if (userWriteEmail === "" || userWritePwd === "") {
      setUserWriteInput(true);
    } else {
      setUserWriteInput(false);
    }

    let loginData = {
      email: userWriteEmail,
      password: userWritePwd,
    };
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
            <LoginInput placeholder="Password" onChange={writeChangePwd} />
          </LoginInputSpace>
          <LoginButton onClick={clickLogin}>로그인</LoginButton>
          <LoginInformationSpace>
            <LoginCheckSpace>
              <div>
                <AiOutlineCheckCircle />
              </div>
              <div>로그인 상태 유지</div>
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
  margin: 45px 0px 30px 0px;
  margin-top: 200px;
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LoginWrapper = styled.div`
  width: 740px;
  height: 100%;
  border: 1px solid var(--color-gray);
  display: flex;
  border-radius: 7px;
  @media screen and (max-width: 768px) {
    width: 60%;
    height: 90%;
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
  width: 400px;
  height: 100%;
  margin-right: 20px;
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
    height: 90%;
    min-width: 410px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
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
  margin-top: 20px;
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
`;

const LoginInformationSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 40px;
  font-size: 20px;
  color: var(--color-gray);
`;
const LoginCheckSpace = styled.div`
  width: 45%;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const LoginRouteSign = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  color: var(--color-gray);
  font-weight: 500;
  margin-top: 20px;
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
