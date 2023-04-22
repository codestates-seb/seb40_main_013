import React, { useState, useCallback, useEffect } from "react";
import * as Style from "../../styles/NewProductsStyle";
import livingroom from "../../imgs/livingroom.png";
import library from "../../imgs/library.png";
import bedroom from "../../imgs/bedroom.png";
import kitchen from "../../imgs/kitchen.png";
import { type Img } from "../../type";
interface brandNew {
  id: number;
  img: Img;
  price: number;
  title: string;
}

const NewProducts = ({ newArivalData }) => {
  const [clicked, setClicked] = useState("서재");
  const category: string[] = ["서재", "침실", "거실", "주방"];
  const [NewProductArr, setNewProductArr] = useState({});

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    const text = (e.target as HTMLDivElement).innerText;
    setClicked(text);
  }, []);

  useEffect(() => {
    const newProductArr: Record<string, JSX.Element> = {};
    const srcArr = { 서재: library, 침실: bedroom, 거실: livingroom, 주방: kitchen };

    category.forEach((el: string) => {
      newProductArr[el] = (
        <Style.CategoryProduct>
          <Style.CategoryImgContainer to="/library">
            <Style.CategoryImg src={srcArr[el]}></Style.CategoryImg>
            <p className="hover_text">More view</p>
          </Style.CategoryImgContainer>
          <Style.BPList>
            {newArivalData[el]?.map((p: brandNew, idx: number) => (
              <Style.BP key={p.id} to={`/detail/${p.id}`}>
                <Style.Img src={p.img.fullPath} />
                <Style.TP>
                  <Style.Title>{p.title}</Style.Title>
                  <Style.Price>{p.price.toLocaleString("en-US")}</Style.Price>
                </Style.TP>
              </Style.BP>
            ))}
          </Style.BPList>
        </Style.CategoryProduct>
      );
    });
    setNewProductArr(newProductArr);
  }, [clicked]);

  return (
    <Style.NewContainer>
      <Style.Tabs>
        <Style.SubTab>
          {category.slice(0, 2).map((ele, idx) => {
            return (
              <Style.Tab key={idx} className={clicked === ele ? "clicked" : ""} onClick={handleClick}>
                {ele}
              </Style.Tab>
            );
          })}
        </Style.SubTab>
        <Style.SubTab>
          {category.slice(2, 4).map((ele, idx) => {
            return (
              <Style.Tab key={idx} className={clicked === ele ? "clicked" : ""} onClick={handleClick}>
                {ele}
              </Style.Tab>
            );
          })}
        </Style.SubTab>
      </Style.Tabs>
      <Style.ProductArrContainer>{NewProductArr[clicked]}</Style.ProductArrContainer>
    </Style.NewContainer>
  );
};

export default NewProducts;
