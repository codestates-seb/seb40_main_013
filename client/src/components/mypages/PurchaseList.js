import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components/macro";
import { getMyOrder } from "../../reduxstore/slices/myOrderSlice";
import Apis from "../../apis/apis";
import Swal from "sweetalert2";
import { AlreadyDeleteAlert } from "../Alert";
import Pagination from "./Pagination";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 30px;
  border-radius: 5px;
  padding: 20px 20px 20px 40px;
  width: 80%;
  @media screen and (max-width: 390px) {
    width: 100%;
    padding: 0 20px;
    margin: 30px 0;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    width: 100%;
    padding: 0 20px;
    margin: 30px 0;
  }
`;
const NotContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  align-items: center;
  padding: 3rem 0;
  @media screen and (max-width: 478px) {
    width: 100%;
  }
`;
const NotIcon = styled.div`
  background-color: #aaaaaa;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10vw;
  color: white;
  margin-bottom: 20px;
  animation: rotate 5s infinite;
  @keyframes rotate {
    from {
      -webkit-transform: rotate(-30deg);
      -o-transform: rotate(-30deg);
      transform: rotate(-30deg);
    }
    to {
      -webkit-transform: rotate(30deg);
      -o-transform: rotate(30deg);
      transform: rotate(30deg);
    }
  }
  @media screen and (max-width: 478px) {
    width: 7rem;
    height: 7rem;
    font-size: 15vw;
  }
  @media (min-width: 479px) and (max-width: 767px) {
    font-size: 18vw;
  }
`;
const NotOrder = styled.h3`
  display: flex;
  justify-content: center;
  font-weight: 500;
  font-size: 2rem;
  @media screen and (max-width: 478px) {
    align-items: center;
    font-weight: 400;
    font-size: 1.3rem;
  }
`;
const ShowProduct = styled(Link)`
  font-weight: 400;
  font-size: 1.5rem;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: #ffaf51;
    text-decoration: underline;
    font-weight: 500;
  }
  @media screen and (max-width: 478px) {
    align-items: center;
    font-weight: 400;
    font-size: 1.3rem;
  }
`;

const Ordercontainter = styled.div``;

//상단
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 15px;
  @media screen and (max-width: 390px) {
    margin: 7px 10px;
  }
`;
const SubTop = styled.h2`
  font-weight: 600;
  font-size: 1.1rem;
  color: #272727;
  .orderStatus {
    color: #ffaf51;
  }
  .ordercancle {
    color: #ff4040;
  }
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    font-size: 2.2vw;
    font-weight: 500;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.6vw;
    font-weight: 500;
  }
`;
const AllPurchase = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: flex-end;
  color: #aaaaaa;
  cursor: pointer;
  &:hover {
    color: #ffaf51;
  }
  @media screen and (max-width: 390px) {
    font-size: 12px;
    font-weight: 600;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    font-size: 2vw;
    align-items: flex-end;
    color: #515151;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 1.7vw;
  }
`;

const Hr = styled.hr`
  height: 1px;
  border: none;
  background-color: var(--color-center-line);
  margin: 5px 0;
`;

//콘텐츠
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Detail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  @media screen and (max-width: 390px) {
    margin: 5px 10px;
    justify-content: flex-start;
  }
`;
const ReactionSubDetail = styled.div`
  display: flex;
  cursor: pointer;
  /* @media screen and (max-width: 479px) {
    flex-direction: column;
  } */
`;

const Img = styled.img`
  width: 130px;
  height: 130px;
  margin-right: 10px;
  border-radius: 5px;
  @media screen and (max-width: 390px) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;
const BP = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-left: 20px;
  @media screen and (max-width: 390px) {
    justify-content: center;
  }
  @media (min-width: 391px) and (max-width: 767px) {
    justify-content: center;
    margin-left: 0;
  }
`;
const BrandName = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 5px;
  @media screen and (max-width: 390px) {
    font-weight: 600;
    font-size: 0.8rem;
    margin-bottom: 0;
    padding: 5px 0;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    font-weight: 500;
    font-size: 2.7vw;
    margin-right: 5px;
  }
`;
const Option = styled.h2`
  margin: 5px 0;
  @media screen and (max-width: 390px) {
    font-size: 0.7rem;
  }
`;
const Price = styled.h2`
  margin: 10px 0;
  @media screen and (max-width: 390px) {
    margin: 5px 5px 5px 0;
    font-size: 12px;
  }
  @media (min-width: 391px) and (max-width: 768px) {
    margin: 5px 0;
  }
`;
const Btns = styled.div`
  display: flex;
  flex-direction: column;
`;
const CancleBtn = styled.button`
  padding: 8px 30px;
  /* height: 50px; */
  /* border: 1px solid red; */
  color: red;
  border-radius: 10px;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #efefef;
  &:hover {
    border: 1px solid #ff4040;
  }
  @media screen and (max-width: 479px) {
    display: none;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 8px 30px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 8px 26px;
  }
`;

