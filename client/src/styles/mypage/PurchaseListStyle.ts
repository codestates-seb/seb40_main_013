import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 40px;
  width: 80%;
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
export const NotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  align-items: center;
  padding: 3rem 0;
  @media screen and (max-width: 478px) {
    width: 100%;
  }
`;
export const NotIcon = styled.div`
  background-color: #aaaaaa;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10vw;
  color: white;
  margin-bottom: 20px;
  animation: rotate 5s infinite;
  @keyframes rotate {
    from {
      -webkit-transform: rotate(-30deg);
      -o-transform: rotate(-30deg);
      transform: rotate(-30deg);
    }
    to {
      -webkit-transform: rotate(30deg);
      -o-transform: rotate(30deg);
      transform: rotate(30deg);
    }
  }
  @media screen and (max-width: 478px) {
    width: 7rem;
    height: 7rem;
    font-size: 15vw;
  }
  @media (min-width: 479px) and (max-width: 767px) {
    font-size: 18vw;
  }
`;
export const NotOrder = styled.h3`
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 2rem;
  @media screen and (max-width: 478px) {
    align-items: center;
    font-weight: 400;
    font-size: 1.3rem;
  }
`;
export const ShowProduct = styled(Link)`
  font-weight: 400;
  font-size: 1.5rem;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: #ffaf51;
    text-decoration: underline;
    font-weight: 500;
  }
  @media screen and (max-width: 478px) {
    align-items: center;
    font-weight: 400;
    font-size: 1.3rem;
  }
`;

// 페이지
export const Page = styled.div``;

// 상단
export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 15px;
  @media screen and (max-width: 390px) {
    margin: 7px 10px;
  }
`;
export const SubTop = styled.h2`
  font-weight: 600;
  font-size: 1.1rem;
  color: #272727;
  .orderStatus {
    color: #ffaf51;
  }
  .ordercancle {
    color: #ff4040;
  }
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    font-size: 2.2vw;
    font-weight: 500;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.6vw;
    font-weight: 500;
  }
`;
export const AllPurchase = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: flex-end;
  color: #aaaaaa;
  cursor: pointer;
  &:hover {
    color: #ffaf51;
  }
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    font-size: 2vw;
    align-items: flex-end;
    color: #515151;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.7vw;
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
// const AllPrice = styled.div`
//   display: flex;
//   padding-right: 10px;
//   justify-content: flex-end;
// `;

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
  /* cursor: pointer; */
  /* @media screen and (max-width: 479px) {
    flex-direction: column;
  } */
`;

export const Img = styled.img`
  width: 130px;
  height: 130px;
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
  margin: 0 20px;
  @media screen and (max-width: 390px) {
    justify-content: center;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    justify-content: center;
    margin-left: 0;
  }
`;
export const BrandName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-top: 2px;
  @media screen and (max-width: 390px) {
    font-weight: 600;
    font-size: 0.8rem;
    margin-bottom: 0;
    padding: 5px 0;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    font-weight: 500;
    font-size: 2.7vw;
    margin-right: 5px;
  }
`;
export const Option = styled.h2`
  margin: 10px 0;
  @media screen and (max-width: 390px) {
    font-size: 0.7rem;
  }
`;
export const Price = styled.h2`
  /* margin: 10px 0; */
  @media screen and (max-width: 390px) {
    margin: 5px 5px 5px 0;
    font-size: 12px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    margin: 5px 0;
  }
`;
export const Btns = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CancleBtn = styled.button`
  padding: 8px 30px;
  /* height: 50px; */
  /* border: 1px solid red; */
  color: #ff4040;
  border-radius: 5px;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #efefef;
  &:hover {
    border: 1px solid #ff4040;
  }
  @media screen and (max-width: 479px) {
    display: none;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 8px 30px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 8px 26px;
  }
`;

// 반응형 구매후기
export const ReactionSpace = styled.div`
  display: none;
  @media screen and (max-width: 479px) {
    display: flex;
    justify-content: flex-end;
    margin: 0 10px 5px 10px;
  }
`;

export const ReactionCancleBtn = styled.button`
  display: none;
  @media screen and (max-width: 479px) {
    display: flex;
    padding: 5px 20px;
    color: red;
    border-radius: 5px;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #efefef;
    &:hover {
      border: 1px solid #ff4040;
    }
  }
`;

// 페이지네이션
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;
