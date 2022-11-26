import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteShoppingCart,
  getShoppingCart,
} from "../reduxstore/slices/articleSlice";
import Alert from "../components/Alert";

const CartBlock = styled.div`
  margin-top: 127.5px;
  width: 100%;
  padding: 30px 40px 50px 40px;
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
  .center {
    margin-left: 5px;
    align-items: center;
  }
  .cursor {
    cursor: pointer;
  }
  label {
    cursor: pointer;
  }
`;

const CheckCircle = styled.input`
    width: 1em;
    height: 1em;
    min-width: 1rem;
    min-height: 1rem;
    border-radius: 50%;
    border: 1px solid #999;
    appearance: none;
    cursor: pointer;
    transition: background-color 0.2s;
    &:checked {
        background-color: #ffaf51;
        border: none;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    }
`;

const Quary = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  .cart-title {
    font-size: 26px;
    padding-left: 10px;
    padding-bottom: 10px;
    font-weight: 600;
  }
  @media screen and (max-width: 1023px) {
    flex-direction: column;
  }
`;

const CartList = styled.div`
  width: 100%;
  flex-direction: column;
  @media screen and (min-width: 1024px) {
    padding-right: 20px;
    width: 700px;
  }
  @media screen and (max-width: 1023px) {
    padding-right: 0px;
    max-width: 700px;
  }
`;

//결제정보
const Payment = styled.section`
  position: relative;
  margin-top: 81px;
  width: 300px;
  height: 300px;
  min-width: 230px;
  border: 1px solid #002c6d;
  border-radius: 5px;
  padding: 20px;
  align-items: baseline;
  .pay-title {
    font-weight: 500;
  }
  @media screen and (max-width: 1023px) {
    margin-top: 0px;
    width: 100%;
    max-width: 700px;
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
  cursor: pointer;
`;

function ShoppingCart() {
  const dispatch = useDispatch();
  const cartSeletor = useSelector((state) => state.article.shoppingCartInitial);
  const cartSeletorLength = cartSeletor?.length;
  
  const [checkList, setCheckList] = useState([]); //체크되면(true 가되면) cartItem을 배열로 추가
  console.log(`checkList`, checkList.length);

  useEffect(() => {
    dispatch(getShoppingCart());
  }, []);

  const changeAllCheck = (checked) => {
    if (checked) {
      const allCheckBox = [];

      cartSeletor.forEach((el) => allCheckBox.push(el));
      setCheckList(allCheckBox);
    } else {
      setCheckList([]);
    }
  };

  const changeEachCheck = (checked, cartItem) => {
    if (checked) {
      setCheckList([...checkList, cartItem]);
    } else {
      setCheckList(checkList.filter((el) => el !== cartItem));
    }
  };

  const totalPriceCalculator = checkList.reduce((sum, item) => {
    return sum + item.count * item.price;
  }, 0);

  const totalCountCalculator = checkList.reduce((sum, item) => {
    return sum + item.count;
  }, 0);

  const checkRemoveCartItem = () => {
    checkList.forEach((el) => {
      dispatch(deleteShoppingCart(el.productCartId));
    });
  };

  const postPurchase = () => {
    if(checkList.length === 0){
      Alert('warning', '구매하실 상품을 선택해 주세요.')
    }
  };


  postPurchase

  return (
    <CartBlock>
      {cartSeletorLength === 0 ? (
        <div> 장바구니에 담긴 상품이 없습니다.</div>
      ) : (
        <Quary>
          <CartList>
            <div className="cart-title">장바구니</div>
            <AllCheckBlock>
              <CheckCircle
                id="checkid"
                type="checkbox"
                // className='all-check'
                onChange={(e) => changeAllCheck(e.target.checked)}
                checked={checkList.length === cartSeletorLength ? true : false}
              />
              <label htmlFor="checkid" className="center">
                전체선택
              </label>
              <span>ㅣ</span>
              <span className="cursor" onClick={checkRemoveCartItem}>
                선택삭제
              </span>
            </AllCheckBlock>
            {cartSeletor?.map((item) => (
              <CartItem
                cartItem={item}
                key={item.productCartId}
                changeEachCheck={changeEachCheck}
                checkList={checkList}
              />
            ))}
          </CartList>
          <Payment>
            <div className="pay-title">결제정보</div>
            <PayInfo>
              <div>
                <span>상품수</span>
                <span>{totalCountCalculator.toLocaleString("en-US")}&nbsp;개</span>
              </div>
              <div>
                <span>상품금액</span>
                <span>{totalPriceCalculator.toLocaleString("en-US")}&nbsp;원</span>
              </div>
              <div>
                <span>할인금액</span>
                <span className="sale">0&nbsp;원</span>
              </div>
              <div>
                <span>배송비</span>
                <span>0&nbsp;원</span>
              </div>
            </PayInfo>
            <TotalPrice>
              <span className="small">총&nbsp;결제금액</span>
              <span>{totalPriceCalculator.toLocaleString("en-US")}&nbsp;원</span>
            </TotalPrice>
            <PayButton onClick={postPurchase}>구매하기</PayButton>
          </Payment>
        </Quary>
      )}
    </CartBlock>
  );
}

export default ShoppingCart;
