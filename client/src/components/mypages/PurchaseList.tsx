import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../reduxstore/hooks";
import { Link } from "react-router-dom";
import * as Style from "../../styles/mypage/PurchaseListStyle";
import { getMyOrder } from "../../reduxstore/slices/myOrderSlice";
import Apis from "../../apis/apis";
import { AlreadyDeleteAlert, BtnSelectAlert, CancleAlert } from "../Alert";
import Pagination from "./Pagination";
import { type Content } from "../../reduxstore/slices/myOrderSlice";

const PurchaseList = () => {
  const dispatch = useAppDispatch();
  const myOrderData = useAppSelector((state) => state.myorder.myorder.content);
  const pageInfo = useAppSelector((state) => state.myorder.myorder.pageInfo);
  const initialToken = localStorage.getItem("Authorization");

  // 페이지네이션
  const [curPage, setCurPage] = useState(0); // 현재페이지
  const [totalpage, setTotalpage] = useState(0);
  const [clicked, setClicked] = useState<string>("");

  const clickFunction = () => {
    setClicked(Date.now().toString());
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
    void dispatch(getMyOrder({ count, setTotalpage }));
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
    void dispatch(getMyOrder({ count, setTotalpage }));
  }, [clicked]);

  // 주문취소 버튼
  const handleOrderCancle = (id: number) => {
    const curData = myOrderData.filter((data) => data.orderId === id);
    if (curData[0].status === "주문 취소") {
      AlreadyDeleteAlert();
    }
    const functionDispatch = () => {
      void orderCancle(id);
      CancleAlert("취소되었습니다.", "success", "");
      clickFunction();
    };
    BtnSelectAlert("주문을 취소하시겠습니까?", "주문취소", "취소", functionDispatch);
  };

  const orderCancle = async (id: number) => {
    try {
      await Apis.delete(`/orders/${id}`, {
        headers: {
          Authorization: initialToken,
        },
      });
      console.log("Order deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {myOrderData?.length === 0 ? (
        <Style.NotContainer>
          <Style.NotIcon>!</Style.NotIcon>
          <Style.NotOrder>구매 내역이 없습니다.</Style.NotOrder>
          <Style.ShowProduct to="/">상품 보러가기</Style.ShowProduct>
        </Style.NotContainer>
      ) : (
        <Style.Container>
          <Style.Page>
            현재 페이지: {curPage === 0 ? 1 : curPage} / {pageInfo?.totalPages}
          </Style.Page>
          <Style.Hr />
          {myOrderData?.map((order: Content, i: number) => (
            <div key={i}>
              <Style.Top>
                <Style.SubTop>
                  <span className="ordernumber">{order.orderNumber}</span>
                  &nbsp;|&nbsp; {order.createdAt.slice(0, 10)}&nbsp;|&nbsp;
                  <span className={order.status === "주문 접수" ? "orderStatus" : "ordercancle"}>{order.status}</span>
                </Style.SubTop>
                <Link to={`${order.orderId}`}>
                  <Style.AllPurchase>상세보기 &gt;</Style.AllPurchase>
                </Link>
              </Style.Top>
              <Style.Content>
                <Style.Detail>
                  <Style.ReactionSubDetail>
                    <Style.Img src={order.orderProducts[0]?.img.fullPath} />
                    <Link to={`${order.orderId}`}>
                      <Style.BP>
                        <Style.BrandName>
                          {[order.orderProducts[0]?.brandName]}
                          <span>{order.orderProducts[0]?.title}&nbsp;</span>
                          {order.orderProducts?.length === 1 ? "" : `외 ${order.orderProducts?.length - 1}개`}
                        </Style.BrandName>
                        <Style.Option>색상: {order.orderProducts[0]?.color}</Style.Option>
                        <Style.Price>
                          ₩&nbsp;
                          <span>{order.orderProducts[0]?.price.toLocaleString("en-US")}</span>
                        </Style.Price>
                      </Style.BP>
                    </Link>
                  </Style.ReactionSubDetail>
                  <Style.Btns>
                    {order.status === "주문 접수" ? (
                      <Style.CancleBtn
                        onClick={() => {
                          handleOrderCancle(order.orderId);
                        }}
                      >
                        주문취소
                      </Style.CancleBtn>
                    ) : (
                      ""
                    )}
                  </Style.Btns>
                </Style.Detail>
                <Style.ReactionSpace>
                  <Style.ReactionCancleBtn
                    onClick={() => {
                      handleOrderCancle(order.orderId);
                    }}
                  >
                    주문취소
                  </Style.ReactionCancleBtn>
                </Style.ReactionSpace>
              </Style.Content>
              <Style.Hr />
            </div>
          ))}
          <Style.PaginationContainer>
            <Pagination totalpage={totalpage} page={curPage} setPage={setCurPage} />
          </Style.PaginationContainer>
        </Style.Container>
      )}
    </>
  );
};

export default PurchaseList;
