import React, { useState, useCallback } from "react";
import styled from "styled-components/macro";
import brandImg from "../../imgs/brandImg.png"
import dodot from "../../imgs/dodot.jpeg"
import sofsys from "../../imgs/sofsys.jpeg"
import forthehome from "../../imgs/forthehome.png"
import desker from "../../imgs/desker.png"

const BrandContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  /* @media screen and (max-width: 390px){
    height: 100vh;
  }
  @media (min-width: 391px) and (max-width: 768px){
    height: 90%;
  } */
`;

//tab
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  @media screen and (max-width: 767px){
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
  @media (min-width: 768px) and (max-width: 1024px){
    flex-direction: column;
  }
`;
const SubTab = styled.div`
  display: flex;
  @media screen and (max-width: 767px){
    margin-bottom: 10px;
  }
  @media (min-width: 768px) and (max-width: 1024px){
    margin-bottom: 10px;
  }
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
  @media screen and (max-width: 390px){
    margin-bottom: 10px;
  }
`;
//브랜드별 이미지
const BrandProduct = styled.div`
  display: flex;
  /* border: 1px solid red; */
  border-radius: 10px;
  margin: 20px 0;
  height: 60vh;
  @media screen and (max-width: 390px){
    flex-direction: column;
    width: 80%;
  }
  @media (min-width: 391px) and (max-width: 767px){
    flex-direction: column;
    align-items: center;
    width: 80%;
  }
  @media (min-width: 768px) and (max-width: 1024px){
    width: 80%;
    justify-content: center;
  }
`;

const BrandImg = styled.img`
  width: 500px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  @media screen and (max-width: 390px){
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
  }
  @media (min-width: 391px) and (max-width: 767px){
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
  }
  @media (min-width: 768px) and (max-width: 1024px){
    width: 50vw;
  }
`;
const BPList = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 390px){
    width: 100%;
  }
  @media (min-width: 391px) and (max-width: 768px){
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px){
    width: 50vw;
  }
`;
const BP = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--color-center-line);
  height: 20%;
  width: 400px;
  padding-right: 10px;
  @media screen and (max-width: 390px){
    width: 100%;
    padding: 10px 0;
  }
  @media (min-width: 391px) and (max-width: 768px){
    width: 100%;
    padding: 10px 0;
  }
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

const BrandProducts = ({ roomandhomeList, dodotList, sofsysList, forthehomeList, deskerList, marketbeeList, hudoList }) =>{
  const [clicked, setClicked] = useState('두닷');

  const onClick = useCallback(e => {
    const text = e.target.innerText;
    setClicked(text);
  }, []);

  const ProductArr = {
    "룸앤홈": <BrandProduct>
            <BrandImg src={dodot}></BrandImg>
            <BPList>
            {roomandhomeList?.map((p)=>
                  <BP key={p.id}>
                    <Img src={p.img.fullPath} />
                    <TP>
                      <Title>{p.title}</Title>
                      <Price>{p.price.toLocaleString('en-US')}</Price>
                    </TP>
                  </BP>
                  )}
            </BPList>
          </BrandProduct>,
  "소프시스": <BrandProduct>
              <BrandImg src={sofsys}></BrandImg>
              <BPList>
              {sofsysList?.map((p)=>
                  <BP key={p.id}>
                      <Img src={p.img.fullPath} />
                      <TP>
                        <Title>{p.title}</Title>
                        <Price>{p.price.toLocaleString('en-US')}</Price>
                      </TP>
                    </BP>
                  )}
              </BPList>
            </BrandProduct>,
  "포더홈": <BrandProduct>
              <BrandImg src={forthehome}></BrandImg>
              <BPList>
              {forthehomeList?.map((p)=>
                  <BP key={p.id}>
                    <Img src={p.img.fullPath} />
                    <TP>
                      <Title>{p.title}</Title>
                      <Price>{p.price.toLocaleString('en-US')}</Price>
                    </TP>
                  </BP>
                  )}
              </BPList>
            </BrandProduct>,
  "데스커": <BrandProduct>
            <BrandImg src={desker}></BrandImg>
            <BPList>
            {deskerList?.map((p)=>
                  <BP key={p.id}>
                    <Img src={p.img.fullPath} />
                    <TP>
                      <Title>{p.title}</Title>
                      <Price>{p.price.toLocaleString('en-US')}</Price>
                    </TP>
                  </BP>
                  )}
            </BPList>
          </BrandProduct>,
  "두닷": <BrandProduct>
              <BrandImg src={dodot}></BrandImg>
              <BPList>
              {dodotList?.map((p)=>
                    <BP key={p.id}>
                      <Img src={p.img.fullPath} />
                      <TP>
                        <Title>{p.title}</Title>
                        <Price>{p.price.toLocaleString('en-US')}</Price>
                      </TP>
                    </BP>
                    )}
              </BPList>
            </BrandProduct>,
  "마켓비": <BrandProduct>
              <BrandImg src={dodot}></BrandImg>
              <BPList>
              {marketbeeList?.map((p)=>
                    <BP key={p.id}>
                      <Img src={p.img.fullPath} />
                      <TP>
                        <Title>{p.title}</Title>
                        <Price>{p.price.toLocaleString('en-US')}</Price>
                      </TP>
                    </BP>
                    )}
              </BPList>
            </BrandProduct>,
  "휴도": <BrandProduct>
              <BrandImg src={dodot}></BrandImg>
              <BPList>
              {hudoList?.map((p)=>
                    <BP key={p.id}>
                      <Img src={p.img.fullPath} />
                      <TP>
                        <Title>{p.title}</Title>
                        <Price>{p.price.toLocaleString('en-US')}</Price>
                      </TP>
                    </BP>
                    )}
              </BPList>
            </BrandProduct>,
}

  return (
    <BrandContainer>
      <Tabs>
        <SubTab>
          <Tab
          name="dodot"
          className={clicked === '룸앤홈' ? 'clicked' : ''}
          onClick={onClick}
          value="1">
            룸앤홈
          </Tab>
          <Tab
          name="sofsis"
          className={clicked === '소프시스' ? 'clicked' : ''}
          onClick={onClick}
          value="2">
            소프시스
          </Tab>
        </SubTab>
        <SubTab>
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
          </SubTab>
          <SubTab>
          <Tab
            name="forTheHome"
            className={clicked === '휴도' ? 'clicked' : ''}
            onClick={onClick}
            value="3">
              휴도
            </Tab>
            <Tab
            name="illom"
            className={clicked === '마켓비' ? 'clicked' : ''}
            onClick={onClick}
            value="4">
              마켓비
            </Tab>
          </SubTab>
          <SubTab>
          <Tab
            name="forTheHome"
            className={clicked === '두닷' ? 'clicked' : ''}
            onClick={onClick}
            value="3">
              두닷
            </Tab>
          </SubTab>
        </Tabs>
        {ProductArr[clicked]}
      </BrandContainer>
  )
}

export default BrandProducts;
