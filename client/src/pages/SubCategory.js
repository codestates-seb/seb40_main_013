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
import { getSubCategory } from "../reduxstore/slices/articleSlice";

const SubBlock = styled.div`
    width: 100%;
    margin-top: 170px;
    padding: 30px 40px 30px 40px;
    div{
        display: flex;
    }
    .sub-menus{
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

function SubCategory({click}) {
 const dispatch = useDispatch();
 const subSeletor = useSelector((state) => state.article.subCategoryInitial[0]?.content)
  console.log(subSeletor);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [prevY, setPrevY] = useState(0);
  let productsRef = useRef({})

  let loadingRef = useRef(null);
   let prevYRef = useRef({});
   let pageRef = useRef({});
   productsRef.current = subSeletor;
   pageRef.current = page;
   let pageCurrent = pageRef.current;
   console.log(`pageCurren`, pageCurrent, `page`, page);

   prevYRef.current = prevY

  console.log(`loadingRef:`, loadingRef);

  useEffect(() => {
    getProducts();
    setPage(pageRef.current + 1);
    
    let options ={
        root: null, //root는 기본적으로 스크롤 가능한 영역, null을 입력하면 전체 브라우저 창이 됨
        rootMargin: '150px',
        htreshold: 0.7 //관찰해야 하는 대상 요소의 100%를 의미한다.
    }

    const observer = new IntersectionObserver(handleObserver, options)
    observer.observe(loadingRef.current);
  }, []);

  const handleObserver = (entities, observer) => {
    console.log("time");

    const y = entities[0].boundingClientRect.y;

    if (prevYRef.current > y){
        console.log(`real get list`);
        getProducts();
        setPage(pageRef.current + 1);
    } else {
        console.log('loading false');
    }
    console.log(`currenty`, y, `prevY`, prevY);
    setPrevY(y);
  }
  
  const getProducts = async () => {
    try{
      let productsRes =  dispatch(getSubCategory({click, pageCurrent}));//asyncthunk는 첫번째인자는 변경할 수 있는데, 두번째 인자는 변경할 수 없어 {}로 묶어서 하나의 인자로 첫번쨰로만 보냄
      if (productsRes) {
        setProducts([...productsRef.current, ...productsRes.data.content]);
        console.log(productsRes.data.content);
        console.log(`page`,pageRef.current );
      } 
    } catch (error) {
        console.log('ERROR GETTING PRODUCTS');
    }
  }

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
        <div className="products" >
          {subSeletor?.map((product) => ( //{ img, brand, title, price, score }
            <Products
              porId={product.id}
              product={product}
              key={product.id}
            />
          ))}
        </div>
        <div ref={loadingRef}></div>
      </ProductList>
    </SubBlock>
  );
}
export default SubCategory;