//반응형 구매후기
const ReactionSpace = styled.div`
  display: none;
  @media screen and (max-width: 479px) {
    display: flex;
    justify-content: flex-end;
    margin: 5px 10px;
  }
`;

const ReactionReviewBtn = styled.button`
  display: none;

  @media screen and (max-width: 479px) {
    display: flex;
    color: #515151;
    border: 0.7px solid #aaaaaa;
    border-radius: 5px;
    padding: 3px 10px;
    cursor: pointer;
    &:hover {
      background-color: #002c6d;
      color: white;
    }
  }
`;

//페이지네이션
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PurchaseList = () => {
  const dispatch = useDispatch();
  const myOrderData = useSelector((state) => state.myorder.myorder.content);
  const pageInfo = useSelector((state) => state.myorder.myorder.pageInfo);
  const initialToken = localStorage.getItem("Authorization");
  //페이지네이션
  const [curPage, setCurPage] = useState(0); //현재페이지
  const [totalpage, setTotalpage] = useState(0);
  const [click, setClick] = useState(0);
  const clickFunction = () => {
    setClick(Date.now());
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    let count = 0;
    if (curPage > 0) {
      count = curPage - 1;
    } else {
      count = 0;
    }
    dispatch(getMyOrder({ count, setTotalpage }));
  }, [curPage]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    let count = 0;
    if (curPage > 0) {
      count = curPage - 1;
    } else {
      count = 0;
    }
    dispatch(getMyOrder({ count, setTotalpage }));
  }, [click]);

  //주문취소 버튼
  const handleOrderCancle = (id) => {
    const curData = myOrderData.filter((data) => data.orderId == id);
    if (curData[0].status === "주문 취소") {
      console.log("취소된 주문!!!");
      AlreadyDeleteAlert();
    }
    Swal.fire({
      title: "Are you sure?",
      text: "주문을 취소하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002C6D",
      cancelButtonColor: "#d33",
      confirmButtonText: "주문취소",
    })
      .then((result) => {
        if (result.isConfirmed) {
          orderCancle(id);
          Swal.fire("취소되었습니다", "주문이 취소되었습니다.", "success");
          clickFunction();
        }
      })
      .catch((err) => console.log(err));
  };

  const orderCancle = (id) => {
    Apis.delete(`/orders/${id}`, {
      headers: {
        Authorization: initialToken,
      },
    }).then(() => {
      // console.log('orderCanle!!!')
    });
  };

  return (
    <>
      {myOrderData?.length === 0 ? (
        <NotContainer>
          <NotIcon>!</NotIcon>
          <NotOrder>구매 내역이 없습니다.</NotOrder>
          <ShowProduct to="/">상품 보러가기</ShowProduct>
        </NotContainer>
      ) : (
        <Container>
          <Hr />
          {myOrderData?.map((order, i) => (
            <Ordercontainter key={i}>
              <Top>
                <SubTop>
                  <span className="ordernumber">{order.orderNumber}</span>
                  &nbsp;|&nbsp; {order.createdAt.slice(0, 10)}&nbsp;|&nbsp;
                  <span
                    className={
                      order.status === "주문 접수"
                        ? "orderStatus"
                        : "ordercancle"
                    }
                  >
                    {order.status}
                  </span>
                </SubTop>
                <Link to={`${order.orderId}`}>
                  <AllPurchase>상세보기 &gt;</AllPurchase>
                </Link>
              </Top>
              <Content>
                <Detail>
                  <ReactionSubDetail>
                    <Img src={order.orderProducts[0]?.img.fullPath} />
                    <Link to={`${order.orderId}`}>
                      <BP>
                        <BrandName>
                          {[order.orderProducts[0]?.brandName]}
                          <span>
                            {order.orderProducts[0]?.title}
                          </span>&nbsp;외 {order.orderProducts?.length}개
                        </BrandName>
                        <Option>색상: {order.orderProducts[0]?.color}</Option>
                        <Price>
                          <span>
                            ₩&nbsp;
                            {order.orderProducts[0]?.price.toLocaleString(
                              "en-US"
                            )}
                          </span>
                        </Price>
                      </BP>
                    </Link>
                  </ReactionSubDetail>
                  <Btns>
                    <CancleBtn onClick={() => handleOrderCancle(order.orderId)}>
                      주문취소
                    </CancleBtn>
                  </Btns>
                </Detail>
                <ReactionSpace>
                  <ReactionReviewBtn onClick={() => handleOrderCancle(order.orderId)}>주문취소</ReactionReviewBtn>
                </ReactionSpace>
              </Content>
              <Hr />
            </Ordercontainter>
          ))}
          <PaginationContainer>
            <Pagination
              totalpage={totalpage}
              page={curPage}
              setPage={setCurPage}
            />
          </PaginationContainer>
        </Container>
      )}
    </>
  );
};

export default PurchaseList;
