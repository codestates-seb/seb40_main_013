import React from "react";
import styled from "styled-components/macro";
import { ImFacebook } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";

function Footer() {
  return (
    <FooterWrapper>
      <FooterTopInformation>
        <div>
          <FooterSeviceContent>고객 센터</FooterSeviceContent>
          <FooterSeviceContent>02-0000-0000</FooterSeviceContent>
        </div>
        <FooterSocialBtnSpace>
          <FooterSocialBtn>BLOG</FooterSocialBtn>
          <FooterSocialBtn>
            <ImFacebook />
          </FooterSocialBtn>
          <FooterSocialBtn>
            <BsInstagram />
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
          대표:이유섭 개인정보관리책임 이경미 이사 info@dodot.co.kr
          사업자등록번호 : 114-81-97860 [ 사업자정보확인 ] 통신판매업신고 :
          2011-서울서초-2172 두닷본사 : 서울 서초구 방배중앙로 29길 7
        </FooterDownContent>
        <FooterDownContent>
          무통장 입금 계좌 : (주) 코다스디자인(두닷) / 국민은행
          367201-04-073607, 기업은행 233-050895-01-021 현금으로 구매시
          이지스올더게이트의 에스크로 서비스를 이용할 수 있습니다. [
          서비스가입사실확인 ]
        </FooterDownContent>
        <FooterDownContent>@ 2014 dodot. All Right Reserved.</FooterDownContent>
      </FooterDownContentSpace>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  width: 100%;
  height: 125px;
  background-color: #fcf9e9;
  padding: 20px 0px 10px 20px;
`;

const FooterTopInformation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 25px;
`;
const FooterSeviceContent = styled.div`
  font-size: 15px;
  font-weight: bolder;
  margin-bottom: 5px;
`;

const FooterSocialBtnSpace = styled.div`
  display: flex;
  width: 200px;
  height: 100%;
  font-weight: bolder;
  justify-content: space-between;
  align-items: center;
`;
const FooterSocialBtn = styled.div`
  font-size: 18px;
  cursor: pointer;
`;

const FooterSeviceAvailble = styled.div`
  font-size: 10px;
  color: #AAAAAA;
  margin-top: 10px;
`;

const FooterMidBtnMenu = styled.div`
  display: flex;
  align-items: center;
  width: 99%;
  height: 18px;
`;

const FooterMenuBtn = styled.div`
  cursor: pointer;
  margin: 0px 10px;
  font-size: 10px;
  font-weight: bolder;
  &:first-child {
    margin: 0px 10px 0px 0px;
  }
`;
const FooterDownContentSpace = styled.div`
  font-size: 10px;
  color: #AAAAAA;
`;
const FooterDownContent = styled.div`
  margin: 3px 0px;
`;

export default Footer;
