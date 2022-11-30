import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import SubCarousel from "../../components/subcategories/SubCalousel";
import Products from "../../components/mains/Product";
import { useDispatch, useSelector } from "react-redux";
import {getLibrary, getSub, getAsc, getCount} from "../../reduxstore/slices/sub/LibrarySlice";
import RankingDown from "../../components/subcategories/DropDown";

function Library({ mainClick, subclick }) {
  console.log(`mainClick`, mainClick,`subclick`, subclick); //

  const dispatch = useDispatch();
  const librarySelector = useSelector((state) => state.library.libraryInitial);
  console.log('112', librarySelector);

  // const subSelector = useSelector((state) => state.library);
  // console.log(subSelector);

  const countSelector = useSelector(
    (state) => state.library.coutnInitial.count
  );

  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);

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

  console.log(`dropDownclicked`, dropDownclicked,`sortArgument`,sortArgument, `third`, third );

  const modalRef = useRef();

  const closeHandler = () => {
    setDloseDropDown(!closeDropDown);
  };

  const outModalCloseHandler = (e) => {
    if (closeDropDown && !modalRef.current.contains(e.target))
      setDloseDropDown(false);
  };
  useEffect(() => {
    if (
      subclick == "책상" ||
      subclick == "의자" ||
      subclick == "책장" ||
      subclick == "선반"
    ) {
      console.log(11);
      dispatch(getSub({ mainClick, subclick, page, sortArgument, third }));
    } else {
      dispatch(getLibrary({ mainClick, page, sortArgument, third }));
    }
    // dispatch(getCount());
  }, [subclick]);

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
        {librarySelector?.map((product) => (
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
