import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { AiOutlineCheckCircle } from "react-icons/ai";
import CartItem from "../components/CartItem";
import Apis from "../apis/apis";

const CartBlock = styled.div`
  margin-top: 160px;
  width: 100%;
  height: 100%;
  padding: 30px 40px 50px 40px;
  justify-content: center;
  display: flex;
  div {
    display: flex;
  }
`;

const AllCheckBlock = styled.div`
  margin: 10px;
  font-size: 15px;
  color: #aaaaaa;
  align-items: center;
  span {
    margin-left: 5px;
  }
  .center{
    margin-left: 5px;
    align-items: center;
  }
`;

const CheckCircle = styled(AiOutlineCheckCircle)`
  font-size: 19px;
  &.all-check{
    color: #FFAF51;
  }
`;

const Quary = styled.div`
  width: 100%;
  justify-content: center;
  .cart-title{
        font-size: 26px;
        padding-left: 10px;
        padding-bottom: 10px;
        font-weight: 600;
  }
    @media screen and (max-width: 767px) {
            flex-direction: column;
    }
`;

const CartList = styled.div`
  width: 100%;
  flex-direction: column;
  @media screen and (min-width: 768px) {
      padding-right:20px;
      max-width: 700px;
    }
`;

//결제정보
const Payment = styled.section`
  margin-top: 76px;
  width: 300px;
  height: 300px;
  min-width: 230px;
  border: 1px solid #002c6d;
  border-radius: 5px;
  padding: 20px;
  .pay-title {
    font-weight: 500;
  }
  @media screen and (max-width: 767px) {
      width: 100%;
      margin-top: 0;
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
  let jwtToken = localStorage.getItem("Authorization");

  const [cartItemList, setCartItemList] = useState([]);
  const [allCheck, setAllCheck] = useState(true);

  useEffect(() => {
    Apis.get(`carts`,
    {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json"
      },
    })
    .then((data) => {
      setCartItemList(data.data.productCarts);
    });
  }, []);
  console.log(cartItemList);

  const AllCheckHandler = () => {
    setAllCheck(!allCheck)
  }

  return (
    <CartBlock>
        <Quary>
          <CartList>
            <div className="cart-title">장바구니</div>
            <AllCheckBlock>
              <div onClick={AllCheckHandler}>
                <CheckCircle className={allCheck ? 'all-check' : ''}/>
                <div className="center" >전체선택</div>
              </div>
              <span>ㅣ</span>
              <span>선택삭제</span>
            </AllCheckBlock>
            {cartItemList.map((item) => (
              <CartItem 
                  cartItem={item}
                  key={item.productCartId}
                  allCheck={allCheck}
              />
            ))
            }
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
    </CartBlock>
  );
}

export default ShoppingCart;
