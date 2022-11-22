import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";
import axios from "axios";

const jwtToken = localStorage.getItem("Authorization");

export const getArticleDetail = createAsyncThunk(
  "products/detail",
  async (id) => {
    return Apis.get(`products/details/${id}`)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
export const postCart = createAsyncThunk(
  "carts",
  async ({ postCartData, navigate }) => {
    return Apis.post(`carts`, postCartData, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((res) => {
        window.alert("해당 상품이 추가되었습니다!");
        navigate("/cart");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const mainData = createAsyncThunk("products/mainData", async () => {
  return axios
    .all([
      axios.get(
        `https://cool-shoes-cross-113-52-194-59.loca.lt/products/score`
      ),
      axios.get(
        `https://cool-shoes-cross-113-52-194-59.loca.lt/products/brandListLike`
      ),
    ])
    .then(
      axios.spread((res1, res2) => {
        // console.log(res1, res2)
        const resBest = res1.data;
        const resBrand = res2.data;
        const res = [...resBest, ...resBrand];
        return res;
      })
    )
    .catch((err) => console.log(2));
});

const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: [],
    detailArticle: [],
    mainArticle: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getArticleDetail.fulfilled]: (state, action) => {
      state.article = [];
      state.detailArticle = action.payload;
      state.mainArticle = [];
      state.loading = true;
      state.error = "";
    },
    [postCart.fulfilled]: (state, action) => {
      state.article = action.payload;
      state.detailArticle = [];
      state.mainArticle = [];
      state.loading = true;
      state.error = "";
    },
    [mainData.fulfilled]: (state, action) => {
      state.article = [];
      state.detailArticle = [];
      state.mainArticle = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default articleSlice.reducer;
