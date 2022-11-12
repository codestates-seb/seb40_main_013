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
            <LoginInput placeholder="Email" />
            <LoginInput placeholder="Password" />
          </LoginInputSpace>
          <LoginButton>로그인</LoginButton>
          <LoginInformationSpace>
            <LoginCheckSpace>
              <div>
                <AiOutlineCheckCircle />
              </div>
              <div>로그인 상태 유지</div>
            </LoginCheckSpace>
            <div>이이디/비밀번호 찾기</div>
          </LoginInformationSpace>
          <LoginRouteSign>
            <div>Don`t have an account?</div>
            <LoginSignBtn>Sign Up</LoginSignBtn>
          </LoginRouteSign>
        </LoginContentSpace>
      </LoginWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  /* height: 58vh; */
  height: 50vh;
  display: flex;
  justify-content: center;
  margin: 45px 0px 30px 0px;
`;

const LoginWrapper = styled.div`
  width: 900px;
  height: 100%;
  border: 1px solid var(--color-gray);
  display: flex;
  border-radius: 7px;
`;

const LoginImg = styled.img`
  width: 400px;
  height: 100%;
  margin-right: 20px;
`;

const LoginContentSpace = styled.div`
  width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginTitle = styled.div`
  width: 100%;
  height: 50px;
  font-size: 25px;
  color: var(--color-navy);
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const LoginInputSpace = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const LoginInput = styled.input`
  width: 90%;
  height: 60px;
  border: none;
  border-bottom: 1px solid var(--color-gray);
  &:nth-child(1) {
    margin-bottom: 10px;
  }
`;

const LoginButton = styled.button`
  width: 90%;
  height: 45px;
  background-color: var(--color-navy);
  color: white;
  font-size: 20px;
  font-weight: bolder;
  margin-top: 40px;
`;

const LoginInformationSpace = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 40px;
  font-size: 13px;
  color: var(--color-gray);
`;
const LoginCheckSpace = styled.div`
  width: 105px;
  display: flex;
  justify-content: space-between;
`;

const LoginRouteSign = styled.div`
  display: flex;
  width: 100%;
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
`;

export default Login;
