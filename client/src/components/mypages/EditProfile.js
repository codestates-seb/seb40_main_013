import React from "react";
import styled from 'styled-components';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 40px;
  width: 80%;
  border: 1px solid var(--color-center-line);
  @media screen and (max-width: 390px){
    width: 100%;
    padding: 15px;
    margin: 40px 0;
  }
  @media (min-width: 390px) and (max-width: 767px){
    width: 100%;
    padding: 15px;
    margin: 40px 0;
  }
  @media (min-width: 768px) and (max-width: 1024px){
    width: 100%;
    padding: 15px 30px;
    margin: 40px 0;
  }
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
  transition: 1s;
  &:hover {
      outline: none;
      /* border-color: 1px solid #FFAF51; */
      box-shadow: 0px 0px 0px 1.5px #FFAF51;
    }
  &:focus-within {
      outline: none;
      /* border-color: 1px solid #FFAF51; */
      box-shadow: 0px 0px 0px 3px #FFAF51;
    }
  @media screen and (max-width: 390px){
    width: 100%;
    padding: 7px;
    margin: 5px 0;
  }
  @media (min-width: 391px) and (max-width: 767px){
    width: 100%;
    padding: 7px;
    margin: 5px 0;
  }
  @media (min-width: 768px) and (max-width: 1024px){
    width: 100%;
    padding: 10px 20px;
    margin: 15px 0;
  }
`;
//버튼
const Buttons = styled.div`
  display: flex;
  margin-top: 20px;
  width: 400px;
  justify-content: flex-end;
  @media screen and (max-width: 390px){
    width: 100%;
  }
  @media (min-width: 391px) and (max-width: 767px){
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px){
    width: 100%;
  }
`;

const Delete = styled.button`
  color: var(--color-navy);
  border: 1px solid var(--color-navy);
  border-radius: 5px;
  padding: 7px 30px;
  margin-right: 10px;
  @media screen and (max-width: 390px){
    padding: 5px 20px;
  }
`;
const Edit = styled.button`
  color: white;
  background-color: var(--color-navy);
  border: none;
  border-radius: 5px;
  padding: 7px 30px;
  @media screen and (max-width: 390px){
    padding: 5px 20px;
  }
`;
const EditProfile = ()=>{
  return (
    <Container>
      <Label for="email">이메일</Label>
      <Input name="email" disabled></Input>
      <Label for="nickname">닉네임</Label>
      <Input name="nickname"></Input>
      <Label for="password">현재 비밀번호</Label>
      <Input name="password"></Input>
      <Label for="password">비밀번호</Label>
      <Input name="password"></Input>
      <Label for="confirmPassword">비밀번호 확인</Label>
      <Input name="confirmPassword"></Input>
      <Label for="address">주소</Label>
      <Input name="address"></Input>
      <Label for="phone">휴대폰 번호</Label>
      <Input name="phone"></Input>
      <Buttons>
        <Delete>회원탈퇴</Delete>
        <Edit>정보수정</Edit>
      </Buttons>
    </Container>
  )
}

export default EditProfile;