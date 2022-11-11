import React from "react";
import styled from "styled-components/macro";


function Signup() {
  return (
    <Wrapper>
      <SignupWrapper>
        <UserWriteTitle>닉네임</UserWriteTitle>
        <UserWriteInput />
        <UserWriteTitle>이메일</UserWriteTitle>
        <UserWriteInput />
        <UserWriteTitle>비밀번호</UserWriteTitle>
        <UserWriteInput />
        <UserWriteTitle>비밀번호 재확인</UserWriteTitle>
        <UserWriteInput />
        <UserSubmitBtn>회원 가입</UserSubmitBtn>
      </SignupWrapper>

    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  /* height: 58.5vh; */
  height: 75vh;
  border: 1px solid red;
  margin-top: 14px;
  display: flex;
  justify-content: center;
`;
const SignupWrapper = styled.div`
  width: 500px;
  height: 100%;
  border: 1px solid violet;
  margin-left: auto;
  margin-right: auto;
`;

const UserWriteTitle = styled.div`
  margin-top: 50px;
  height: 25px;
  font-size: 25px;
  font-weight: bold;
`;
const UserWriteInput = styled.input`
  margin-top: 10px;
  width: 98%;
  height: 30px;
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
`;

export default Signup;
