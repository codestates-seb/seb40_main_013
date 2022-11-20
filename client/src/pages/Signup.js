import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { signUser } from "../reduxstore/slices/userSlice";
import {
  nickNameCheck,
  emailCheck,
  pwdCheck,
} from "../components/effectivenessCheck";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [writeNickName, setWirteNickName] = useState("");
  const [writeEmail, setWriteEmail] = useState("");
  const [writePwd, setWritePwd] = useState("");
  const [writePwdAgainCheck, setWritePwdAgainCheck] = useState("");
  const [nickNameConfirm, setNickNameConfirm] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [pwdConfirm, setPwdConfirm] = useState(false);
  const [pwdAgainConfirm, setPwdAgainConfirm] = useState(false);
  const data = useSelector((state) => state);
  console.log(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const writeChangeNickName = (e) => {
    setWirteNickName(e.target.value);
  };
  const writeChangeEmail = (e) => {
    setWriteEmail(e.target.value);
  };
  const writeChangePwd = (e) => {
    setWritePwd(e.target.value);
  };
  const writeChangePwdAgainCheck = (e) => {
    setWritePwdAgainCheck(e.target.value);
  };
  const signupSubmit = (id) => {
    if (
      writeNickName === "" ||
      writeEmail === "" ||
      writePwd === "" ||
      writePwdAgainCheck === ""
    ) {
      setNickNameConfirm(true);
      setEmailConfirm(true);
      setPwdConfirm(true);
      setPwdAgainConfirm(true);
    } else {
      setNickNameConfirm(false);
      setEmailConfirm(false);
      setPwdConfirm(false);
      setPwdAgainConfirm(false);
    }
    if (!nickNameCheck(writeNickName)) {
      setNickNameConfirm(true);
    } else {
      setNickNameConfirm(false);
    }
    if (!emailCheck(writeEmail)) {
      setEmailConfirm(true);
    } else {
      setEmailConfirm(false);
    }
    if (!pwdCheck(writePwd)) {
      setPwdConfirm(true);
    } else {
      setPwdConfirm(false);
    }
    if (writePwd === writePwdAgainCheck) {
      setPwdAgainConfirm(true);
    } else {
      setPwdAgainConfirm(false);
    }

    const signData = {
      email: writeEmail,
      password: writePwd,
      nickname: writeNickName,
    };

    if (
      writeNickName !== "" &&
      writeEmail !== "" &&
      writePwd !== "" &&
      writePwdAgainCheck !== "" &&
      nickNameConfirm === false &&
      emailConfirm === false &&
      pwdConfirm === false &&
      pwdAgainConfirm === false
    ) {
      dispatch(signUser({ signData, navigate }));
    }
  };

  return (
    <Wrapper>
      <SignupWrapper>
        <UserWriteTitle>닉네임</UserWriteTitle>
        <UserWriteInput onChange={writeChangeNickName} />
        {nickNameConfirm ? (
          <ErrorDisplay>
            2자이상 8자 이하 영어 또는 숫자 또는 한글로 입력해주세요!
          </ErrorDisplay>
        ) : null}
        <UserWriteTitle isCheck={emailConfirm}>이메일</UserWriteTitle>
        <UserWriteInput onChange={writeChangeEmail} />
        {emailConfirm ? (
          <ErrorDisplay>이메일의 형식에 맞게 작성해주세요!</ErrorDisplay>
        ) : null}
        <UserWriteTitle isCheck={pwdConfirm}>비밀번호</UserWriteTitle>
        <UserWriteInput onChange={writeChangePwd} />
        {pwdConfirm ? (
          <ErrorDisplay>
            문자,숫자,특수문자를 최소 하나씩사용하여 최소 8자로 만들어주세요!
          </ErrorDisplay>
        ) : null}
        <UserWriteTitle isCheck={pwdAgainConfirm}>
          비밀번호 재확인
        </UserWriteTitle>
        <UserWriteInput onChange={writeChangePwdAgainCheck} />
        {pwdAgainConfirm ? (
          <ErrorDisplay>
            위에 작성하신 비밀번호와 같은 비밀번호를 입력해주세요!
          </ErrorDisplay>
        ) : null}
        <UserSubmitBtn onClick={signupSubmit}>회원 가입</UserSubmitBtn>
      </SignupWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  /* height: 58vh; */
  height: 100vh;
  margin-top: 14px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 180px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100vh;
    /* min-width: 391px; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (max-width: 768px) {
    /* min-width: 391px; */
    width: 90%;
    height: 150vh;
    display: flex;
    justify-content: center;
    margin-left: 40px;
  }
  @media screen and (max-width: 391px) {
    /* min-width: 391px; */
    width: 90%;
    height: 190vh;
  }
`;
const SignupWrapper = styled.div`
  width: 500px;
  height: 100%;
  margin: 50px 0px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
  }
`;

const UserWriteTitle = styled.div`
  margin-top: 50px;
  height: 25px;
  font-size: 25px;
  font-weight: bold;
  &:nth-child(4) {
    margin-top: ${(props) => (props.isCheck ? "30px" : "50px")};
  }
  &:nth-child(7) {
    margin-top: ${(props) => (props.isCheck ? "30px" : "50px")};
  }
  &:nth-child(10) {
    margin-top: ${(props) => (props.isCheck ? "30px" : "50px")};
  }
`;
const UserWriteInput = styled.input`
  margin-top: 20px;
  width: 98%;
  height: 40px;
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 40px;
    margin-top: 20px;
    border: 1px solid black;
  }
`;

const UserSubmitBtn = styled.button`
  margin-top: 50px;
  width: 100%;
  height: 50px;
  background-color: var(--color-navy);
  border-radius: var(--border-radius);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const ErrorDisplay = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: red;
`;
export default Signup;
