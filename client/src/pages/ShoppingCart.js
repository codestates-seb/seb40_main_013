import styled from "styled-components/macro";
import { AiOutlineCheckCircle, AiFillCheckCircle} from 'react-icons/ai';
import { IoMdClose} from 'react-icons/io';
import { IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';

import chair from '../imgs/chair3.png'

const CartBlock = styled.div`
     margin: 30px 40px;
     div{
        display: flex;
     }
     .cart-title{
        font-size: 28px;
        padding-left: 20px;
        margin-bottom: 20px;
        font-weight: 600;
     }
`;

const AllCheck = styled.div`
    padding-left: 23px;
    margin: 10px;
    font-size: 15px;
    color: #AAAAAA;
    span{
        margin-left: 5px;
    }
`;

const CartList = styled.div`
    padding: 0px 20px;
    flex-direction: column;

`;

const Cart = styled.div`
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


//결제정보
const Payment = styled.section`
    width: 300px;
    height: 300px;
    border: 1px solid #002C6D;
    border-radius: 5px;
    padding: 20px;
    .pay-title{
        font-weight: 500;
    }
`;
const PayInfo = styled.div`
    flex-direction: column;
    width: auto;
    height: auto;
    border-top: 1px solid #002C6D;
    border-bottom: 1px solid #002C6D;
    padding: 10px 0px;
    margin: 10px 0px;
    font-size: 13px;
    color: #AAAAAA;
    div{
        padding: 8px 0px;
        justify-content: space-between;
     }
    .sale{
        color: #FFAF51;
    }
`;

const TotalPrice = styled.div`
    padding: 8px 0px 15px 0px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    .small{
        font-size: 16px;
    }
`;

const PayButton = styled.button`
    width: 100%;
    height: 40px;
    background-color: #002C6D;
    color: white;
    font-size: 16px;
    font-weight: 500;
    border-radius: 3px;
`;

function ShoppingCart() {
  return(
    <CartBlock>
        <div className="cart-title">장바구니</div>
        <AllCheck>
            <AiOutlineCheckCircle />
            <span>전체선택</span>
            <span>ㅣ</span>
            <span>선택삭제</span>
        </AllCheck>
        <div>
            <CartList>
                <Cart>
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
                </Cart>
                <Cart>
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
                </Cart>
                <Cart>
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
                </Cart>
            </CartList>
            <Payment>
                <div className="pay-title">결제정보</div>
                <PayInfo>
                    <div>
                        <span>상품수</span>
                        <span>2 개</span>
                    </div>
                    <div>
                        <span>상품금액</span>
                        <span>475,410 원</span>
                    </div>
                    <div>
                        <span>할인금액</span>
                        <span className="sale">0 원</span>
                    </div>
                    <div>
                        <span>배송비</span>
                        <span>0 원</span>
                    </div>
                </PayInfo>
                <TotalPrice>
                    <span className="small">총 결제금액</span>
                    <span>475,410 원</span>
                </TotalPrice>
                <PayButton>구매하기</PayButton>
            </Payment>
        </div>
    </CartBlock>      
  )
}

export default ShoppingCart;