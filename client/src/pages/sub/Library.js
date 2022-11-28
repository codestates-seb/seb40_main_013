import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import SubCarousel from "../../components/subcategories/SubCalousel";
import Products from "../../components/mains/Product";
import { useDispatch, useSelector } from "react-redux";
import { getLibrary, getOne, getTwo, getThree, getFour, getAsc, getCount } from "../../reduxstore/slices/sub/LibrarySlice";
import RankingDown from "../../components/subcategories/DropDown";

function Library({ click }) {
  console.log(`click`, click); //

  const dispatch = useDispatch();
  const librarySelector = useSelector((state) => state.library.libraryInitial.content); 
  const oneSelector = useSelector((state) => state.library.oneInitial); 
  const twoSelector = useSelector((state) => state.library.twoInitial); 
  const threeSelector = useSelector((state) => state.library.threeInitial); 
  const fourSelector = useSelector((state) => state.library.fourInitial); 
  console.log(fourSelector);

  // const ascSelector = useSelector((state) => state.library.sublibraryInitial); 
  const countSelector = useSelector((state) => state.library.coutnInitial.count); 

  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  
  // 셀렉트 박스
  const [dropDownclicked, setDropDownClicked] = useState('최신순'); 
  const [third, setThird] = useState('asc');
  const [closeDropDown, setDloseDropDown] = useState(false);
  console.log(`dropDownclicked`, dropDownclicked);
  console.log(`third`, third);

  let sortArgument = 'createdAt';

  const modalRef = useRef();

  const closeHandler = () => {
      setDloseDropDown(!closeDropDown);
  };

  const outModalCloseHandler = (e) => {
    if (closeDropDown && !modalRef.current.contains(e.target))
      setDloseDropDown(false);
  };

  
  useEffect(() => {
    if(click === '책상'){
        dispatch(getOne({ click, page, sortArgument})); 
    } else if(click === '의자'){
        dispatch(getTwo({ click, page, sortArgument})); 
    } else if(click === '책장' ){
        dispatch(getThree({ click, page, sortArgument})); 
    } else if(click === '선반'){
        dispatch(getFour({ click, page, sortArgument})); 
    }
     else {
      dispatch(getLibrary({ page }));
      setProducts(librarySelector)
    }
    dispatch(getCount())
  }, [click]);

  console.log(`products`, products);

  // useEffect(() => {
  //   if(click === '책상' || click === '의자' || click === '책장' || click === '선반'){ //소분류
  //     if(dropDownclicked === '높은가격순'){
  //         sortArgument = 'price';
  //         dispatch(getSubLibrary({ click, page, sortArgument}));
  //     } else if (dropDownclicked === '판매순'){
  //         sortArgument = 'sale';
  //         dispatch(getSubLibrary({ click, page, sortArgument}));
  //     } else if (dropDownclicked === '낮은가격순'){
  //         sortArgument = 'price';
  //         dispatch(getAsc({ click, page, sortArgument, third}));
  //     } else if(dropDownclicked === '최신순') { // 최신순
  //         sortArgument = 'createdAt';
  //         dispatch(getSubLibrary({ click, page, sortArgument })); //흠...
  //     }
  //   }else if(click === '서재' ){ // 대분류
  //     if(dropDownclicked === '높은가격순'){
  //         sortArgument = 'sale';
  //         dispatch(getSubLibrary({ page, sortArgument}));
  //     } else if (dropDownclicked === '판매순'){
  //         sortArgument = 'sale';
  //         dispatch(getSubLibrary({ page, sortArgument}));
  //     } else if (dropDownclicked === '낮은가격순'){
  //         sortArgument = 'sale';
  //         dispatch(getAsc({page, sortArgument, third}));
  //     } else {
  //       dispatch(getLibrary({ page }));
  //     }
  //   } else {
  //     dispatch(getLibrary({ page }));
  //     // setProducts(librarySelector)
  //   }
  //   dispatch(getCount())
  // }, [dropDownclicked]);


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
            {products?.map((product) => (
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

const Sub = styled.div`
    display: flex;
    width: 13vw;
    height: 6vh;
    background-color: #fcf9e9;
    margin: 0 1em;
    &:hover {
      background-color: #e1dfce;
    }
    color: #515151;
    border-radius: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FilterBlock = styled.div`
    color: #272727;
    margin-top: 10px;
    width: 100%;
    padding: 0 2.5rem;
    display: flex;
    justify-content: space-between;
    div{
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