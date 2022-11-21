import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

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

const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: [],
    detailArticle: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getArticleDetail.fulfilled]: (state, action) => {
      state.article = [];
      state.detailArticle = action.payload;
      state.loading = true;
      state.error = "";
    },
    [postCart.fulfilled]: (state, action) => {
      state.article = action.payload;
      state.detailArticle = [];
      state.loading = true;
      state.error = "";
    },
  },
});

export default articleSlice.reducer;
