import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import Products from "../components/mains/Product";
import RankingDown from "../components/DropDown";

import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, countSearchResult } from "../reduxstore/slices/articleSlice";
import { useInView } from 'react-intersection-observer';
import LoadingIcon from "../components/LoadingIcon";

function SearchResult ({searchWord}) {

  console.log(`searchWord`,searchWord);

  const dispatch = useDispatch();
  const searchResultSelector = useSelector((state) => state.article.searchResultInitial);
  const countSearchResultSelector = useSelector((state) => state.article.countSearchResultInitial); 
  console.log(searchResultSelector);

  const [dropDownclicked, setDropDownClicked] = useState('최신순'); //셀렉트박스
  const [third, setThird] = useState('desc'); //셀렉트박스
  const [closeDropDown, setDloseDropDown] = useState(false);

  let sortArgument = "createdAt";
  if(dropDownclicked ==='판매순'){
    sortArgument = 'sale';
  } else if(dropDownclicked === '높은가격순'|| dropDownclicked === '낮은가격순'){
    sortArgument = 'price';
  } else{
    sortArgument = 'createdAt';
  };

  const modalRef = useRef();

  const closeHandler = () => {
      setDloseDropDown(!closeDropDown);
  };

  const outModalCloseHandler = (e) => {
    if (closeDropDown && !modalRef.current.contains(e.target))
      setDloseDropDown(false);
  };

  const [page, setPage] = useState(0);
  console.log(searchWord);

  const { infiniteList } = useSelector((state) => state.infinite); // store에서 movieList를 가져옴
  const [ref, inView] = useInView();
 
  // useEffect(() => {
  //   if(searchWord != '' && infiniteList.length === 0 ){
  //     console.log('첫 포스트 로딩');
  //     dispatch(loadInfinite({searchWord, page}));
  //     dispatch(countSearchResult(searchWord));
  //     return;
  //   }
  // }, [searchWord]);
 
  // useEffect(()=>{
  //   if(infiniteList.length !==0 && inView) {
  //       console.log('첫 로딩 이후 무한 스크롤');
  //       dispatch(loadInfinite({ searchWord, page }));
  //     }
  // },[inView]);
  const [loading, setLoading] = useState(true);
  const [storageWord, setStorageWord] = useState('');

    useEffect(() => {
      const loadRecentKeyword = localStorage.getItem("keywords")
      ? JSON.parse(localStorage.getItem("keywords"))
      : [];
      if(loadRecentKeyword) setStorageWord(loadRecentKeyword[0].text);
      setLoading(false);
    },[searchWord]);

    useEffect(() => {
      dispatch(countSearchResult(storageWord))
    },[]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if(storageWord != '' ){
      dispatch(getSearchResult({ storageWord, page, sortArgument, third}));
    }
  }, [storageWord, sortArgument, third ]);

  console.log({storageWord, sortArgument, third});
    if(loading) return <LoadingIcon/>

    return (
      <SubBlock onClick={outModalCloseHandler}>
        <FilterBlock>
          <div className="total">
            <div>{storageWord}</div>
            <CountBlock>(으)로 {countSearchResultSelector} 개의 상품이 검색되었습니다.</CountBlock>
          </div>
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
            {searchResultSelector?.map((product) => (
              <Products proId={product.id} product={product} key={product.id} />
            ))}
            <div ref={ref} />
        </ProductList>
    </SubBlock>
  );
}
export default SearchResult;

const SubBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 127.5px;
    padding: 3vh 4vw;
    align-items: center;
    .total {
      width: 100%;
      font-weight: 300;
      font-size: 2rem;
    }
`;

const FilterBlock = styled.div`
    width: 100%;
    padding: 0 2.5rem;
    display: flex;
    justify-content: space-between;
    div{
      white-space: nowrap;
    }
    section{
      padding-top: 28px;
    }
    @media (max-width: 1023px) {
      padding: 0 1rem;
    }
`;

const CountBlock = styled.div`
    padding-top: 0.8em;
    font-size: 1rem;
`;

const ProductList = styled.div`
    margin-top: 8px;
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

