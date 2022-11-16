import React, { useState, useCallback } from "react";
import styled from "styled-components/macro";
import brandImg from "../../imgs/brandImg.png"
import dodot from "../../imgs/dodot.jpeg"
import sofsys from "../../imgs/sofsys.jpeg"
import forthehome from "../../imgs/forthehome.png"
import desker from "../../imgs/desker.png"

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
  /* border: 1px solid red; */
  border-radius: 10px;
  margin: 20px 0;
  height: 60vh;
`;

const BrandImg = styled.img`
  width: 500px;
`;
const BPList = styled.div`
  display: flex;
  flex-direction: column;
`;
const BP = styled.div`
  display: flex;
  border: 1px solid var(--color-center-line);
  height: 20%;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;
const Title = styled.h2`
  font-size: 1rem;
`;

const BrandProducts = ({productList}) =>{
  const [clicked, setClicked] = useState('전체보기');

  const onClick = useCallback(e => {
    const text = e.target.innerText;
    setClicked(text);
  }, []);
  console.log(productList)
  const ProductArr = {
    "전체보기": <BrandProduct>
                <BrandImg src={brandImg}></BrandImg>
                <BPList>
                {productList.map(p=>
                    <BP>
                      <Img src={p.img} />
                      <Title>{p.title}</Title>
                    </BP>
                  )}
                </BPList>
              </BrandProduct>,
    "두닷": <BrandProduct>
            <BrandImg src={dodot}></BrandImg>
            <BPList>
              <BP>첫번째</BP>
              <BP>두번째</BP>
              <BP>세번째</BP>
              <BP>네번째</BP>
              <BP>다섯번째</BP>
            </BPList>
          </BrandProduct>,
  "소프시스": <BrandProduct>
              <BrandImg src={sofsys}></BrandImg>
              <BPList>
                <BP>첫번째</BP>
                <BP>두번째</BP>
                <BP>세번째</BP>
                <BP>네번째</BP>
                <BP>다섯번째</BP>
              </BPList>
            </BrandProduct>,
  "포더홈": <BrandProduct>
              <BrandImg src={forthehome}></BrandImg>
              <BPList>
                <BP>첫번째</BP>
                <BP>두번째</BP>
                <BP>세번째</BP>
                <BP>네번째</BP>
                <BP>다섯번째</BP>
              </BPList>
            </BrandProduct>,
  "데스커": <BrandProduct>
            <BrandImg src={desker}></BrandImg>
            <BPList>
              <BP>첫번째</BP>
              <BP>두번째</BP>
              <BP>세번째</BP>
              <BP>네번째</BP>
              <BP>다섯번째</BP>
            </BPList>
          </BrandProduct>,
}

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
          className={clicked === '데스커' ? 'clicked' : ''}
          onClick={onClick}
          value="5">
            데스커
          </Tab>
        </Tabs>
        {ProductArr[clicked]}
      </BrandContainer>
  )
}

export default BrandProducts;
