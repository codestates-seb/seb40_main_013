import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Container = styled.div`
  /* border: 1px solid red; */
  width: 75%;
  padding: 2rem;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 2rem 0;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 2rem 0;
  }
`;

// 좋아요한 상품이 없을 때
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
  span {
    color: #ffaf51;
  }
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

// 좋아요한 상품이 있을 때
export const LikeTitle = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  color: #272727;
  @media screen and (max-width: 479px) {
    padding-left: 1.5rem;
    font-size: 1.3rem;
    font-weight: 500;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding-left: 1.3rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding-left: 1.5rem;
  }
`;
export const ProductList = styled.div`
  width: 80%;
  margin: 10px 0;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media screen and (max-width: 479px) {
    width: 90vw;
    justify-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 95vw;
    justify-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 83vw;
    justify-items: center;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Products = styled(Link)`
  width: 14vw;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 479px) {
    width: 35vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 30vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 17.5vw;
  }
`;
export const Imgbox = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
  &:hover img {
    object-fit: cover;
    transform: scale(1.3);
    transition: transform 1s;
  }
  @media screen and (max-width: 479px) {
    width: 34vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 16vw;
  }
`;
export const Img = styled.img`
  width: 12vw;
  display: flex;
  border-radius: 5px;
  @media screen and (max-width: 479px) {
    width: 34vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 15vw;
  }
`;
export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 12vw;
  margin-top: 10px;
  @media screen and (max-width: 479px) {
    width: 33vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 15vw;
  }
`;
export const Brand = styled.h5`
  color: var(--font-ligthblack);
  font-size: 0.8rem;
  font-weight: 300;
  @media screen and (max-width: 479px) {
    font-size: 0.8em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9em;
  }
`;
export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1em;
  max-height: 2.2em;
  min-height: 2.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media screen and (max-width: 479px) {
    font-size: 0.8em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.9em;
  }
`;
export const Price = styled.h5`
  display: flex;
  justify-content: flex-end;
  padding: 5px 0;
  /* margin-right: 10px; */
  font-size: 1.3rem;
  font-weight: 700;
  @media screen and (max-width: 479px) {
    font-size: 1.1em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 1.2em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.2em;
  }
  .won {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
  }
`;
export const SubDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  &.end {
    justify-content: flex-end;
  }
`;
export const StarDetail = styled.div`
  display: flex;
`;
export const Star = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  @media screen and (max-width: 479px) {
    width: 10px;
    height: 10px;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 10px;
    height: 10px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 12px;
    height: 12px;
  }
`;
export const StarAerage = styled.div`
  display: flex;
  @media screen and (max-width: 479px) {
    font-size: 0.8em;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    font-size: 0.9em;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.8em;
  }
`;

// 페이지네이션
export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
