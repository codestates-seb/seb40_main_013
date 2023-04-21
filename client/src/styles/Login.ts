import styled from "styled-components/macro";
import { AiOutlineCheckCircle } from "react-icons/ai";

export const Wrapper = styled.form`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
  margin-top: 200px;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const LoginWrapper = styled.div`
  width: 70%;
  max-width: 740px;
  height: 100%;
  border: 1px solid var(--color-gray);
  display: flex;
  border-radius: 7px;
  position: relative;

  @media screen and (max-width: 500px) {
    min-width: 240px;
    height: 95%;
    display: flex;
    justify-content: center;
  }
`;

export const LoginImg = styled.img`
  width: 45%;
  height: 100%;
  /* @media screen and (max-width: 1023px) and (min-width: 768) {
    width: 50%;
  } */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LoginContentSpace = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 430px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LoginTitle = styled.div`
  width: 90%;
  height: 50px;
  font-size: 40px;
  color: var(--color-navy);
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  @media screen and (max-width: 1023px) {
    font-size: 4vw;
  }
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

export const LoginInputSpace = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const LoginInput = styled.input`
  width: 85%;
  height: 60px;
  border: none;
  border-bottom: 1px solid var(--color-gray);
  font-size: 20px;
  &:nth-child(1) {
    margin-bottom: 10px;
  }
  @media screen and (max-width: 1023px) {
    font-size: 2vw;
  }
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

export const LoginButton = styled.button`
  width: 77%;
  height: 45px;
  border: 1px solid var(--color-navy);
  background-color: var(--color-navy);
  color: white;
  font-size: 20px;
  margin-top: 15px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
  &.adminLogin {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: var(--color-navy);
  }
`;

export const LoginInformationSpace = styled.div`
  display: flex;
  width: 77%;
  height: 40px;
  font-size: 18px;
  color: var(--color-gray);
  cursor: pointer;
`;

export const LoginCheckSpace = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 10px;
`;

export const LoginState = styled(AiOutlineCheckCircle)`
  margin-right: 5px;
  margin-top: -1.5px;
`;

export const LoginStateContent = styled.div`
  font-size: 16px;
  @media screen and (max-width: 380px) {
    font-size: 12px;
  }
  @media (min-width: 381px) and (max-width: 767px) {
    font-size: 14px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`;

export const LoginRouteSign = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  justify-content: center;
  align-items: center;
  color: var(--color-gray);
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 13px;
  @media (min-width: 1023px) {
    font-size: 15px;
  }
`;

export const LoginSignBtn = styled.div`
  color: #ffaf51;
  background: none;
  border: none;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    color: var(--color-navy);
  }
`;
export const Bubble = styled.div`
  width: 20%;
  height: 15%;
  position: relative;
  background: #ffffff;
  border: 4px solid var(--color-navy);
  border-radius: 15px;
  top: 55%;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after,
  &::before {
    right: 100%;
    top: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &::after {
    border-color: rgba(255, 255, 255, 0);
    border-right-color: #ffffff;
    border-width: 25px;
    margin-top: -25px;
  }
  &::before {
    border-color: rgba(24, 0, 245, 0);
    border-right-color: var(--color-navy);
    border-width: 31px;
    margin-top: -31px;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const BubbleContents = styled.p`
  color: var(--color-navy);
  font-size: 0.9vw;
  @media screen and (max-width: 767px) {
    font-size: 0.6vw;
  }
`;
