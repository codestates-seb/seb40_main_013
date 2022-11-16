import styled from "styled-components/macro";
import { IoMdClose} from 'react-icons/io';
import { AiFillCheckCircle} from 'react-icons/ai';
import chair from '../imgs/chair3.png'
import { IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';

const CartItemBlock = styled.div`
    width: 600px;
    height: 130px;
    border: 1px solid #AAAAAA;
    border-radius: 5px;
    padding: 24px 10px;
    margin-bottom: 15px;
    align-items: center;
    img{
        width: 100px;
        height: 100%;
        padding: 0px 10px;
    }
    .product-info{
        width: 100%;
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
    }
    .product-price{
        width: 200px;
        padding: 0px 10px;
        justify-content: flex-end;
        font-weight: 600;
    }
    .count{
        align-items: center;
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

function CartItem() {
    return(
        <>
            <CartItemBlock>
                <AiFillCheckCircle  color="#FFAF51" size="37"/>
                <img src={chair} alt='장바구니 물건'></img>
                <div className="product-info">
                    <div className="brand">브랜드</div>
                    <div className="product-name">이름</div>
                    <div className="time">2~3일 이내 도착 예정</div>
                </div>
                <div>
                    <DownCount/>
                    <div className="count">0</div>
                    <UpCount/>
                </div>
                <div className="product-price">475,410 원</div>
                <IoMdClose size="30" />
            </CartItemBlock>
        </>
    )
} 

export default CartItem;