import React, { useNavigate } from "react";


const Review = () =>{
  // const navigate = useNavigate();
  // //최근본상품 출력
  // const ls = localStorage.getItem("saw");
  // const lsArr = JSON.parse(ls).reverse();

  // useEffect(() => {
  //   let arr = JSON.parse(ls);
  //   if (!arr.includes(shoe[0].id)) {
  //     if (arr.length === 5) {
  //       arr.shift();
  //     }
  //     arr.push(shoe[0].id);
  //   } else {
  //     arr = arr.filter((el) => {
  //       return el !== shoe[0].id;
  //     });
  //     arr.push(shoe[0].id);
  //   }
  //   //최근본 상품 저장
  //   localStorage.setItem("saw", JSON.stringify(arr));
  // })
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