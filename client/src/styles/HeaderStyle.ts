import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const HeaderBlock = styled.header`
  width: 100vw;
  height: 129px;
  color: var(--color-gray);
  div {
    display: flex;
  }
  .top {
    justify-content: end;
    margin: 7px 20px 7px 10px;
  }
  position: fixed;
  background-color: white;
  z-index: 12;
`;

export const Logo = styled(Link)`
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: center;
  div {
    font-size: 43px;
    color: var(--color-navy);
    @media screen and (max-width: 380px) {
      font-size: 28px;
    }
    @media (min-width: 381px) and (max-width: 767px) {
      font-size: 35px;
    }
    @media screen and (min-width: 1024px) {
      font-size: 48px;
    }
  }
`;

// 우측 상단 버튼
export const LoginBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 5px;
  white-space: nowrap;
  color: var(--color-gray);
  border: none;
  background-color: white;
  &:hover {
    cursor: pointer;
    color: #ffaf51;
  }
  &:focus {
    color: #ffaf51;
  }
  @media (min-width: 381px) and (max-width: 767px) {
    font-size: 14px;
    margin-left: 3px;
  }
  @media screen and (max-width: 380px) {
    font-size: 12px;
    margin-left: 0;
  }
`;

export const Serach = styled.div`
  margin-right: 8px;
  z-index: 300;
  cursor: pointer;
`;

export const CategoryList = styled.div`
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #aaaaaa;
  padding: 0px 7px;
  margin: 0px 30px 0px 30px;
  .cart-count {
    font-size: 12px;
    @media screen and (max-width: 380px) {
      display: none;
    }
  }
  padding-left: 20px;
  div {
    height: 100%;
  }
  @media screen and (max-width: 479px) {
    //479
    padding-left: 2px;
    font-size: 14px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 15px;
  }
`;

export const Nav = styled.nav`
  z-index: 400;
  position: absolute;
  top: 19px;
  left: -45px;
  background-color: white;
  border: 1px solid #aaaaaa;
  width: 7.2em;
  font-size: 15px;
  justify-content: space-between;
  border-bottom: 1px solid #bebcaf;
  padding: 7px;
  margin: 5px 30px 5px 30px;
  div {
    padding: 6px 0px;
    flex-direction: column;
    align-items: center;
    &:hover {
      color: #002c6d;
      font-weight: 500;
    }
  }
  display: none;
  &:hover {
    display: block;
  }
  @media screen and (max-width: 479px) {
    width: 6.8em;
    font-size: 13px;
    left: -50px;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    font-size: 14px;
    left: -45.5px;
  }
`;

export const Category = styled(Link)`
  position: relative;
  width: 5rem;
  justify-content: center;
  &:hover {
    cursor: pointer;
    ${Nav} {
      display: block;
    }
  }
  @media screen and (max-width: 479px) {
    width: 3.1rem;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    width: 4.5rem;
  }
`;

export const BigSub = styled.div`
  width: inherit;
  display: flex;
  justify-content: center;
  font-weight: 500;
  &.space {
    &:hover {
      color: #002c6d;
    }
  }
  &.click-space {
    color: #ffaf51;
    &:hover {
      color: #002c6d;
    }
  }
`;
