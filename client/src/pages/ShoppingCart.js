import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import CartItem from "../components/CartItem";
import Apis from "../apis/apis";

const CartBlock = styled.div`
  margin-top: 160px;
  width: 100%;
  height: 100%;
  padding: 30px 40px 50px 40px;
  margin-top: 180px;
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
  .cursor{
    cursor: pointer;
  }
  label{
    cursor: pointer;
  }
`;

const CheckCircle = styled.input`
    width: 15px;
    height: 15px;
    cursor: pointer; 
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
  margin-left: 10px;
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

  const [empty, setEmpty] = useState(false)

  const [cartItemList, setCartItemList] = useState([]);
  const [checkList, setCheckList] = useState([]); //체크되면(true 가되면) cartItem을 배열로 추가
  const [numberOfCartList, setNumberOfCartList] = useState([]);
  

  useEffect(() => {
    Apis.get(`carts`,
    {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json"
      },
    })
    .then((data) => {
      if(data.data.productCarts.length === 0){
        setEmpty(true)
      }else{
        setEmpty(false)
        setCartItemList(data.data.productCarts);
        setNumberOfCartList(data.data.productCarts.length)
      }
    })
    // .catch((err) => {
    //   console.log(err);
    //   if(err.response.data.message === "Cart not found"){
    //     setEmpty(true)
    //   }
    // })
  }, []);
  console.log(`checkList`, checkList);

  
  const changeAllCheck = (checked) => {
    if(checked) {
      const allCheckBox = [];
      
      cartItemList.forEach(el => allCheckBox.push(el));
      setCheckList(allCheckBox);
    } else {
      setCheckList([]);
    }
  };
  
  const changeEachCheck = (checked, cartItem) => {
    if(checked) {
      setCheckList([...checkList, cartItem]);
    }else {
      setCheckList(checkList.filter(el => el !== cartItem));
    }
  };

  const totalPriceCalculator = checkList.reduce((sum, item) => {
    return sum + (item.count * item.price);
  }, 0)

  const totalCountCalculator = checkList.reduce((sum, item) => {
    return sum + item.count;
  }, 0)

  const checkRemoveCartItem = () => {
    checkList.forEach(el => {
      return  Apis.delete(`carts/${el.productCartId}`,
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
    });
  }

  return (
    <CartBlock>
      {empty ? <div> 장바구니에 담긴 상품이 없습니다.</div> :
        <Quary>
          <CartList>
            <div className="cart-title">장바구니</div>
            <AllCheckBlock>
                <CheckCircle 
                  id='checkid' 
                  type='checkbox' 
                  // className='all-check'
                  onChange={e => changeAllCheck(e.target.checked)}
                  checked={checkList.length === numberOfCartList ? true : false }
                />
                <label htmlFor='checkid' className="center" >전체선택</label>
              <span>ㅣ</span>
              <span className='cursor' onClick={checkRemoveCartItem}>선택삭제</span>
            </AllCheckBlock>
            {cartItemList.map((item) => (
              <CartItem 
                  cartItem={item}
                  key={item.productCartId}
                  changeEachCheck={changeEachCheck}
                  checkList={checkList}
              />
            ))
            }
          </CartList>
          <Payment>
            <div className="pay-title">결제정보</div>
            <PayInfo>
              <div>
                <span>상품수</span>
                <span>{totalCountCalculator.toLocaleString("en-US")} 개</span>
              </div>
              <div>
                <span>상품금액</span>
                <span>{totalPriceCalculator.toLocaleString("en-US")} 원</span>
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
              <span>{totalPriceCalculator.toLocaleString("en-US")} 원</span>
            </TotalPrice>
            <PayButton>구매하기</PayButton>
          </Payment>
        </Quary>
      }
    </CartBlock>
  );
}

export default ShoppingCart;
