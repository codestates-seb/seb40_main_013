import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const NewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* @media screen and (max-width: 390px){
    height: 100vh;
  }
  @media (min-width: 391px) and (max-width: 768px){
    height: 90%;
  } */
`;

// tab
export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    /* height: 100vh; */
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    flex-direction: column;
  }
`;
export const SubTab = styled.div`
  display: flex;
  @media screen and (max-width: 767px) {
    margin-bottom: 10px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-bottom: 10px;
  }
`;
export const Tab = styled.div`
  background-color: var(--button-gray);
  width: 120px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  margin-right: 15px;
  border-radius: 5px;
  color: #aaaaaa;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #aaaaaa;
  }
  &.clicked {
    color: white;
    background-color: #ffaf51;
  }
  &.clicked::after {
    color: white;
    background-color: #ffaf51;
  }
  @media screen and (max-width: 390px) {
    margin-bottom: 10px;
  }
`;
// 카테고리별 이미지
export const CategoryProduct = styled.div`
  display: flex;
  /* border: 1px solid red; */
  border-radius: 10px;
  margin: 20px 0;
  height: 60vh;
  @media screen and (max-width: 390px) {
    flex-direction: column;
    width: 80%;
    height: 100%;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    width: 80%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 80%;
    justify-content: center;
  }
`;
export const CategoryImgContainer = styled(Link)`
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  /* cursor: pointer; */
  /* &:hover::after, */
  &:hover > .hover_text {
    display: block;
    cursor: pointer;
  }
  &::after {
    display: none;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  &:hover img {
    transform: scale(1.1);
    transition: 1s;
  }
  .hover_text {
    display: none;
    position: absolute;
    top: 50px;
    left: 50px;
    color: #fff;
    z-index: 1;
    font-weight: 500;
    font-size: 35px;
    background: #fff;
    color: #aaaaaa;
    transition: all 0.5s;
    padding: 10px;
    border-radius: 10px;
  }
  @media (min-width: 320px) and (max-width: 390px) {
    display: none;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    display: none;
    /* display: flex; */
    width: 100%;
    border-bottom-left-radius: 0;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 80%;
    .hover_text {
      top: 20px;
      left: 20px;
      font-size: 20px;
    }
  }
`;

export const CategoryImg = styled.img`
  width: 500px;
  height: 100%;
  @media screen and (max-width: 390px) {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
    display: none;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
    display: none;
  }
`;
export const BPList = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BP = styled(Link)`
  display: flex;
  align-items: center;
  /* border: 0.1rem solid var(--color-center-line); */
  height: 20%;
  width: 400px;
  padding: 10px 10px 10px 0;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 390px) {
    width: 100%;
    padding: 10px 0;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    width: 100%;
    padding: 10px 0;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 350px;
  }
`;
export const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  margin: 0 20px;
`;
export const TP = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  padding-right: 10px;
`;
export const Price = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
`;
export const ProductArrContainer = styled.div`
  height: fit-content;
  display: flex;
  justify-content: center;
  @media (min-width: 320px) and (max-width: 390px) {
    height: 100%;
  }
`;
