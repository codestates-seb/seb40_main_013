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
        navigate("/");
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
        `https://weak-papers-buy-125-134-111-237.loca.lt/products/score`
      ),
      axios.get(
        `https://weak-papers-buy-125-134-111-237.loca.lt/products/brandListLike`
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

export const getSubCategory = createAsyncThunk( //비동기처리를 도와주는애(자동으로 지원해줌)
  "getSubCategory",// 이름정하는데, 의미없음
  async ({click, pageCurrent}) => {
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
);//action 객체, action실행함수 등등....

export const getShoppingCart = createAsyncThunk( //비동기처리를 도와주는애(자동으로 지원해줌)
  "getShoppingCart",// 이름정하는데, 의미없음
  async ({click, pageCurrent}) => {
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
);//action 객체, action실행함수 등등....

const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: [],
    detailArticle: [],
    mainArticle: [],
    subCategoryInitial: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: { //비동기처리를 해주는경우 여기서 사용해줘야함
    [getArticleDetail.fulfilled]: (state, action) => {
      state.article = [];
      state.detailArticle = action.payload;
      state.mainArticle = [];
      state.subCategoryInitial = [];
      state.loading = true;
      state.error = "";
    },
    [postCart.fulfilled]: (state, action) => {
      state.article = action.payload;
      state.detailArticle = [];
      state.mainArticle = [];
      state.subCategoryInitial = [];
      state.loading = true;
      state.error = "";
    },
    [mainData.fulfilled]: (state, action) => {
      state.article = [];
      state.detailArticle = [];
      state.mainArticle = action.payload;
      state.subCategoryInitial = [];
      state.loading = true;
      state.error = "";
    },
    [getSubCategory.fulfilled]: (state, action) => {
      state.article = [];
      state.detailArticle = [];
      state.mainArticle = [];
      state.subCategoryInitial = [...state.subCategoryInitial, action.payload];
      state.loading = true;
      state.error = "";
    },
  },
});

export default articleSlice.reducer;
