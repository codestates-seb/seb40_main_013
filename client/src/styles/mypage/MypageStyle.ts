import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  /* height: 100%; */
  padding: 145px 16px 25px 30px;
  width: 100%;
  @media screen and (max-width: 390px) {
    flex-direction: column;
    padding: 145px 16px 25px 16px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 145px 16px 25px 16px;
  }
`;

// 왼쪽 nav bar
export const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 20vw;
  padding: 20px 0;
  border-right: 1px solid var(--color-center-line);
  @media screen and (max-width: 390px) {
    justify-content: center;
    width: 100%;
    border-right: none;
    padding-top: 0;
    border-bottom: 1px solid var(--color-center-line);
  }
  @media (min-width: 391px) and (max-width: 768px) {
    justify-content: center;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-center-line);
  }
`;

export const Right = styled.div`
  width: 80vw;
  @media screen and (max-width: 390px) {
    padding-left: 0;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    width: 100vw;
    padding-left: 10px;
  }
`;
export const Reaction = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
  @media screen and (max-width: 479px) {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 0%;
  }
  @media (min-width: 480px) and (max-width: 768px) {
    flex-direction: row;
    margin-bottom: 0;
  }
`;
export const ProfileImgConponent = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  padding: 10px;
  cursor: pointer;
  @media screen and (max-width: 479px) {
    width: 80px;
    height: 80px;
    margin-bottom: 0;
  }
`;
export const Hello = styled.h2`
  white-space: nowrap;
  padding: 5px 0;
  font-weight: 500;
  font-size: 1.3rem;
  color: var(--font-ligthblack);
  span {
    color: #002c6d;
  }
  @media screen and (max-width: 479px) {
    font-size: 1rem;
  }
`;

export const Nav = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-center-line);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  @media screen and (max-width: 768px) {
    border-top: none;
    justify-content: center;
  }
`;
export const ReactionDetail = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    border-top: none;
    justify-content: center;
    margin-top: 10px;
    flex-direction: row;
  }
`;

export const NavDetail = styled.nav`
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 20px 0;
  color: #272727;
  &:hover {
    color: #aaa;
  }
  &.clicked {
    color: #ffaf51;
  }
  &.clicked::after {
    color: #ffaf51;
  }
  &:active {
    color: #ffaf51;
  }
  @media screen and (max-width: 479px) {
    margin-right: 10px;
    background-color: var(--button-gray);
    padding: 10px 5px;
    font-size: 1rem;
    width: 100px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    white-space: nowrap;
    &:hover {
      background-color: var(--color-gray);
      color: white;
    }
    &.clicked {
      background-color: var(--color-gray);
      color: white;
    }
    &.clicked::after {
      background-color: var(--color-gray);
      color: white;
    }
  }
  @media (min-width: 480px) and (max-width: 768px) {
    margin-right: 10px;
    background-color: var(--button-gray);
    padding: 11px 10px;
    width: 120px;
    font-size: 1.1rem;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    white-space: nowrap;
    &:hover {
      background-color: #aaaaaa;
      color: white;
    }
    &.clicked {
      background-color: #ffaf51;
      color: white;
    }
    &.clicked::after {
      background-color: #ffaf51;
      color: white;
    }
  }
`;
