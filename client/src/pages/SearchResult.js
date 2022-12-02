import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import Products from "../components/mains/Product";
import RankingDown from "../components/subcategories/DropDown";

import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, countSearchResult } from "../reduxstore/slices/articleSlice";
import { loadInfinite } from "../reduxstore/slices/intinitiSlice";
// import { useInView } from 'react-intersection-observer';
import Apis from "../apis/apis";

function SearchResult ({searchWord}) {

  console.log(`searchWord`,searchWord);

  const dispatch = useDispatch();
  const searchResultSelector = useSelector((state) => state.article.searchResultInitial.content);
  const countSearchResultSelector = useSelector((state) => state.article.countSearchResultInitial); 
  
  const [dropDownclicked, setDropDownClicked] = useState('최신순'); //셀렉트박스
  const [third, setThird] = useState('asc'); //셀렉트박스
  const [closeDropDown, setDloseDropDown] = useState(false);
  console.log(`dropDownclicked`, dropDownclicked);
  console.log(`third`, third);

  const first = 'createdAt';
  const secound = 'price';
  const fourth = 'sale';


  const modalRef = useRef();

  const closeHandler = () => {
      setDloseDropDown(!closeDropDown);
  };

  const outModalCloseHandler = (e) => {
    if (closeDropDown && !modalRef.current.contains(e.target))
      setDloseDropDown(false);
  };
  
  const [page, setPage] = useState(0);

  const {infiniteList} =useSelector(state => state.infinite)
  console.log(infiniteList);
  // const [ref, inView] = useInView();

  // useEffect(() => {
  //     dispatch(getSearchResult({ searchWord, page }));
  //     dispatch(countSearchResult(searchWord))
  // }, [searchWord]);
console.log(page);
  useEffect(() => {
    if(infiniteList.length === 0){
      console.log('첫 포스트 로딩');
      dispatch(loadInfinite({searchWord, page }));
     
    }
  }, [searchWord]);

  // useEffect(()=>{
  //   if(infiniteList.length !==0 && inView) {
  //       console.log('첫 로딩 이후 무한 스크롤');
  //       setPage(page+1)
  //       dispatch(loadInfinite({searchWord, page }));

  //   }
  // },[inView]);

    return (
      <SubBlock onClick={outModalCloseHandler}>
        <FilterBlock>
          <div className="total">
            <div>{searchWord}</div>
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
            {infiniteList?.map((product) => (
              <Products proId={product.id} product={product} key={product.id} />
            ))}
        <div ref={ref}></div>
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



// const [products, setProducts] = useState([]);
//   console.log(products);
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);
  
//   const [prevY, setPrevY] = useState(0);
//   let productsRef = useRef({})

//   let loadingRef = useRef(null);
//   let prevYRef = useRef({});
//   let pageRef = useRef({});
//   productsRef.current = products;
//   pageRef.current = page;

//   prevYRef.current = prevY

//   useEffect(() => {
//     getProducts();
//     setPage(pageRef.current + 1);

//     let options = {
//       root: null, //root는 기본적으로 스크롤 가능한 영역, null을 입력하면 전체 브라우저 창이 됨
//       rootMargin: "150px",
//       htreshold: 0.6, //관찰해야 하는 대상 요소의 100%를 의미한다.
//     };

//     const observer = new IntersectionObserver(handleObserver, options);
//     observer.observe(loadingRef.current);
//   }, [searchWord]);

//   useEffect(() => {
//     dispatch(countSearchResult(searchWord))
//   }, []);

//   const handleObserver = (entities, observer) => {
//     console.log("time");

//     const y = entities[0].boundingClientRect.y; 

//     if (prevYRef.current > y) {
//         console.log(`real get list`);
//         getProducts();
//         setPage(pageRef.current + 1);
//     } else {
//         console.log("loading false");
//     }
//     console.log(`currenty`, y, `prevY`, prevY);
//     setPrevY(y);
//   };
    
//   const getProducts = async () => {
//     try {
//         let productsRes = await Apis.get(
//           `products/search?title=${searchWord}&page=${pageRef.current}`
//         )
//         if (productsRes) {
//           console.log(productsRes);
//           setProducts([...productsRef.current, ...productsRes.data.content]);
//           console.log(productsRes.data.sliceInfo.hasNext);
//         }
//     } catch (error) {
//       console.log("ERROR GETTING PRODUCTS");
//     }
//   };
