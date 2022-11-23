import React, { useNavigate, useEffect } from "react";
import { useSelector } from "react-redux";


const Review = () =>{
  // const navigate = useNavigate();
  // //최근본상품 출력
  // const ls = localStorage.getItem("saw");
  // const lsArr = JSON.parse(ls).reverse();

  useEffect(() => {
    const articlesDetail = useSelector((state) => state.article.detailArticle);
    let get_local = localStorage.getItem("product");
    if (get_local == null) {
      get_local = [];
    } else {
      get_local = JSON.parse(get_local);
    }
    console.log(get_local)
    get_local.push(articlesDetail.productId);
    get_local = [...get_local];
    localStorage.setItem("product", JSON.stringify(get_local))
  }, []);
  return(
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
  )
}
export default Review;