import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import styled from "styled-components/macro";

export const renderStar = (score) => {
  let result = "";
  if (score === 0) {
    result = (
      <ReviewStar>
        <BsStar />
      </ReviewStar>
    );
  } else if (score > 0 && score <= 0.5) {
    result = (
      <ReviewStar>
        <BsStarHalf />
      </ReviewStar>
    );
  } else if (score > 0.5 && score <= 1) {
    result = (
      <ReviewStar>
        <BsStarFill />
      </ReviewStar>
    );
  } else if (score > 1 && score <= 1.5) {
    result = (
      <ReviewStar>
        <BsStarFill />
        <BsStarHalf />
      </ReviewStar>
    );
  } else if (score > 1.5 && score <= 2) {
    result = (
      <ReviewStar>
        <BsStarFill />
        <BsStarFill />
      </ReviewStar>
    );
  } else if (score > 2 && score <= 2.5) {
    result = (
      <ReviewStar>
        <BsStarFill />
        <BsStarFill />
        <BsStarHalf />
      </ReviewStar>
    );
  } else if (score > 2.5 && score <= 3) {
    result = (
      <ReviewStar>
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
      </ReviewStar>
    );
  } else if (score > 3 && score <= 3.5) {
    result = (
      <ReviewStar>
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarHalf />
      </ReviewStar>
    );
  } else if (score > 3.5 && score <= 4) {
    result = (
      <ReviewStar>
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
      </ReviewStar>
    );
  } else if (score > 4 && score <= 4.5) {
    result = (
      <ReviewStar>
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarHalf />
      </ReviewStar>
    );
  } else if (score > 4.5 && score <= 5) {
    result = (
      <ReviewStar>
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
      </ReviewStar>
    );
  }
  return result;
};
const ReviewStar = styled.div`
  color: var(--color-star);
`;
