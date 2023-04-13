import Api from "./apis";
// best : products/score;
// new : products/brandListLike
// category : products/categoryCreated
interface props {
  endPoint: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setData: any;
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
