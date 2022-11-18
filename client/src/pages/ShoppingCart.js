import styled from "styled-components/macro";
import { AiOutlineCheckCircle } from "react-icons/ai";
import CartItem from "../components/CartItem";

const CartBlock = styled.div`
  margin-top: 160px;
  width: 100%;
  height: 100%;
  /* min-height: 670px; */
  padding: 30px 40px 50px 40px;
  justify-content: center;
  display: flex;
  div {
    display: flex;
    div{
        display: flex;
    }
    .cart-title{
        font-size: 28px;
        padding-left: 20px;
        margin-bottom: 20px;
        font-weight: 600;
    }
  }
`;

const AllCheck = styled.div`
  padding-left: 13px;
  margin: 10px;
  font-size: 15px;
  color: #aaaaaa;
  span {
    margin-left: 5px;
  }
`;

const Quary = styled.div`
    @media screen and (max-width: 767px) {
            flex-direction: column;
    }
`;

const CartList = styled.div`
  padding: 0px 10px;
  flex-direction: column;
`;

//결제정보
const Payment = styled.section`
  width: 300px;
  height: 300px;
  min-width: 230px;
  border: 1px solid #002c6d;
  border-radius: 5px;
  padding: 20px;
  margin-left: 10px;
  .pay-title {
    font-weight: 500;
  }
`;
const PayInfo = styled.div`
  flex-direction: column;
  width: auto;
  height: auto;
  border-top: 1px solid #002c6d;
  border-bottom: 1px solid #002c6d;
  padding: 10px 0px;
  margin: 10px 0px;
  font-size: 13px;
  color: #aaaaaa;
  div {
    padding: 8px 0px;
    justify-content: space-between;
  }
  .sale {
    color: #ffaf51;
  }
`;

const TotalPrice = styled.div`
  padding: 8px 0px 15px 0px;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  .small {
    font-size: 16px;
  }
`;

const PayButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #002c6d;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 3px;
`;

function ShoppingCart() {
  return (
    <CartBlock>
      <section className="center">
        <div className="cart-title">장바구니</div>
        <AllCheck>
          <AiOutlineCheckCircle />
          <span>전체선택</span>
          <span>ㅣ</span>
          <span>선택삭제</span>
        </AllCheck>
        <Quary className="quary">
          <CartList>
            <CartItem />
            <CartItem />
            <CartItem />
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
        </Quary>
      </section>
    </CartBlock>
  );
}

export default ShoppingCart;
