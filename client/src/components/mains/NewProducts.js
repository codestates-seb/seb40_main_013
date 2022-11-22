import React, { useState, useCallback } from "react";
import styled from "styled-components/macro";
import livingroom from "../../imgs/livingroom.png"
import library from "../../imgs/library.png"
import bedroom from "../../imgs/bedroom.png"
import kitchen from "../../imgs/kitchen.png"

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

const NewProducts = ({ libraryList, bedList }) =>{
  const [clicked, setClicked] = useState('서재');

  const onClick = useCallback(e => {
    const text = e.target.innerText;
    setClicked(text);
  }, []);

  const ProductArr = {
    "서재": <BrandProduct>
            <BrandImg src={library}></BrandImg>
            <BPList>
                {libraryList?.map((p)=>
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
  "침실": <BrandProduct>
            <BrandImg src={bedroom}></BrandImg>
            <BPList>
                {bedList?.map((p)=>
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
  "거실": <BrandProduct>
          <BrandImg src={livingroom}></BrandImg>
            <BPList>
                {bedList?.map((p)=>
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
    "주방": <BrandProduct>
            <BrandImg src={kitchen}></BrandImg>
              <BPList>
                  {bedList?.map((p)=>
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
          name="library"
          className={clicked === '서재' ? 'clicked' : ''}
          onClick={onClick}
          value="1">
            서재
          </Tab>
          <Tab
          name="bedroom"
          className={clicked === '침실' ? 'clicked' : ''}
          onClick={onClick}
          value="2">
            침실
          </Tab>
        </SubTab>
        <SubTab>
          <Tab
            name="livingroom"
            className={clicked === '거실' ? 'clicked' : ''}
            onClick={onClick}
            value="3">
              거실
            </Tab>
            <Tab
            name="kitchen"
            className={clicked === '주방' ? 'clicked' : ''}
            onClick={onClick}
            value="4">
              주방
            </Tab>
          </SubTab>
        </Tabs>
        {ProductArr[clicked]}
      </BrandContainer>
  )
}

export default NewProducts;
