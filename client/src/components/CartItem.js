import styled from "styled-components/macro";
import { IoMdClose} from 'react-icons/io';
import { AiFillCheckCircle} from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import Apis from "../apis/apis";

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

const DownCount = styled(IoIosArrowBack)`
    color: #AAAAAA;
    border: 1px solid #AAAAAA;
    border-radius: 3px;
    margin: 5px;
`;
    
 const UpCount = styled(IoIosArrowForward)`
    color: #AAAAAA;
    border: 1px solid #AAAAAA;
    border-radius: 3px;
    margin: 5px;
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

function CartItem({cartItem}) {
    let jwtToken = localStorage.getItem("Authorization");

    const { brandName, count, img, price, productCartId, productId, title } = cartItem

    const removeCartItem = ({target}) => {
        console.log(target.current);
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

    return(
        <>
            <CartItemBlock>
                <div className="part">
                    <AiFillCheckCircle  color="#FFAF51" size="20"/>
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
                            <DownCount/>
                            <div className="count">{count}</div>
                            <UpCount/>
                        </div>
                        <ReCount>주문수정</ReCount>
                    </div>
                    <div className="product-price">{price}원</div>
                    <ItemDelete onClick={removeCartItem}/>
                </div>
            </CartItemBlock>
        </>
    )
} 

export default CartItem;