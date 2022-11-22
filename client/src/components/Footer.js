import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { BsGithub } from "react-icons/bs";

function Footer() {
  return (
    <FooterWrapper>
      <FooterTopInformation>
        <div>
          <FooterSeviceContent>고객 센터</FooterSeviceContent>
          <FooterSeviceContent>02-0000-0000</FooterSeviceContent>
        </div>
        <FooterSocialBtnSpace>
          <FooterSocialBtn href="https://github.com/codestates-seb/seb40_main_013">
            <BsGithub />
          </FooterSocialBtn>
        </FooterSocialBtnSpace>
      </FooterTopInformation>
      <FooterSeviceAvailble>
        평일 09:00-18:00 주말 09-00 - 14:00
      </FooterSeviceAvailble>
      <FooterMidBtnMenu>
        <FooterMenuBtn>이용 약관</FooterMenuBtn>
        <FooterMenuBtn>개인정보 취급방침</FooterMenuBtn>
        <FooterMenuBtn>회사 소개</FooterMenuBtn>
        <FooterMenuBtn>고객 문의</FooterMenuBtn>
        <FooterMenuBtn>공지 사항</FooterMenuBtn>
      </FooterMidBtnMenu>
      <FooterDownContentSpace>
        <FooterDownContent>
          팀장 : 홍승재 <br /> 백엔드 : 김경근, 허준열 <br /> 프론트 : 김서연
          ,노경민 , 임세영
        </FooterDownContent>
        <FooterDownContent>@ 2014 dodot. All Right Reserved.</FooterDownContent>
      </FooterDownContentSpace>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: #fcf9e9;
  padding: 20px 0px 10px 20px;
  @media screen and (max-width: 768px) {
    min-width: 391px;
  }
`;

const FooterTopInformation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 25px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const FooterSeviceContent = styled.div`
  font-size: 15px;
  font-weight: bolder;
  margin-bottom: 8px;
`;

const FooterSocialBtnSpace = styled.div`
  display: flex;
  width: 40px;
  height: 100%;
  font-weight: bolder;
  justify-content: space-between;
  align-items: center;
  /* @media screen and (max-width: 650px) {
    width: 35%;
  } */
  @media screen and (max-width: 360px) {
    width: 20%;
  }
`;

const FooterSeviceAvailble = styled.div`
  font-size: 13px;
  color: #aaaaaa;
  margin: 20px 0px 10px 0px;
`;

const FooterMidBtnMenu = styled.div`
  width: 100%;
  align-items: center;
  height: 18px;
  margin-bottom: 20px;
  @media screen and (max-width: 2000px) {
    max-width: 800px;
    display: flex;
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    max-width: 400px;
    min-width: 370px;
    display: flex;
  }
`;

const FooterMenuBtn = styled.div`
  cursor: pointer;
  margin: 10px 10px 5px 0px;
  font-size: 15px;
  font-weight: 500;
  margin-top: 10px;
  &:nth-child(5) {
    margin-right: 20px;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const FooterSocialBtn = styled.a`
  font-size: 30px;
  cursor: pointer;
  &:hover {
    color: #ffaf51;
  }
`;

const FooterDownContentSpace = styled.div`
  font-size: 10px;
  color: #aaaaaa;
`;
const FooterDownContent = styled.div`
  margin: 3px 0px;
  @media screen and (max-width: 768px) {
    &:nth-child(1) {
      display: none;
    }
    &:nth-child(2) {
      display: none;
    }
    &:nth-child(3) {
      font-size: 15px;
      margin-top: 20px;
    }
  }
`;

export default Footer;
