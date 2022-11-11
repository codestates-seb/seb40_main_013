import React, { useState } from "react";
import styled from "styled-components/macro";
import { AiOutlineMail } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 450px;
  border-radius: 5px;
  height: 70vh;
  margin: 50px;
`;

//Tab 메뉴
const Tab = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
`;
const TabMenu = styled.li`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 10px 30px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-size: 1.5rem;
  width: 100%;
  background-color: #e6e6e6;
  cursor: pointer;
  color: #545454;
  &.isActive {
    background-color: #ffaf51;
  }
`;

//content
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  border: 1px solid #ffaf51;
  border-end-start-radius: 5px;
  border-end-end-radius: 5px;
`;

const LoginForm = styled.form`
  margin-top: 30px;
`;
const Input = styled.input`
  padding: 10px 75px 10px 10px;
  font-size: 1rem;
`;

const Check = styled.label`
  display: flex;
  margin: 20px 0;
`;
const Checkbox = styled.input`
  color: #545454;
`;
const IsLogin = styled.h4`
  color: #545454;
`;
const Button = styled.button`
  background-color: #ffaf51;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  padding: 10px 30px;
  margin-bottom: 30px;
`;

//비밀번호 찾기, 아이디찾기, 회원가입
const Bottoms = styled.div``;
const Content2 = styled.div`
  display: flex;
  margin: 20px;
`;
const Bottom = styled.h4``;
function Login() {
  const [clicked, setClicked] = useState(0);
  const [checked, setChecked] = useState(false);

  //tab 클릭 이벤트
  const clickTabHandler = (index) => {
    setClicked(index);
    console.log("click!!!", index);
  };

  //로그인 유지 핸들러
  const checkLoginHandler = () => {
    console.log(checked);
    setChecked(!checked);
  };
  //content
  const tabContentArr = [
    {
      tabTitle: (
        <TabMenu
          className={clicked === 0 ? "isActive" : ""}
          onClick={() => clickTabHandler(0)}
        >
          {" "}
          일반 로그인
        </TabMenu>
      ),
      tabContent: (
        <Content2>
          <Bottom>비밀번호 찾기&nbsp;&nbsp;|</Bottom>
          <Bottom> &nbsp;&nbsp;아이디 찾기&nbsp;&nbsp;|</Bottom>
          <Bottom>&nbsp;&nbsp;회원가입</Bottom>
        </Content2>
      ),
    },
    {
      tabTitle: (
        <TabMenu
          key={`${clicked}`}
          className={clicked === 1 ? "isActive" : ""}
          onClick={() => clickTabHandler(1)}
        >
          {" "}
          판매자 로그인
        </TabMenu>
      ),
      tabContent: (
        <Content2>비밀번호 찾기 | 아이디 찾기 | 판매자 회원가입</Content2>
      ),
    },
  ];
  return (
    <Container>
      <Tab>
        {tabContentArr.map((content, index) => {
          return content.tabTitle;
        })}
      </Tab>
      <Content>
        <LoginForm for="email">
          {/* <AiOutlineMail /> */}
          <Input name="email" placeholder="email 을 입력해주세요" />
        </LoginForm>
        <LoginForm>
          <Input name="password" placeholder="비밀번호를 입력해주세요" />
        </LoginForm>
        <Check>
          <Checkbox
            type="checkbox"
            name="checked"
            onClick={checkLoginHandler}
          />
          <IsLogin name="isLogin">로그인 상태 유지</IsLogin>
        </Check>
        <Button name="loginBtn">로그인 하기</Button>
      </Content>
      <Bottoms>{tabContentArr[clicked].tabContent}</Bottoms>
    </Container>
  );
}

export default Login;
