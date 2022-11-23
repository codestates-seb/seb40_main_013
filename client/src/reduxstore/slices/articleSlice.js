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
        navigate("/");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const mainData = createAsyncThunk("mainData", async () => {
  return Apis.get(`products/score`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const getSubCategory = createAsyncThunk(
  //비동기처리를 도와주는애(자동으로 지원해줌)
  "getSubCategory", // 이름정하는데, 의미없음
  async ({ click, pageCurrent }) => {
    console.log(`click`, click, `pageCurren`, pageCurrent);
    return Apis.get(`products?main=${click}&page=${pageCurrent}`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
); //action 객체, action실행함수 등등....

export const getShoppingCart = createAsyncThunk("getShoppingCart", async () => {
  return Apis.get(`carts`, {
    headers: {
      Authorization: `${jwtToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(`shopslice`, res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const deleteShoppingCart = createAsyncThunk(
  "getShoppingCart",
  async (elId) => {
    return Apis.delete(`carts/${elId}`, {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(`shopslice`, res.data);
        window.location.reload();
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
    mainArticle: [],
    subCategoryInitial: [],
    shoppingCartInitial: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    //비동기처리를 해주는경우 여기서 사용해줘야함
    [getArticleDetail.fulfilled]: (state, action) => {
      state.detailArticle = action.payload;
      state.loading = true;
      state.error = "";
    },
    [postCart.fulfilled]: (state, action) => {
      state.article = action.payload;
      state.loading = true;
      state.error = "";
    },
    [mainData.fulfilled]: (state, action) => {
      state.mainArticle = action.payload;
      state.loading = true;
      state.error = "";
    },
    [getSubCategory.fulfilled]: (state, action) => {
      state.subCategoryInitial = [...state.subCategoryInitial, action.payload];
      state.loading = true;
      state.error = "";
    },
    [getShoppingCart.fulfilled]: (state, action) => {
      state.shoppingCartInitial = action.payload.productCarts;
      state.loading = true;
      state.error = "";
    },
  },
});

export default articleSlice.reducer;
