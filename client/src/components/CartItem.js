import styled from "styled-components/macro";
import { IoMdClose} from 'react-icons/io';
import { IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import { useState } from "react";
import { deleteShoppingCart } from "../reduxstore/slices/articleSlice";
import { useDispatch } from "react-redux";
import { reCountCartItem } from "../reduxstore/slices/articleSlice";


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
        min-width: 6.5rem;
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
    //input 화살표 지우는 방법
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

const EachCheckCircle = styled.input`
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px solid #999;
    appearance: none;
    cursor: pointer;
    transition: background 0.2s;
    &:checked {
        background: #ffaf51;
        border: none;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    }
`;
useDispatch

function CartItem({cartItem, changeEachCheck, checkList}) {
    const dispatch = useDispatch();
    const { brandName, count, img, price, productCartId, productId, title } = cartItem

    const [itemCount, setItemCount] = useState(count);

    const removeCartItem = () => {
        dispatch(deleteShoppingCart(productCartId))
    };

    const ReCountHandler = () => {
        dispatch(reCountCartItem({productCartId, itemCount}))
    };

    const upCountHandler = () => {
        setItemCount(parseInt(itemCount) + 1) 
    };

    const downCountHandler = () => {
        if(parseInt(itemCount) > 1){
            setItemCount(parseInt(itemCount) - 1) 
        } else { 
            alert('최소 1개 이상 주문 가능합니다.')
        }
    };

    const onChangeCount = (e) => {
        setItemCount(e.target.value)
    }

    return(
        <>
            <CartItemBlock>
                <div className="part">
                    <EachCheckCircle 
                        type='checkbox' 
                        onChange={e => changeEachCheck(e.target.checked, cartItem)}
                        checked={checkList.includes(cartItem) ? true : false}
                    />
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
                            <Input className="count" type='number' value={itemCount} onChange={onChangeCount}></Input>
                            <UpCount onClick={upCountHandler}/>
                        </div>
                        <ReCount onClick={ReCountHandler}>주문수정</ReCount>
                    </div>
                    <div className="product-price">{(itemCount * price).toLocaleString("en-US")}원</div>
                    <ItemDelete onClick={removeCartItem}/>
                </div>
            </CartItemBlock>
        </>
    )
} 

export default CartItem;