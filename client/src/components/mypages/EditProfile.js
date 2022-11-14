import React from "react";
import styled from "styled-components";


const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  border-radius: 5px;
  padding: 20px;
  width: 80%;
  border: 1px solid var(--color-center-line);
`;

const Label = styled.label`
  margin: 10px  15px 8px 0;
  color: var(--font-black);
`;
const Input = styled.input`
  padding: 8px 5px;
  width: 400px;
  margin-bottom: 20px;
  border: 1px solid var(--color-center-line);
  border-radius: 5px;
`;
//버튼
const Buttons = styled.div`
  display: flex;
  margin-top: 20px;
  width: 400px;
  justify-content: flex-end;
`;

const Edit = styled.button`
  color: var(--color-navy);
  border: 1px solid var(--color-navy);
  border-radius: 5px;
  padding: 7px 30px;
  margin-right: 10px;;
`;
const Delete = styled.button`
  color: white;
  background-color: var(--color-navy);
  border: none;
  border-radius: 5px;
  padding: 7px 30px;
`;
const EditProfile = ()=>{
  return (
    <Container>
      <Label for="email">이메일</Label>
      <Input name="email" disabled></Input>
      <Label for="nickname">닉네임</Label>
      <Input name="nickname"></Input>
      <Label for="password">비밀번호</Label>
      <Input name="password"></Input>
      <Label for="confirmPassword">비밀번호 확인</Label>
      <Input name="confirmPassword"></Input>
      <Label for="address">주소</Label>
      <Input name="address"></Input>
      <Label for="phone">휴대폰 번호</Label>
      <Input name="phone"></Input>
      <Buttons>
        <Edit>정보수정</Edit>
        <Delete>회원탈퇴</Delete>
      </Buttons>
    </Container>
  )
}

export default EditProfile;