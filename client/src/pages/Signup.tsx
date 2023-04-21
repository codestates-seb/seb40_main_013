import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../reduxstore/hooks";
import { signUser } from "../reduxstore/slices/userSlice";
import { nickNameCheck, emailCheck, pwdCheck } from "../components/common/effectivenessCheck";
import * as Style from "../styles/Signup";

function Signup() {
  const [nickNameConfirm, setNickNameConfirm] = useState<boolean>(false);
  const [emailConfirm, setEmailConfirm] = useState<boolean>(false);
  const [pwdConfirm, setPwdConfirm] = useState<boolean>(false);
  const [pwdAgainConfirm, setPwdAgainConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const writeNick = formData.get("nick") as string;
    const writeEmail = formData.get("email") as string;
    const writePassword = formData.get("pwd") as string;
    const writePasswordCheck = formData.get("pwdCheck") as string;

    void signup(writeNick, writeEmail, writePassword, writePasswordCheck);
  };
  const signup = async (writeNick: string, writeEmail: string, writePwd: string, writePwdCheck: string) => {
    if (writeNick === "" || !nickNameCheck(writeNick)) {
      setNickNameConfirm(true);
    } else {
      setNickNameConfirm(false);
    }
    if (writeEmail === "" || !emailCheck(writeEmail)) {
      setEmailConfirm(true);
    } else {
      setEmailConfirm(false);
    }
    if (writePwd === "" || !pwdCheck(writePwd)) {
      setPwdConfirm(true);
    } else {
      setPwdConfirm(false);
    }
    if (writePwd !== writePwdCheck) {
      setPwdAgainConfirm(true);
    } else {
      setPwdAgainConfirm(false);
    }
    const signData = {
      nickname: writeNick,
      email: writeEmail,
      password: writePwd,
    };
    if (!nickNameConfirm && !emailConfirm && !pwdConfirm && !pwdAgainConfirm) {
      void dispatch(signUser({ signData, navigate }));
    }
  };

  return (
    <Style.Wrapper onSubmit={signupSubmit}>
      <Style.SignupWrapper>
        <Style.UserWriteTitle>닉네임</Style.UserWriteTitle>
        <Style.UserWriteInput name="nick" />
        {nickNameConfirm ? <Style.ErrorDisplay>2자이상 8자 이하 영어 또는 숫자 또는 한글로 입력해주세요!</Style.ErrorDisplay> : null}
        <Style.UserWriteTitle isCheck={emailConfirm}>이메일</Style.UserWriteTitle>
        <Style.UserWriteInput name="email" />
        {emailConfirm ? <Style.ErrorDisplay>이메일의 형식에 맞게 작성해주세요!</Style.ErrorDisplay> : null}
        <Style.UserWriteTitle isCheck={pwdConfirm}>비밀번호</Style.UserWriteTitle>
        <Style.UserWriteInput type="password" name="pwd" />
        {pwdConfirm ? <Style.ErrorDisplay>문자,숫자,특수문자를 최소 하나씩사용하여 최소 8자이상 20자이하로 만들어주세요!</Style.ErrorDisplay> : null}
        <Style.UserWriteTitle isCheck={pwdAgainConfirm}>비밀번호 재확인</Style.UserWriteTitle>
        <Style.UserWriteInput type="password" name="pwdCheck" />
        {pwdAgainConfirm ? <Style.ErrorDisplay>위에 작성하신 비밀번호와 같은 비밀번호를 입력해주세요!</Style.ErrorDisplay> : null}
        <Style.UserSubmitBtn>회원 가입</Style.UserSubmitBtn>
      </Style.SignupWrapper>
    </Style.Wrapper>
  );
}

export default Signup;
