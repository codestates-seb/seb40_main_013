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
        <UserWriteTitle>?????????</UserWriteTitle>
        <UserWriteInput onChange={writeChangeNickName} />
        {nickNameConfirm ? (
          <ErrorDisplay>
            2????????? 8??? ?????? ?????? ?????? ?????? ?????? ????????? ??????????????????!
          </ErrorDisplay>
        ) : null}
        <UserWriteTitle isCheck={emailConfirm}>?????????</UserWriteTitle>
        <UserWriteInput onChange={writeChangeEmail} />
        {emailConfirm ? (
          <ErrorDisplay>???????????? ????????? ?????? ??????????????????!</ErrorDisplay>
        ) : null}
        <UserWriteTitle isCheck={pwdConfirm}>????????????</UserWriteTitle>
        <UserWriteInput type="password" onChange={writeChangePwd} />
        {pwdConfirm ? (
          <ErrorDisplay>
            ??????,??????,??????????????? ?????? ????????????????????? ?????? 8????????? 20????????????
            ??????????????????!
          </ErrorDisplay>
        ) : null}
        <UserWriteTitle isCheck={pwdAgainConfirm}>
          ???????????? ?????????
        </UserWriteTitle>
        <UserWriteInput type="password" onChange={writeChangePwdAgainCheck} />
        {pwdAgainConfirm ? (
          <ErrorDisplay>
            ?????? ???????????? ??????????????? ?????? ??????????????? ??????????????????!
          </ErrorDisplay>
        ) : null}
        <UserSubmitBtn onClick={signupSubmit}>?????? ??????</UserSubmitBtn>
      </SignupWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  width: 100%;
  height: 85vh;
  margin-top: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 330px) {
    width: 300px;
  }
`;

const SignupWrapper = styled.div`
  width: 80%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0px 0px 50px 0px;
  border: 1px solid #aaaaaa;
  box-shadow: 0 1px 5px 0 rgb(0 0 0 / 30%);
  border-radius: 7px;
  @media screen and (max-width: 500px) {
    height: 70vh;
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
  margin-top: 30px;
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
  margin-bottom: 50px;
`;

const ErrorDisplay = styled.div`
  width: 70%;
  margin-top: 10px;
  font-size: 15px;
  color: red;
`;
export default Signup;
