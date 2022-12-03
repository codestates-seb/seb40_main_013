import { useState, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import Products from "../../components/mains/Product";
import { useDispatch, useSelector } from "react-redux";
import { getSub, getCount} from "../../reduxstore/slices/subCategorySlice";
import RankingDown from "../../components/DropDown";
import Apis from "../../apis/apis";
import kitchenImg from '../../imgs/sub-kitchen.png';

function Kitchen({ mainClick, subclick }) {
  
  //소분류에 따른 대분류카테고리 이름 지정
  let mainCateClick = '주방';

  const dispatch = useDispatch();

  const subSelector = useSelector((state) => state.subCatetory.subInitial);
  const countSelector = useSelector((state) => state.subCatetory.coutnInitial.count);

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

  const modalRef = useRef();

  const closeHandler = () => {
    setDloseDropDown(!closeDropDown);
  };

  const outModalCloseHandler = (e) => {
    if (closeDropDown && !modalRef.current.contains(e.target))
      setDloseDropDown(false);
  };

  // useEffect(() => {
  //     dispatch(getSub({ mainCateClick, subclick, page, sortArgument, third }));
  //     dispatch(getCount({mainCateClick, subclick}));
  // }, [subclick, sortArgument, third ]);

  const [products, setProducts] = useState([]);
  console.log(products);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [a, setA] = useState(true);

  
  const [prevY, setPrevY] = useState(0);
  let productsRef = useRef({})

  let loadingRef = useRef(null);
  let prevYRef = useRef({});
  let pageRef = useRef({});
  productsRef.current = products;
  pageRef.current = page;

  prevYRef.current = prevY

  useEffect(() => {
    getProducts();
    setPage(pageRef.current + 1);

    let options = {
      root: null, //root는 기본적으로 스크롤 가능한 영역, null을 입력하면 전체 브라우저 창이 됨
      rootMargin: "150px",
      htreshold: 0.6, //관찰해야 하는 대상 요소의 100%를 의미한다.
    };

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(loadingRef.current);

  }, [mainClick ,subclick, dropDownclicked, third]);

  // useEffect(() => {
  //   window.location.reload(); //내일.....조건문짜기.. 한컴포넌트로 끝낼수 있게...
  // }, [subclick, dropDownclicked]);

  const handleObserver = (entities, observer) => {
    console.log("time");

    const y = entities[0].boundingClientRect.y; 

    // if(!a){
    //   console.log('까먹지마...');
    // }
    // else
     if (prevYRef.current > y) { //if(prevYref.curreent> y && hasnext)
        console.log(`real get list`);
        getProducts();
        setPage(pageRef.current + 1);
    }
    console.log(`currenty`, y, `prevY`, prevY);
    setPrevY(y);
  };
    
  const getProducts = async () => {
    try {
        let productsRes = await Apis.get(
          `products?main=${mainCateClick}&sub=${subclick}&page=${pageRef.current}&sortType=${sortArgument}&order=${third}`
        )
        if (productsRes) {
          console.log(productsRes);
          setProducts([...productsRef.current, ...productsRes.data.content]);
          setA(productsRes.data.sliceInfo.hasNext); // 요청 막기...
        }
    } catch (error) {
      console.log("ERROR GETTING PRODUCTS");
    }
  };

  return (
    <SubBlock onClick={outModalCloseHandler}>
      <ImgBLock>
        <SubTitleImg src={kitchenImg}/>
        <SubTitle>Kitchen</SubTitle>
      </ImgBLock>
      <FilterBlock>
        <CountBlock>
          { subclick != '' ? 
              <SubMenuWord>{subclick}&nbsp;</SubMenuWord> : 
              <SubMenuWord>{/* {mainCateClick} */}전체상품&nbsp;</SubMenuWord>
          }
          <div className="total">에&nbsp;{countSelector}&nbsp;개의&nbsp;상품이&nbsp;있습니다</div>
        </CountBlock>
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
        <div ref={loadingRef}></div>
      </ProductList>
    </SubBlock>
  );
}

export default Kitchen;

const SubBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 127.5px;
  padding: 3vh 4vw;
  align-items: center;
  position: relative;
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
    font-size: 18px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @media (max-width: 767px) {
      font-size: 16px;
      margin: 10px 0;
    }
    @media (max-width: 479px) {
      font-size: 13px;
      margin: 10px 0;
    }
  }
`;

const ImgBLock = styled.div`
  position: relative;
`;

const SubTitle = styled.div`
  font-size: 3.5rem;
  font-weight: 300;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 2px;
  animation: fadeInUp 1.4s;
  @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translate3d(0, 30%, 0);
        }
        to {
            opacity: 1;
            transform: translateZ(0);
        }
    }
`;

const SubTitleImg = styled.img`
    width: 100%;
`;

const FilterBlock = styled.div`
  color: #272727;
  margin-top: 10px;
  width: 100%;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1.1rem;
  div {
    white-space: nowrap;
  }
  @media (max-width: 1023px) {
    padding: 0 1rem;
  }
  section{
    padding-top: 1.8vh;
    @media (max-width: 479px) {
      padding-top: 1.2vh;
    }
  }
`;

const CountBlock = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const SubMenuWord = styled.div`
  font-size: 28px;
  color: #272727;
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    font-size: 22px;
  }
  @media (max-width: 479px) {
    font-size: 19px;
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
