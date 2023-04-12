import styled from "styled-components/macro";
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { deleteShoppingCart, reCountCartItem } from "../reduxstore/slices/articleSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "./Alert";

const CartItemBlock = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #aaaaaa;
  border-radius: 5px;
  padding: 24px 10px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-between;
  img {
    width: 90px;
    height: 100%;
    padding-right: 10px;
  }
  .product-price {
    padding: 0px 10px;
    justify-content: flex-end;
    font-weight: 600;
    min-width: 7.4rem;
    text-align: center;
    height: 100%;
    align-items: center;
    @media screen and (max-width: 359px) {
      padding: 0px 0px;
      justify-content: center;
    }
  }
  .media-price {
    height: 100%;
    align-items: center;
    @media screen and (max-width: 359px) {
      flex-direction: column;
    }
  }
  .count-zone {
    flex-direction: column;
  }
  .count {
    align-items: center;
  }
  .part {
    align-items: center;
  }
  @media screen and (max-width: 584px) {
    flex-direction: column;
    align-items: baseline;
    padding: 13px 10px;
    margin-bottom: 10px;
    .part2 {
      width: 100%;
      /* display: flex; */
      justify-content: space-between;
      padding: 5px 20px 0px 20px;
    }
    /* .count-zone{
        flex-direction: row;
        } */
  }
`;

const ProductInfo = styled.div`
  /* width: 100%; */
  height: 100%;
  flex-direction: column;
  .brand {
    margin-top: 2px;
    font-size: 11px;
    color: #aaaaaa;
    margin-bottom: 3px;
  }
  .product-name {
    font-weight: 600;
    margin-bottom: 5px;
    max-width: 19em;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.05em;
    max-height: 2.07em;
    min-height: 2.07em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @media screen and (max-width: 584px) {
      max-width: 100%;
    }
  }
  .time {
    font-size: 13px;
    color: #ffaf51;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 13px;
    max-height: 13px;
    min-height: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const Input = styled.input`
  width: 30px;
  height: 20px;
  margin: 5px 0px;
  text-align: center;
`;

const DetailLink = styled(Link)`
  display: flex;
`;

const DownCount = styled(IoIosArrowBack)`
  color: #aaaaaa;
  border: 1px solid #aaaaaa;
  border-radius: 3px;
  margin: 7px 5px;
  cursor: pointer;
`;

const UpCount = styled(IoIosArrowForward)`
  color: #aaaaaa;
  border: 1px solid #aaaaaa;
  border-radius: 3px;
  margin: 7px 5px;
  cursor: pointer;
`;

const ReCount = styled.button`
  cursor: pointer;
  color: #aaaaaa;
  border: 1px solid #aaaaaa;
  border-radius: 3px;
  margin: 5px;
  background-color: white;
`;

const ItemDelete = styled(IoMdClose)`
  width: 25px;
  height: 100%;
  cursor: pointer;
  color: gray;
`;

const EachCheckCircle = styled.input`
  width: 1rem;
  height: 1rem;
  min-width: 1rem;
  min-height: 1rem;
  border-radius: 50%;
  border: 1px solid #999;
  appearance: none;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 10px;
  &:checked {
    background: #ffaf51;
    border: none;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  }
`;

function CartItem({ cartItem, changeEachCheck, checkList }) {
  const dispatch = useDispatch();
  const { brandName, count, img, price, productCartId, productId, title, color } = cartItem;

  const [itemCount, setItemCount] = useState(count);

  const removeCartItem = () => {
    dispatch(deleteShoppingCart(productCartId));
  };

  const ReCountHandler = () => {
    dispatch(reCountCartItem({ productCartId, itemCount }));
  };

  const upCountHandler = () => {
    if (parseInt(itemCount) < 100) {
      setItemCount(parseInt(itemCount) + 1);
    } else {
      Alert("warning", "100개 까지 주문 가능합니다.");
    }
  };

  const downCountHandler = () => {
    if (parseInt(itemCount) > 1) {
      setItemCount(parseInt(itemCount) - 1);
    } else {
      Alert("warning", "최소 1개 이상 주문 가능합니다.");
    }
  };

  const onChangeCount = (e) => {
    const c = e.target.value;
    if (c === "" || parseInt(c) < 1) {
      Alert("warning", "최소 1개 이상 주문 가능합니다.");
      setItemCount(1);
    } else if (parseInt(c) > 100) {
      Alert("warning", "100개 까지 주문 가능합니다.");
      setItemCount(100);
    } else {
      setItemCount(parseInt(c));
    }
  };

  return (
    <>
      <CartItemBlock>
        <div className="part">
          <EachCheckCircle type="checkbox" onChange={(e) => changeEachCheck(e.target.checked, cartItem)} checked={!!checkList.includes(cartItem)} />
          <DetailLink to={`/detail/${productId}`}>
            <img src={img.fullPath} alt="장바구니 물건"></img>
            <ProductInfo>
              <div className="brand">{brandName}</div>
              <div className="product-name">{title}</div>
              <div className="brand">옵션 : {color}</div>
              <div className="time">2~3일 이내 도착 예정</div>
            </ProductInfo>
          </DetailLink>
        </div>
        <div className="part part2">
          <div className="count-zone">
            <div>
              <DownCount onClick={downCountHandler} />
              <Input className="count" type="number" pattern="\d*" max={100} value={itemCount} onChange={onChangeCount}></Input>
              <UpCount onClick={upCountHandler} />
            </div>
            <ReCount onClick={ReCountHandler}>주문수정</ReCount>
          </div>
          <div className="media-price">
            <div className="product-price">{(itemCount * price).toLocaleString("en-US")}원</div>
            <ItemDelete onClick={removeCartItem} />
          </div>
        </div>
      </CartItemBlock>
    </>
  );
}

export default CartItem;
