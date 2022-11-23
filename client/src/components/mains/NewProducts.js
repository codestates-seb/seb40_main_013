import React, { useState, useCallback } from "react";
import styled from "styled-components/macro";
import livingroom from "../../imgs/livingroom.png"
import library from "../../imgs/library.png"
import bedroom from "../../imgs/bedroom.png"
import kitchen from "../../imgs/kitchen.png"
import { Link, useParams } from "react-router-dom";

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
//카테고리별 이미지
const CategoryProduct = styled.div`
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
const TI = styled.a`
  display: inline-block;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
  &:hover::after,
  &:hover > .hover_text{
    display: block;
  }
  &::after{
    display: none;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  &:hover img{
    transform: scale(1.1);
    transition: 1s;
  }
  .hover_text{
    display: none;
    position: absolute;
    top: 160px;
    left: 150px;
    color: #fff;
    z-index: 1;
    font-weight: 500;
    font-size: 35px;
    background:#fff;
    color: #AAAAAA; 
    transition: all 0.5s;
    padding: 10px;
    border-radius: 10px;
  }
  @media (min-width: 768px) and (max-width: 1024px){
    .hover_text{
      top: 20px;
      left: 20px;
      font-size: 20px;
    }
  }
`;

const CategoryImg = styled.img`
  width: 500px;
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
const BP = styled(Link)`
  display: flex;
  align-items: center;
  border: 1px solid var(--color-center-line);
  height: 20%;
  width: 400px;
  padding-right: 10px;
  &:hover{
    opacity: 0.7;
  }
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

const NewProducts = ({ newArivalList }) =>{
  const [clicked, setClicked] = useState('서재');

  const onClick = useCallback(e => {
    const text = e.target.innerText;
    setClicked(text);
  }, []);

  const ProductArr = {
    "서재": <CategoryProduct>
            <TI>
              <CategoryImg src={library}></CategoryImg>
              <p className="hover_text">More view</p>
            </TI>
            <BPList>
                {newArivalList.서재?.map((p)=>
                  <BP key={p.id} to={`/detail/${p.id}`}>
                    <Img src={p.img.fullPath} />
                    <TP>
                      <Title>{p.title}</Title>
                      <Price>{p.price.toLocaleString('en-US')}</Price>
                    </TP>
                  </BP>
                )}
            </BPList>
          </CategoryProduct>,
    "침실": <CategoryProduct>
              <TI>
              <CategoryImg src={bedroom}></CategoryImg>
              <p className="hover_text">More view</p>
            </TI>
              <BPList>
                  {newArivalList.침실?.map((p)=>
                    <BP key={p.id} to={`/detail/${p.id}`}>
                      <Img src={p.img.fullPath} />
                      <TP>
                        <Title>{p.title}</Title>
                        <Price>{p.price.toLocaleString('en-US')}</Price>
                      </TP>
                    </BP>
                  )}
              </BPList>
            </CategoryProduct>,
    "거실": <CategoryProduct>
            <TI>
              <CategoryImg src={livingroom}></CategoryImg>
              <p className="hover_text">More view</p>
            </TI>
              <BPList>
                  {newArivalList.거실?.map((p)=>
                    <BP key={p.id} to={`/detail/${p.id}`}>
                      <Img src={p.img.fullPath} />
                      <TP>
                        <Title>{p.title}</Title>
                        <Price>{p.price.toLocaleString('en-US')}</Price>
                      </TP>
                    </BP>
                  )}
              </BPList>
            </CategoryProduct>,
    "주방": <CategoryProduct>
            <TI>
              <CategoryImg src={kitchen}></CategoryImg>
              <p className="hover_text">More view</p>
            </TI>
              <BPList>
                  {newArivalList.주방?.map((p)=>
                    <BP key={p.id} to={`/detail/${p.id}`}>
                      <Img src={p.img.fullPath} />
                      <TP>
                        <Title>{p.title}</Title>
                        <Price>{p.price.toLocaleString('en-US')}</Price>
                      </TP>
                    </BP>
                  )}
              </BPList>
            </CategoryProduct>,
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
