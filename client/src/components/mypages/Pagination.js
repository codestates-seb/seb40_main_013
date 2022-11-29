import React, { useState } from "react";
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
const Button = styled.button`
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

function Pagination ({ page, totalPosts, limit, setPage }){
  const numPages = Math.ceil(totalPosts/limit)
  const [currPage, setCurrPage] = useState(page)
  let firstNum = currPage - (currPage % 5) + 1
  let lastNum = currPage - (currPage % 5) + 5
  console.log({"currPage is":currPage, "firsNum is" : firstNum, "page is" : page})

  return (
      <PageSection>
          <ButtonWrap>
              <Button 
                  onClick={() => {setPage(page-1); setCurrPage(page-2);}} 
                  disabled={page===1}>
                  &lt;
              </Button>
              <Button 
                  onClick={() => setPage(firstNum)}
                  aria-current={page === firstNum ? "page" : null}>
                  {firstNum}
              </Button>
              {Array(4).fill().map((_, i) =>{
                  if(i <=2){
                      return (
                          <Button
                              border="true" 
                              key={i+1} 
                              onClick={() => {setPage(firstNum+1+i)}}
                              aria-current={page === firstNum+1+i ? "page" : null}>
                              {firstNum+1+i}
                          </Button>
                      )
                  }
                  else if(i>=3){
                      return (
                          <Button
                              border="true" 
                              key ={i+1}
                              onClick={() => setPage(lastNum)}
                              aria-current={page === lastNum ? "page" : null}>
                              {lastNum}
                          </Button>
                      )  
                  }
              })}
              <Button 
                  onClick={() => {setPage(page+1); setCurrPage(page);}} 
                  disabled={page===numPages}>
                  &gt;
              </Button>
          </ButtonWrap>
      </PageSection>
  )
}

export default Pagination;