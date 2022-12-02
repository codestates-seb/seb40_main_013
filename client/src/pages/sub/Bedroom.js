import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import SubCarousel from "../../components/subcategories/SubCalousel";
import Products from "../../components/mains/Product";
import { useDispatch, useSelector } from "react-redux";
import { getSub, getCount } from "../../reduxstore/slices/subCategorySlice";
import RankingDown from "../../components/subcategories/DropDown";

function Bedroom({ mainClick, subclick }) {
  //소분류에 따른 대분류카테고리 이름 지정
  let mainCateClick = "침실";
  console.log(subclick);

  const dispatch = useDispatch();

  const subSelector = useSelector((state) => state.subCatetory.subInitial);
  const countSelector = useSelector(
    (state) => state.subCatetory.coutnInitial.count
  );

  const [page, setPage] = useState(0);

  // 셀렉트 박스
  const [dropDownclicked, setDropDownClicked] = useState("최신순");
  const [third, setThird] = useState("desc");
  const [closeDropDown, setDloseDropDown] = useState(false);

  let sortArgument = "createdAt";
  if (dropDownclicked === "판매순") {
    sortArgument = "sale";
  } else if (
    dropDownclicked === "높은가격순" ||
    dropDownclicked === "낮은가격순"
  ) {
    sortArgument = "price";
  } else {
    sortArgument = "createdAt";
  }

  const modalRef = useRef();

  const closeHandler = () => {
    setDloseDropDown(!closeDropDown);
  };

  const outModalCloseHandler = (e) => {
    if (closeDropDown && !modalRef.current.contains(e.target))
      setDloseDropDown(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(getSub({ mainCateClick, subclick, page, sortArgument, third }));
    dispatch(getCount({ mainCateClick, subclick }));
  }, [subclick, sortArgument, third]);

  return (
    <SubBlock onClick={outModalCloseHandler}>
      <SubCarousel />
      <FilterBlock>
        {subclick != "" ? (
          <SubMenuWord>{subclick}&nbsp;</SubMenuWord>
        ) : (
          <SubMenuWord>{mainCateClick}&nbsp;전체상품&nbsp;</SubMenuWord>
        )}
        <div className="total">에 {countSelector} 개의 상품이 있습니다</div>
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
        {subSelector?.map((product) => (
          <Products proId={product.id} product={product} key={product.id} />
        ))}
        {/* <div ref={loadingRef}></div> */}
      </ProductList>
    </SubBlock>
  );
}

export default Bedroom;

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
    color: #272727;
  }
`;

const FilterBlock = styled.div`
  color: #272727;
  margin-top: 10px;
  width: 100%;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
  div {
    white-space: nowrap;
  }
  @media (max-width: 1023px) {
    padding: 0 1rem;
  }
`;

const SubMenuWord = styled.div`
  font-size: 30px;
  color: #272727;
  display: flex;
  align-items: center;
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
