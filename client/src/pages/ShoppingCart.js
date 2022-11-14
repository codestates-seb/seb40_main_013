import styled from "styled-components/macro";
import { AiOutlineCheckCircle, AiFillCheckCircle} from 'react-icons/ai';
import { IoMdClose} from 'react-icons/io';

const CartBlock = styled.div`
     margin: 30px 40px;
     div{
        display: flex;
     }
`;
const CartList = styled.div`

`;

const Cart = styled.div`

`;

const Payment = styled.section`
    width: 300px;
    height: 400px;
    border: 1px solid #002C6D;
    border-radius: 5px;
    padding: 15px;
`;

function ShoppingCart() {
  return(
    <CartBlock>
        <div>장바구니</div>
        <div>
            <AiOutlineCheckCircle />
            <span>전체선택</span>
            <span>선택삭제</span>
        </div>
        <div>
            <CartList>
                <Cart>
                    <AiFillCheckCircle/>
                    <img></img>
                    <section>
                        <div>브랜드</div>
                        <div>이름</div>
                        <div>배송시간</div>
                    </section>
                    <div>
                        <button></button>
                        <div>0</div>
                        <button></button>
                    </div>
                    <div>가격</div>
                    <IoMdClose/>
                </Cart>
            </CartList>
            <Payment>
                <div>결제정보</div>
                <span>
                    <div>
                        <span>상품수</span>
                        <span>2개</span>
                    </div>
                    <div>
                        <span>상품수</span>
                        <span>2개</span>
                    </div>
                    <div>
                        <span>상품수</span>
                        <span>2개</span>
                    </div>
                    <div>
                        <span>상품수</span>
                        <span>2개</span>
                    </div>
                </span>
                <div>
                    <span>총 결제금액</span>
                    <span>가격</span>
                </div>
                <button>구매하기</button>
            </Payment>
        </div>
    </CartBlock>      
  )
}

export default ShoppingCart;