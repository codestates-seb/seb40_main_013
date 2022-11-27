import React, { useNavigate, useEffect } from "react";
import { usedispatch, useSelector } from "react-redux";

const Review = () => {
  // const navigate = useNavigate();
  // const dispatch = usedispatch();
  // const recentData = useSelector((state)=>state);
  // console.log(recentData);
  // // //최근본상품 출력
  // // const ls = localStorage.getItem("saw");
  // // const lsArr = JSON.parse(ls).reverse();
  // useEffect(()=>{
  //   dispatch()
  // },[])

  return (
    <div>
      <div>최근본상품</div>
      {/* {props.lsArr.map((id, index) => {
      const item = props.shoes.find((it, i) => {
        return it.id === id;
      });
      const i = item.id + 1;
      return (
        <div key={index}>
          <img
            src={"https://codingapple1.github.io/shop/shoes" + i + ".jpg"}
            width="120px;"
            title={item.title}
            onClick={() => {
              navigate(`/detail/${item.id}`);
            }}
          />
          <div className="col-md-2">
            <Saw lsArr={lsArr} shoes={props.shoes}></Saw>
          </div>
        </div>
      );
    })} */}
    </div>
  );
};
export default Review;
