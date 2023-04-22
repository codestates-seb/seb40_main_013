export {};

export interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Img {
  fileName: string;
  fullPath: string;
}

export interface ProductArgs {
  id: number;
  img: Img;
  main: string;
  nickname: string;
  price: number;
  reviews: number;
  score: number;
  title: string;
}

export interface ProductDetail {
  brandName: string;
  color: string;
  count: number;
  img: Img;
  price: number;
  productId: number;
  title: string;
}
