import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../reduxstore/hooks";
import { loginUser, guestUser } from "../reduxstore/slices/userSlice";
import loginImg from "../imgs/chairImage.png";
import * as Style from "../styles/Login";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userWriteInput, setUserWriteInput] = useState<boolean>(false);
  const [userStateCheck, setUserStateCheck] = useState<boolean>(false);
  const routeSignup = () => {
    navigate("/signup");
  };
  const clickState = () => {
    setUserStateCheck(!userStateCheck);
  };

  const clickGuest = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    void dispatch(guestUser({ navigate }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const writeEmail = formData.get("email") as string;
    const writePassword = formData.get("pwd") as string;
    void login(writeEmail, writePassword);
  };

  const login = async (writeEmail: string, writePassword: string) => {
    let loginData = {};
    if (writeEmail === "" || writePassword === "") {
      setUserWriteInput(true);
    } else {
      setUserWriteInput(false);
    }
    if (userStateCheck) {
      loginData = {
        email: writeEmail,
        password: writePassword,
        keepState: true,
      };
    } else if (!userStateCheck) {
      loginData = {
        email: writeEmail,
        password: writePassword,
      };
    }
    if (writeEmail !== "" && writePassword !== "" && !userWriteInput) {
      void dispatch(loginUser({ loginData, navigate }));
    }
  };
  return (
    <Style.Wrapper onSubmit={onSubmit}>
      <Style.LoginWrapper>
        <Style.LoginImg src={loginImg} />
        <Style.LoginContentSpace>
          <Style.LoginTitle>Log In</Style.LoginTitle>
          <Style.LoginInputSpace>
            <Style.LoginInput placeholder="Email" name="email" />
            <Style.LoginInput placeholder="Password" type="password" name="pwd" />
          </Style.LoginInputSpace>
          <Style.LoginButton>로그인</Style.LoginButton>
          <Style.LoginButton className="adminLogin" onClick={clickGuest}>
            관리자 로그인
          </Style.LoginButton>

          <Style.LoginInformationSpace>
            <Style.LoginCheckSpace onClick={clickState}>
              <Style.LoginState />
              <Style.LoginStateContent>로그인 상태 유지</Style.LoginStateContent>
            </Style.LoginCheckSpace>
          </Style.LoginInformationSpace>
          <Style.LoginRouteSign>
            <div>Don't have an account?</div>
            <Style.LoginSignBtn onClick={routeSignup}>Sign Up</Style.LoginSignBtn>
          </Style.LoginRouteSign>
        </Style.LoginContentSpace>
      </Style.LoginWrapper>
      <Style.Bubble>
        <Style.BubbleContents>
          관리자 로그인 버튼을 누르면 <br /> 아이디, 비번 입력 없이 로그인 가능합니다
        </Style.BubbleContents>
      </Style.Bubble>
    </Style.Wrapper>
  );
}

export default Login;
