import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { BsGithub } from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";
import { guestUser } from "../reduxstore/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clickGuest = () => {
    dispatch(guestUser({ navigate }));
  };

  return (
    <FooterWrapper>
      <section>
        <FooterSeviceContent>연락 가능한 시간</FooterSeviceContent>
        <div>
          <div>
            <FooterSocialBtn href="https://github.com/codestates-seb/seb40_main_013">
              <GithubBtn />
            </FooterSocialBtn>
            <FooterSocialBtn onClick={clickGuest}>
              <PersonBtn />
            </FooterSocialBtn>
          </div>
        </div>
      </section>
      <FooterSeviceAvailble>
        회의 : 10:00, 17:00 &nbsp;&nbsp;코어타임 : 13:00 ~ 17:00
      </FooterSeviceAvailble>
      <FooterMidBtnMenu>
        <FooterMenuBtn>이용 약관</FooterMenuBtn>
        <FooterMenuBtn>개인정보 취급방침</FooterMenuBtn>
        <FooterMenuBtn>회사 소개</FooterMenuBtn>
        <FooterMenuBtn>고객 문의</FooterMenuBtn>
        <FooterMenuBtn>공지 사항</FooterMenuBtn>
      </FooterMidBtnMenu>
      <FooterDownContentSpace>
        <FooterDownContentSpan>
          백엔드 : 김경근, 허준열, 홍승재
        </FooterDownContentSpan>
        <FooterDownContentSpan>
          프론트 : 김서연, 노경민, 임세영
        </FooterDownContentSpan>
        <FooterDownContent>
          @ 2022 집 가고 싶다. All Right Reserved.
        </FooterDownContent>
      </FooterDownContentSpace>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  width: 100vw;
  height: 130px;
  background-color: #fcf9e9;
  padding: 10px 20px;
  section {
    display: flex;
    justify-content: space-between;
  }
`;

const FooterSeviceContent = styled.div`
  font-size: 15px;
  font-weight: bolder;
  display: flex;
  align-items: center;
  color: #272727;
`;

const FooterSeviceAvailble = styled.div`
  padding-top: 4px;
  font-size: 13px;
  color: #272727;
`;

const FooterMidBtnMenu = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 18px;
  margin-top: 10px;
  @media screen and (max-width: 471px) {
    display: none;
  }
`;

const FooterMenuBtn = styled.div`
  font-size: 15px;
  font-weight: 500;
  padding-right: 20px;
`;

const FooterSocialBtn = styled.a``;

const GithubBtn = styled(BsGithub)`
  width: 35px;
  height: 35px;
  cursor: pointer;
  padding-right: 10px;
  color: #515151;
  @media screen and (max-width: 767px) {
    width: 22px;
    height: 22px;
    padding-right: 5px;
  }
`;

const PersonBtn = styled(IoMdPerson)`
  width: 35px;
  height: 35px;
  cursor: pointer;
  padding-right: 10px;
  color: #515151;
  @media screen and (max-width: 767px) {
    width: 22px;
    height: 22px;
    padding-right: 5px;
  }
`;

const FooterDownContentSpace = styled.div`
  margin-top: 7px;
  font-size: 10px;
  color: #aaaaaa;
`;

const FooterDownContentSpan = styled.span`
  margin-right: 10px;
`;
const FooterDownContent = styled.div`
  margin-top: 8px;
`;

export default Footer;
