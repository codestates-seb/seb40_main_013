import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 40px;
  width: 75vw;
  @media screen and (max-width: 390px) {
    width: 88vw;
    padding: 0;
    margin: 30px 0;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    margin: 30px 0;
  }
`;
export const ProductContainer = styled.div``;

export const AllOrderTitle = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 30px;
`;

// 상단
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 390px) {
    margin: 3px 10px;
  }
`;
export const SubTop = styled.h2`
  font-weight: 600;
  font-size: 1rem;
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
`;

export const Hr = styled.hr`
  height: 1px;
  border: none;
  background-color: var(--color-center-line);
  margin: 5px 0;
`;

// 콘텐츠
export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  @media screen and (max-width: 390px) {
    margin: 5px 10px;
    justify-content: flex-start;
  }
`;
export const ReactionSubDetail = styled.div`
  display: flex;
  @media screen and (max-width: 390px) {
    flex-direction: column;
  }
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 5px;
  @media screen and (max-width: 390px) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;
export const BP = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-left: 20px;
  @media screen and (max-width: 390px) {
    flex-direction: row;
    width: 88vw;
    justify-content: space-between;
    padding-right: 10px;
    margin-top: 10px;
    margin-left: 0;
  }
`;
export const ReactionNameOption = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BrandName = styled(Link)`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 5px;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 390px) {
    font-weight: 300;
    font-size: 10px;
    margin-right: 5px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    font-weight: 500;
  }
`;
export const Option = styled.h2`
  margin-top: 5px;
  font-size: 1em;
  color: #aaa;
  @media screen and (max-width: 390px) {
    font-size: 0.7rem;
  }
`;
export const Price = styled.h2`
  margin: 10px 0;
  font-size: 1rem;
  span {
    font-weight: 700;
  }
  @media screen and (max-width: 390px) {
    margin: 5px 5px 5px 0;
    font-size: 12px;
    white-space: nowrap;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    margin: 5px 0;
  }
`;
export const Btns = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
export const ReviewBtn = styled.button`
  white-space: nowrap;
  &.hidden {
    display: none;
  }
  padding: 10px 30px;
  background-color: #002c6d;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #123b77;
  }
  @media screen and (max-width: 390px) {
    display: none;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    padding: 8px 30px;
  }
`;

// 반응형 구매후기
export const ReactionSpace = styled.div`
  display: none;
  @media screen and (max-width: 390px) {
    display: flex;
    justify-content: flex-end;
    margin: 5px 10px;
  }
`;

export const ReactionReviewBtn = styled.button`
  display: none;
  @media screen and (max-width: 390px) {
    &.hidden {
      display: none;
    }
    display: flex;
    color: #515151;
    border: 0.7px solid #aaaaaa;
    border-radius: 5px;
    padding: 3px 10px;
    cursor: pointer;
    &:hover {
      background-color: #002c6d;
      color: white;
    }
  }
`;

// 결제정보
export const PaymentTitle = styled.h2`
  font-weight: 600;
  margin-top: 50px;
`;
export const PaySubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10px;
  width: 280px;
  @media screen and (max-width: 479px) {
    width: 90%;
  }
`;
export const PaySubTitle = styled.h2`
  color: #aaaaaa;
`;
export const PaySubContent = styled.h2``;
export const PaymentContainer = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 1023px) {
    flex-direction: column;
  }
`;
