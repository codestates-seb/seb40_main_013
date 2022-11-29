import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import SubCarousel from "../../components/subcategories/SubCalousel";
import Products from "../../components/mains/Product";

import { useDispatch, useSelector } from "react-redux";
import { getLivingRoom } from "../../reduxstore/slices/sub/LivingroomSlice";

function LivingRoom({ click }) {
  console.log(click);

  const dispatch = useDispatch();
  const livingRoomSelector = useSelector(
    (state) => state.livingroom.livingRoomInitial.content
  ); 
  console.log(livingRoomSelector);

  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(getLivingRoom({page })); //침실의 전체 
}, []);


    return (
      <SubBlock>
        <SubCarousel />
        <div className="sub-menus">
          <Sub>
            <div>전체보기</div>
          </Sub>
          <Sub>
            <div>소파</div>
          </Sub>
          <Sub>
            <div>거실장</div>
          </Sub>
          <Sub>
            <div>수납장</div>
          </Sub>
        </div>
        <FilterBlock>
          <div className="total">0 개의 상품이 있습니다</div>
          <div>최신순</div>
        </FilterBlock>
        <ProductList>
            {livingRoomSelector?.map((product) => (
              <Products proId={product.id} product={product} key={product.id} />
            ))}
        {/* <div ref={loadingRef}></div> */}
      </ProductList>
    </SubBlock>
  );
}
export default LivingRoom;

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
      font-weight: 600;
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
    width: 100%;
    padding: 0 2.5em;
    display: flex;
    justify-content: space-between;
    div{
      white-space: nowrap;
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