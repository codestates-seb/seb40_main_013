import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

export const getArticleDetail = createAsyncThunk("user/signUser", async () => {
  return Apis.get(`detail`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

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
      state.users = [];
      state.detailArticle = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default articleSlice.reducer;
