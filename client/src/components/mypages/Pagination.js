import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

const ButtonWrap = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: block;
    float: left;
    padding: 5px;

    &:first-child {
      border: none;
    }
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const PageButton = styled.button`
    background: none;
    border: none;
    border-radius: 50%;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.6);
    display: block;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    min-width: 40px;
    padding: 0;
    &:hover{
      cursor: pointer;
      background-color: #aaa;
      border-radius: 50%;
      color: white;
    }
    &:active{
      cursor: pointer;
      background-color: #aaa;
      border-radius: 50%;
      color: white;
    }
    &.clicked{
      cursor: pointer;
      background-color: #aaa;
      border-radius: 50%;
      color: white;
    }
    &.clicked::after {
      cursor: pointer;
      background-color: #aaa;
      border-radius: 50%;
      color: white;
    }
`;

function Pagination ({totalpage, page, setPage}){
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);
  //tab click
  const [clicked, setClicked] = useState("");
  console.log(clicked)
  const sliceArrayByLimit = (totalPages) => {
    const totalPageArr = Array(totalPages).fill()?.map((_, i) => i);
    return Array(Math.ceil(parseFloat(totalpage / 5)))?.fill()?.map(() => totalPageArr.splice(0, 5));
  };

  useEffect(() => {
    if (page % 5 !== 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / 5)]);
    } else if (page % 5 === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / 5) - 1]);
    }
  }, [page]);


  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalpage, 5);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalpage]);

  return (
      <ButtonWrap>
        <li><PageButton onClick={() => setPage(1)} disabled={page === 1} className="prev" title="previous page">&#10094;&#10094;</PageButton></li>
          <li><PageButton onClick={() => setPage(page - 1)} disabled={page === 1} className="prev" title="previous page">&#10094;</PageButton></li>
          <ButtonWrapper>
            {currentPageArray?.map((i) => (
              <PageButton
                key={i + 1}
                onClick={(e) => {
                  setPage(i + 1)
                  setClicked(e.target.innerText)
                }}
                aria-current={page === i + 1 ? 'page' : null}
                className={clicked === i ? "clicked" : ""}
              >
                {i + 1}
              </PageButton>
            ))}
          </ButtonWrapper>
          <li><PageButton onClick={() => setPage(page + 1)} disabled={page === totalpage} className="next" title="next page">&#10095;</PageButton></li>
          <li><PageButton onClick={() => setPage(totalpage)} disabled={page === totalpage} className="fullnext" title="full next page">&#10095;&#10095;</PageButton></li>
      </ButtonWrap>
  )
}

export default Pagination;