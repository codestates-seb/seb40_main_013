import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import SubCarousel from "../../components/subcategories/SubCalousel";
import Products from "../../components/mains/Product";
import { useDispatch, useSelector } from "react-redux";
import {getLibrary, getSub, getAsc, getCount} from "../../reduxstore/slices/sub/LibrarySlice";
import RankingDown from "../../components/subcategories/DropDown";

import { useInView } from 'react-intersection-observer';

function Library({ mainClick, subclick }) {
  console.log(mainClick,subclick );
  
  //소분류에 따른 대분류카테고리 이름 지정
  let mainCateClick = '서재';

  const dispatch = useDispatch();


  // const subSelector = useSelector((state) => state.library);
  // console.log(subSelector);

  const countSelector = useSelector(
    (state) => state.library.coutnInitial.count
  );

  const [page, setPage] = useState(0);

  // 셀렉트 박스
  const [dropDownclicked, setDropDownClicked] = useState("최신순");
  const [third, setThird] = useState("desc");
  const [closeDropDown, setDloseDropDown] = useState(false);

  let sortArgument = "createdAt";
  if(dropDownclicked ==='판매순'){
    sortArgument = 'sale';
  } else if(dropDownclicked === '높은가격순'|| dropDownclicked === '낮은가격순'){
    sortArgument = 'price';
  } else{
    sortArgument = 'createdAt';
  }


  console.log(mainCateClick,subclick, dropDownclicked,sortArgument, third );

  const modalRef = useRef();

  const closeHandler = () => {
    setDloseDropDown(!closeDropDown);
  };

  const outModalCloseHandler = (e) => {
    if (closeDropDown && !modalRef.current.contains(e.target))
      setDloseDropDown(false);
  };
  // useEffect(() => {
  //     dispatch(getSub({ mainCateClick, subclick, page, sortArgument, third }));
  //   // dispatch(getCount());
  // }, [subclick]);

  const libraryInitialSelector = useSelector((state) => state.library.libraryInitial);
  console.log('112', libraryInitialSelector);
  const [ref, inView] = useInView();

  useEffect(() => {
    if(libraryInitialSelector?.length === 0){
      console.log('첫 포스트 로딩');
      dispatch(getSub({ mainCateClick, subclick, page, sortArgument, third }));
      // setPage(page+1)
    }
  }, [subclick]);

  useEffect(()=>{
    if(libraryInitialSelector?.length !==0 && inView) {
        console.log('첫 로딩 이후 무한 스크롤');
        setPage(page+1)
        dispatch(getSub({ mainCateClick, subclick, page, sortArgument, third }));
    }
  },[inView]);

  return (
    <SubBlock onClick={outModalCloseHandler}>
      <SubCarousel />
      <FilterBlock>
        <div className="total">{countSelector}개의 상품이 있습니다</div>
        <section ref={modalRef}>
          <RankingDown
            dropDownclicked={dropDownclicked}
            setDropDownClicked={setDropDownClicked}
            closeDropDown={closeDropDown}
            closeHandler={closeHandler}
            setThird={setThird}
            third={third}
          />
        </section>
      </FilterBlock>
      <ProductList>
        {libraryInitialSelector?.map((product) => (
          <Products proId={product.id} product={product} key={product.id} />
        ))}
        {/* <div ref={loadingRef}></div> */}
      </ProductList>
    </SubBlock>
  );
}
export default Library;

const SubBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 127.5px;
  padding: 3vh 4vw;
  align-items: center;
  .sub-menus {
    display: flex;
    width: 100%;
    margin: 20px 0px;
    justify-content: space-evenly;
  }
  .total {
    width: 100%;
    margin: 15px 0px;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    justify-content: flex-start;
  }
`;

const FilterBlock = styled.div`
  color: #272727;
  margin-top: 10px;
  width: 100%;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  div {
    white-space: nowrap;
  }
  @media (max-width: 1023px) {
    padding: 0 1rem;
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  @media screen and (max-width: 479px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
