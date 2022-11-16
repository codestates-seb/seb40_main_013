import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import SubCarousel from '../components/subcategories/SubCalousel'
import Apis from "../apis/apis";
import Products from "../components/mains/Product";

import chair from '../imgs/chair.png'
import chair2 from '../imgs/chair2.png'
import chair3 from '../imgs/chair3.png'
import chair4 from '../imgs/chair4.png'
import desk from '../imgs/desk.png'
import shelf from '../imgs/shelf.png'
import room from '../imgs/room.jpg'
import Goods from '../components/subcategories/goods'

const SubBlock = styled.div`
    margin: 30px 40px;
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
    background-color: #F6F4E7;
    &:hover{
        background-color: #E1DFCE;
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
    .total{
        margin: 15px 0px;
        font-weight: 600;
        font-size: 20px;
    }
    .products{
        flex-wrap : wrap
    }
`;

function SubCategory() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    Apis.get(`products`).then((data) => setProductList(data.data));
  }, []);
//   console.log(productList);

  return( 
    <SubBlock>
        <SubCarousel/>
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
                <img src={shelf} alt='선반 카테고리'></img>
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
            {productList.map((product) => (
                <Products
                   brand={product.brand}
                   img={product.img}
                   key={product.id}
                   name={product.name}
                   price={product.price}
                   star={product.star}
                />
             ))}
             <Goods img={chair3}/>
            </div>
        </ProductList>
    </SubBlock>
  )
}
export default SubCategory;