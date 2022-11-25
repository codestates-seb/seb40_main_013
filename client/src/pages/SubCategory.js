import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import SubCarousel from "../components/subcategories/SubCalousel";
import Apis from "../apis/apis";
import Products from "../components/mains/Product";

import chair from "../imgs/chair.png";
import desk from "../imgs/desk.png";
import shelf from "../imgs/shelf.png";
import room from "../imgs/room.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getBedroom,
  getKitchen,
  getLibrary,
  getLivingRoom,
  getSubCategory,
} from "../reduxstore/slices/subCategorySlice";

const SubBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 16vh;
  padding: 3vh 4vw;
  align-items: center;
  .sub-menus {
    display: flex;
    margin: 20px 0px;
    justify-content: space-evenly;
  }
  .total {
    width: 100%;
    margin: 15px 0px;
    font-weight: 600;
    font-size: 20px;
    display: flex;
    justify-content: flex-start;
  }
`;

const Sub = styled.div`
  display: flex;
  max-width: 230px;
  max-height: 130px;
  width: 20vw;
  height: 14vh;
  background-color: #f6f4e7;
  margin: 0 1em;
  &:hover {
    background-color: #e1dfce;
  }
  img {
    width: 5em;
    height: 5em;
    margin-bottom: 7px;
  }
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FilterBlock = styled.div`
  width: 100%;
  padding: 0 2.5em;
  display: flex;
  justify-content: space-between;
  div {
    white-space: nowrap;
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  justify-content: center;
  @media screen and (max-width: 390px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

function SubCategory({ click }) {
  console.log(click);

  const dispatch = useDispatch();
  const allSelector = useSelector(
    (state) => state.subcategory.subCategoryInitial.content
  );
  const librarySelector = useSelector(
    (state) => state.subcategory.libraryInitial.content
  ); //
  const bedroomSelector = useSelector(
    (state) => state.subcategory.bedroomInitial.content
  ); //
  const livingroomSelector = useSelector(
    (state) => state.subcategory.livingRoomInitial.content
  ); //
  const kitchemSelector = useSelector(
    (state) => state.subcategory.kitchenInitial.content
  ); //

  console.log(`allSelector`, allSelector?.length);

  const [page, setPage] = useState(0);
  const [isClick, setIsClick] = useState(click);

  useEffect(() => {
    if (
      click === "서재" ||
      click === "침실" ||
      click === "거실" ||
      click === "주방"
    ) {
      dispatch(getSubCategory({ click, page }));
    } else if (
      click === "책상" ||
      click === "의자" ||
      click === "책장" ||
      click === "선반"
    ) {
      dispatch(getLibrary({ click, page }));
    } else if (
      click === "침대/매트리스" ||
      click === "행거/옷장" ||
      click === "화장대"
    ) {
      dispatch(getBedroom({ click, page }));
    } else if (click === "소파" || click === "거실장" || click === "수납장") {
      dispatch(getLivingRoom({ click, page }));
    } else if (
      click === "식탁/아일랜드" ||
      click === "식탁의자" ||
      click === "주방수납"
    ) {
      dispatch(getKitchen({ click, page }));
    }
    // dispatch(getSubCategory({click,page}))
  }, [click]);

  useEffect(() => {
    if (
      click === "서재" ||
      click === "침실" ||
      click === "거실" ||
      click === "주방"
    ) {
      dispatch(getSubCategory({ click, page }));
    } else if (
      click === "책상" ||
      click === "의자" ||
      click === "책장" ||
      click === "선반"
    ) {
      dispatch(getLibrary({ click, page }));
    } else if (
      click === "침대/매트리스" ||
      click === "행거/옷장" ||
      click === "화장대"
    ) {
      dispatch(getBedroom({ click, page }));
    } else if (click === "소파" || click === "거실장" || click === "수납장") {
      dispatch(getLivingRoom({ click, page }));
    } else if (
      click === "식탁/아일랜드" ||
      click === "식탁의자" ||
      click === "주방수납"
    ) {
      dispatch(getKitchen({ click, page }));
    }
    // dispatch(getSubCategory({click,page}))
  }, [click]);

  return (
    <SubBlock>
      <SubCarousel />
      <div className="sub-menus">
        <Sub>
          <img src={room}></img>
          <div>전체보기</div>
        </Sub>
        <Sub>
          <img src={desk}></img>
          <div>책상</div>
        </Sub>
        <Sub>
          <img src={shelf} alt="선반 카테고리"></img>
          <div>선반</div>
        </Sub>
        <Sub>
          <img src={chair}></img>
          <div>의자</div>
        </Sub>
      </div>
      <FilterBlock>
        <div className="total">0 개의 상품이 있습니다</div>
        <div>최신순</div>
      </FilterBlock>
      <ProductList>
        {/* <div className="products"> */}
        {allSelector?.map((product) => (
          <Products proId={product.id} product={product} key={product.id} />
        ))}
        {/* {librarySelector?.map((product) => (
              <Products proId={product.id} product={product} key={product.id} />
            ))}
              {bedroomSelector?.map((product) => (
              <Products proId={product.id} product={product} key={product.id} />
            ))}
              {livingroomSelector?.map((product) => (
              <Products proId={product.id} product={product} key={product.id} />
            ))}
              {kitchemSelector?.map((product) => (
              <Products proId={product.id} product={product} key={product.id} />
            ))} */}
        {/* </div> */}
        {/* <div ref={loadingRef}></div> */}
      </ProductList>
    </SubBlock>
  );
}
export default SubCategory;
