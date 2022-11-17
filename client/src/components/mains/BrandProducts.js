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
  justify-content: center;
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
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const BPList = styled.div`
  display: flex;
  flex-direction: column;
`;
const BP = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--color-center-line);
  height: 20%;
  width: 400px;
  padding-right: 10px;
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  margin: 0 20px;
`;
const TP = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
`;
const Price = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
`;

const BrandProducts = ({ productList, dodotList, sofsysList, forthehomeList, deskerList }) =>{
  const [clicked, setClicked] = useState('두닷');

  const onClick = useCallback(e => {
    const text = e.target.innerText;
    setClicked(text);
  }, []);
  console.log(productList)
  const ProductArr = {
    "두닷": <BrandProduct>
            <BrandImg src={dodot}></BrandImg>
            <BPList>
            {dodotList.map(p=>
                    <BP>
                    <Img src={p.img} />
                    <TP>
                      <Title>{p.title}</Title>
                      <Price>{p.price}</Price>
                    </TP>
                  </BP>
                  )}
            </BPList>
          </BrandProduct>,
  "소프시스": <BrandProduct>
              <BrandImg src={sofsys}></BrandImg>
              <BPList>
              {sofsysList.map(p=>
                    <BP>
                      <Img src={p.img} />
                      <TP>
                        <Title>{p.title}</Title>
                        <Price>{p.price}</Price>
                      </TP>
                    </BP>
                  )}
              </BPList>
            </BrandProduct>,
  "포더홈": <BrandProduct>
              <BrandImg src={forthehome}></BrandImg>
              <BPList>
              {forthehomeList.map(p=>
                    <BP>
                    <Img src={p.img} />
                    <TP>
                      <Title>{p.title}</Title>
                      <Price>{p.price}</Price>
                    </TP>
                  </BP>
                  )}
              </BPList>
            </BrandProduct>,
  "데스커": <BrandProduct>
            <BrandImg src={desker}></BrandImg>
            <BPList>
            {deskerList.map(p=>
                    <BP>
                    <Img src={p.img} />
                    <TP>
                      <Title>{p.title}</Title>
                      <Price>{p.price}</Price>
                    </TP>
                  </BP>
                  )}
            </BPList>
          </BrandProduct>,
}

  return (
    <BrandContainer>
      <Tabs>
          <Tab
          name="dodot"
          className={clicked === '두닷' ? 'clicked' : ''}
          onClick={onClick}
          value="1">
            두닷
          </Tab>
          <Tab
          name="sofsis"
          className={clicked === '소프시스' ? 'clicked' : ''}
          onClick={onClick}
          value="2">
            소프시스
          </Tab>
          <Tab
          name="forTheHome"
          className={clicked === '포더홈' ? 'clicked' : ''}
          onClick={onClick}
          value="3">
            포더홈
          </Tab>
          <Tab
          name="illom"
          className={clicked === '데스커' ? 'clicked' : ''}
          onClick={onClick}
          value="4">
            데스커
          </Tab>
        </Tabs>
        {ProductArr[clicked]}
      </BrandContainer>
  )
}

export default BrandProducts;
