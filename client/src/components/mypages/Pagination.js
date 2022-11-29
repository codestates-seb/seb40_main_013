import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";

const PageSection = styled.section`
  display: flex;
`;
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
`;

function Pagination ({pageClick, list, limit, page, setPage}){
  console.log(list)
  const [totalPageArray, setTotalPageArray] = useState([]);

  const listMap = []; 
  for(let i = 1; i <= list; i++){
    listMap.push(i)
  }
 console.log(listMap); // [1, 2, 3, 4]

  // useEffect(() => {
  //   const slicedPageArray = sliceArrayByLimit(list, limit);
  //   setTotalPageArray(slicedPageArray);
  //   setCurrentPageArray(slicedPageArray[0]);
  // }, [list]);

  return (
      <ButtonWrap>
          <li><PageButton className="prev" title="previous page">&#10094;</PageButton></li>
          {/* {listMap?.map((data)=> {
            <PageButton>{data.props.children}</PageButton>
          })} */}
          {/* <li>
            <PageButton onClick={()=>pageClick(1)} title="first page - page 1">1</PageButton>
          </li>
          <li>
            <PageButton onClick={()=>pageClick(2)}>2</PageButton>
          </li>
          <li>
            <PageButton onClick={()=>pageClick(3)} className="active" title="current page - page 9">3</PageButton>
          </li>
          <li>
            <PageButton onClick={()=>pageClick(4)}>4</PageButton>
          </li>
          <li>
            <PageButton onClick={()=>pageClick(5)}>5</PageButton>
          </li> */}
          <li><PageButton className="next" title="next page">&#10095;</PageButton></li>
      </ButtonWrap>
  )
}

export default Pagination;