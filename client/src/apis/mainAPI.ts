import Api from "./apis";
// best : products/score;
// new : products/brandListLike
// category : products/categoryCreated
interface ImgDetail {
  fileName: string;
  fullPath: string;
}
interface brand {
  id: number;
  img: ImgDetail;
  main: string;
  nickname: string;
  price: number;
  reviews: number;
  score: number;
  title: string;
}
declare type newProduct = Record<string, object[]>;
declare type bestProduct = brand[];
interface props {
  endPoint: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setData: React.Dispatch<React.SetStateAction<bestProduct | newProduct>>;
}
export const getMain = async ({ endPoint, setData }: props) => {
  return await Api.get(`products/${endPoint}`)
    .then((res) => {
      setData(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
