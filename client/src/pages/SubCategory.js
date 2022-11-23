import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import SubCarousel from "../components/subcategories/SubCalousel";
import Apis from "../apis/apis";
import Products from "../components/mains/Product";
import { getSubCategory } from "../reduxstore/slices/subCategorySlice";

import chair from "../imgs/chair.png";
import desk from "../imgs/desk.png";
import shelf from "../imgs/shelf.png";
import room from "../imgs/room.jpg";
import { useSelector, useDispatch } from "react-redux";

const SubBlock = styled.div`
  width: 100%;
  margin-top: 160px;
  padding: 30px 40px 30px 40px;
  div {
    display: flex;
  }
  .sub-menus {
    margin: 20px 0px;
    justify-content: space-between;
  }
`;

const Sub = styled.div`
  width: 200px;
  height: 120px;
  background-color: #f6f4e7;
  &:hover {
    background-color: #e1dfce;
  }
  img {
    width: 70px;
    height: 70px;
    margin-bottom: 7px;
  }
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductList = styled.div`
  width: 100%;
  flex-direction: column;
  .total {
    margin: 15px 0px;
    font-weight: 600;
    font-size: 20px;
  }
  .products {
    flex-wrap: wrap;
  }
`;

function SubCategory({ click }) {
  console.log(click);

  const dispatch = useDispatch();
  const allSelector = useSelector((state) => (state.subcategory.subCategoryInitial.content))
  console.log(`allSelector`,allSelector);

  const [page, setPage] = useState(0);
  const [isClick, setIsClick] = useState(click);

  useEffect(() => {
    if (click === '서재' || click === '침실' || click === '거실' || click === '주방'){
      dispatch(getSubCategory({click,page}))
    } else if (click === '책상' || click === '의자' || click === '책장' || click === '선반'){
      dispatch(getLibrary({click,page}))
    } else if (click === '침대' || click === '행거/옷장' || click === '화장대'){
      dispatch(getBedroom({click,page}))
    } else if (click === '소파' || click === '거실장' || click === '수납장'){
      dispatch(getLivingRoom({click,page}))
    } else if (click === '식탁/아일랜드' || click === '식탁의자' || click === '주방수납'){
      dispatch(getKitchen({click,page}))
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
      <ProductList>
        <div className="total">0 개의 상품이 있습니다</div>
        <div className="products">
          {allSelector?.map((product) => (
            <Products proId={product.id} product={product} key={product.id} />
          ))}
        </div>
        {/* <div ref={loadingRef}></div> */}
      </ProductList>
    </SubBlock>
  );
}
export default SubCategory;

