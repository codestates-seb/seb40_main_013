import React from "react";
import * as Style from "../../styles/ProductStyle";
import starimg from "../../imgs/star.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import placeholderSrc from "../../imgs/loading.webp";

interface ImgDetail {
  fileName: string;
  fullPath: string;
}
interface ProductDetail {
  img: ImgDetail;
  main: string;
  nickname: string;
  price: number;
  reviews: number;
  score: number;
  title: string;
}
interface Props {
  proId: number;
  product: ProductDetail;
}

const Product = ({ proId, product }: Props) => {
  const { img, nickname, score, title, price } = product;

  return (
    <Style.Products to={`/detail/${proId}`}>
      <Style.Imgbox>
        <LazyLoadImage key={proId} src={img?.fullPath} className="img-lazy" placeholderSrc={placeholderSrc} effect="blur" />
      </Style.Imgbox>
      <Style.Detail>
        <Style.SubDetail>
          <Style.Brand>{nickname}</Style.Brand>
          <Style.StarDetail>
            <Style.Star src={starimg} />
            <Style.StarAerage>{score}</Style.StarAerage>
          </Style.StarDetail>
        </Style.SubDetail>
        <Style.Title>{title}</Style.Title>
        <Style.SubDetail className="end">
          <Style.Price>
            <span className="won">₩</span>
            &nbsp;{price?.toLocaleString("en-US")}
          </Style.Price>
        </Style.SubDetail>
      </Style.Detail>
    </Style.Products>
  );
};

export default Product;
