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
  const signupSubmit = (e) => {
    e.preventDefault();
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
    if (writePwd !== writePwdAgainCheck) {
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
        <UserWriteInput type="password" onChange={writeChangePwd} />
        {pwdConfirm ? (
          <ErrorDisplay>
            문자,숫자,특수문자를 최소 하나씩사용하여 최소 8자이상 20자이하로
            만들어주세요!
          </ErrorDisplay>
        ) : null}
        <UserWriteTitle isCheck={pwdAgainConfirm}>
          비밀번호 재확인
        </UserWriteTitle>
        <UserWriteInput type="password" onChange={writeChangePwdAgainCheck} />
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

const Wrapper = styled.form`
  width: 100%;
  /* height: 58vh; */
  margin-top: 100px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 330px) {
    width: 300px;
    margin-top: 160px;
    margin-bottom: 80px;
  }
`;
const SignupWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;

  @media screen and (max-width: 400px) {
    height: 100%;
  }
`;

const UserWriteTitle = styled.div`
  margin-top: 50px;
  width: 70%;
  height: 25px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  &:nth-child(4) {
    margin-top: ${(props) => (props.isCheck ? "15px" : "40px")};
  }
  &:nth-child(7) {
    margin-top: ${(props) => (props.isCheck ? "15px" : "40px")};
  }
  &:nth-child(10) {
    margin-top: ${(props) => (props.isCheck ? "15px" : "40px")};
  }
`;
const UserWriteInput = styled.input`
  margin-top: 10px;
  width: 70%;
  height: 35px;
  padding-left: 10px;
  border: 1px solid #aaaaaa;

  @media screen and (max-width: 768px) {
    width: 70%;
    margin-top: 10px;
    border: 1px solid #aaaaaa;
  }
`;

const UserSubmitBtn = styled.button`
  margin-top: 50px;
  width: 70%;
  height: 47px;
  cursor: pointer;
  background-color: var(--color-navy);
  border-radius: var(--border-radius);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

const ErrorDisplay = styled.div`
  width: 70%;
  margin-top: 10px;
  font-size: 15px;
  color: red;
`;
export default Signup;
