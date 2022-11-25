import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import SubCarousel from "../../components/subcategories/SubCalousel";
import Products from "../../components/mains/Product";

import chair from "../../imgs/chair.png";
import desk from "../../imgs/desk.png";
import shelf from "../../imgs/shelf.png";
import room from "../../imgs/room.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getBedroom} from "../../reduxstore/slices/sub/bedrommSlice";

function Bedroom({ click }) {
  console.log(click);

  const dispatch = useDispatch();
  const bedroomSelector = useSelector(
    (state) => state.bedroom.bedroomInitial.content
  );
  console.log(bedroomSelector);

  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);


  useEffect(() => {
      dispatch(getBedroom({ page }));
  }, []);

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
            {bedroomSelector?.map((product) => (
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
  div{
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