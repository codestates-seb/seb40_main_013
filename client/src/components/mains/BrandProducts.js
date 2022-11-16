import React, { useState, useCallback } from "react";
import styled from "styled-components/macro";
import brandImg from "../../imgs/brandImg.png"

const BrandContainer = styled.div``;

//tab
const Tabs = styled.div`
  display: flex;
  margin: 20px 0;
`;
const Tab = styled.div`
  background-color: #f8f8f8;
  width: 120px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
  margin-right: 15px;
  border-radius: 5px;
  color: #AAAAAA;
  cursor: pointer;
  &:hover{
    color: white;
    background-color: #515151;
  }
  &.clicked {
    color: white;
    background-color: #FFAF51;
  }
  &.clicked::after {
    color: white;
    background-color: #FFAF51;
  }
`;
//브랜드별 이미지
const BrandProduct = styled.div`
  display: flex;
  border: 1px solid red;
  border-radius: 5px;
  margin: 20px 0;
  height: 60vh;
`;

const BrandImg = styled.img``;
const BPList = styled.div`
  display: flex;
  flex-direction: column;
`;
const BP = styled.div`
  border: 1px solid var(--color-center-line);
`;

const BrandProducts = () =>{
  const [clicked, setClicked] = useState();
  const [value, setValue] = useState('1');

  const onClick = useCallback(e => {
    const text = e.target.innerText;
    setClicked(text);
  }, []);

  return (
    <BrandContainer>
      <Tabs>
          <Tab
          name="fullVies"
          className={clicked === '전체보기' ? 'clicked' : ''}
          onClick={onClick}
          value="1">
            전체보기
          </Tab>
          <Tab
          name="dodot"
          className={clicked === '두닷' ? 'clicked' : ''}
          onClick={onClick}
          value="2">
            두닷
          </Tab>
          <Tab
          name="sofsis"
          className={clicked === '소프시스' ? 'clicked' : ''}
          onClick={onClick}
          value="3">
            소프시스
          </Tab>
          <Tab
          name="forTheHome"
          className={clicked === '포더홈' ? 'clicked' : ''}
          onClick={onClick}
          value="4">
            포더홈
          </Tab>
          <Tab
          name="illom"
          className={clicked === '일룸' ? 'clicked' : ''}
          onClick={onClick}
          value="5">
            일룸
          </Tab>
        </Tabs>
        <BrandProduct value="1">
          <BrandImg src={brandImg}></BrandImg>
          <BPList>
            <BP>첫번째</BP>
            <BP>두번째</BP>
            <BP>세번째</BP>
            <BP>네번째</BP>
            <BP>다섯번째</BP>
          </BPList>
        </BrandProduct>
      </BrandContainer>
  )
}

export default BrandProducts;
