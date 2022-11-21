import styled from "styled-components/macro";
import { IoMdClose} from 'react-icons/io';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import Apis from "../apis/apis";
import { useState } from "react";

const CartItemBlock = styled.div`
    width: 100%;
    height: 130px;
    border: 1px solid #AAAAAA;
    border-radius: 5px;
    padding: 24px 10px;
    margin-bottom: 15px;
    align-items: center;
    justify-content: space-between;
    img{
        width: 100px;
        height: 100%;
        padding: 0px 10px;
    }
    .product-price{
        padding: 0px 10px;
        justify-content: flex-end;
        font-weight: 600;
        min-width: 110px;
    }
    .count-zone{
        flex-direction: column;
    }
    .count{
        align-items: center;
    }
    .part{
        align-items: center;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
`;

const ProductInfo = styled.div`
    /* width: 100%; */
    height: 100%;
    flex-direction: column;
    .brand{
        font-size: 11px;
        color: #AAAAAA;
        margin-bottom: 3px;
    }
    .product-name{
        font-weight: 600;
        margin-bottom: 5px;
    }
    .time{
        font-size: 13px;
        color: #FFAF51;
    }
`;

const Input = styled.input`
    width: 30px;
    height: 20px;
    margin: 5px 0px;
    text-align: center;
`;

const DownCount = styled(IoIosArrowBack)`
    color: #AAAAAA;
    border: 1px solid #AAAAAA;
    border-radius: 3px;
    margin: 7px 5px;
    cursor: pointer;
`;
    
 const UpCount = styled(IoIosArrowForward)`
    color: #AAAAAA;
    border: 1px solid #AAAAAA;
    border-radius: 3px;
    margin: 7px 5px;
    cursor: pointer;
`;

const ReCount = styled.button`
    cursor: pointer;
    color: #AAAAAA;
    border: 1px solid #AAAAAA;
    border-radius: 3px;
    margin: 5px;
    background-color: white;
`;

const ItemDelete = styled(IoMdClose)`
    width: 25px;
    height: 25px;
    cursor: pointer;
    color: gray;
`;

const EachCheckCircle = styled(AiOutlineCheckCircle)`
    font-size: 20px;
    color: #aaaaaa;
    &.all-check{
        color: #FFAF51;
    }
`;

function CartItem({cartItem, allCheck}) {
    let jwtToken = localStorage.getItem("Authorization");
    const { brandName, count, img, price, productCartId, productId, title } = cartItem

    const [itemCount, setItemCount] = useState(count);

    const removeCartItem = () => {
        Apis.delete(`carts/${productCartId}`,
        { 
          headers: {
            Authorization: `${jwtToken}`
          },
        })
        .then((res) => {
            console.log(res.data);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const ReCountHandler = () => {
        Apis.patch(`carts/${productCartId}`,
        { 
          productCartId: `${productCartId}`,
          count : `${itemCount}`
        },
        { headers: {
            Authorization: `${jwtToken}`
          }
        })
        .then((res) => {
            console.log(res.data);
            window.location.reload();
        })
        .catch((err) => {
            alert(err);
        })
    } 

    const upCountHandler = () => {
        setItemCount(itemCount + 1) 
    };

    const downCountHandler = () => {
        if(itemCount > 0){
            setItemCount(itemCount - 1) 
        } else { 
            setItemCount(0) 
        }
    };

    const onChange = (e) => {
        setItemCount(e.target.value)
    }

    return(
        <>
            <CartItemBlock>
                <div className="part">
                    <EachCheckCircle className={allCheck? 'all-check' : ''}/>
                    <img src={img.fullPath} alt='장바구니 물건'></img>
                    <ProductInfo>
                        <div className="brand">{brandName}</div>
                        <div className="product-name">{title}</div>
                        <div className="brand">옵션 : 빨강</div>
                        <div className="time">2~3일 이내 도착 예정</div>
                    </ProductInfo>
                </div>
                <div className="part">
                    <div className="count-zone">
                        <div>
                            <DownCount onClick={downCountHandler}/>
                            <Input className="count" type='number' value={itemCount} onChange={onChange}></Input>
                            <UpCount onClick={upCountHandler}/>
                        </div>
                        <ReCount onClick={ReCountHandler}>주문수정</ReCount>
                    </div>
                    <div className="product-price">{itemCount * price}원</div>
                    <ItemDelete onClick={removeCartItem}/>
                </div>
            </CartItemBlock>
        </>
    )
} 

export default CartItem;