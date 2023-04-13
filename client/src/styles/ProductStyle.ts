import styled from "styled-components/macro";
import { Link } from "react-router-dom";

export const Products = styled(Link)`
  width: 18vw;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 479px) {
    width: 45vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 30vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 23vw;
  }
`;
export const Imgbox = styled.div`
  overflow: hidden;
  &:hover img {
    border-radius: 5px;
    object-fit: cover;
    transform: scale(1.3);
    transition: transform 1s !important;
  }
  @media screen and (max-width: 479px) {
    width: 35vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20vw;
  }
  .img-lazy {
    width: 13vw;
    display: flex;
    border-radius: 5px;
    @media screen and (max-width: 479px) {
      width: 35vw;
    }
    @media (min-width: 480px) and (max-width: 767px) {
      width: 24vw;
    }
    @media (min-width: 768px) and (max-width: 1023px) {
      width: 20vw;
    }
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 13vw;
  margin-top: 10px;
  @media screen and (max-width: 479px) {
    width: 35vw;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 24vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 20vw;
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
    font-size: 1em;
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
    font-size: 1em;
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
    font-size: 1.3em;
  }
  .won {
    font-size: 1rem;
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
    width: 13px;
    height: 13px;
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
    font-size: 0.9em;
  }
`;
