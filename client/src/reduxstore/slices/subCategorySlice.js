import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

export const getSub = createAsyncThunk(
  "getSub",
  async ({ mainCateClick, subclick, page, sortArgument, third }) => {
    return Apis.get(
      `products?main=${mainCateClick}&sub=${subclick}&page=${page}&sortType=${sortArgument}&order=${third}`
    )
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getCount = createAsyncThunk(
  "getCount", 
  async ({mainCateClick, subclick}) => {
  return Apis.get(`products/count?main=${mainCateClick}&sub=${subclick}`)
    .then((res) => {
      console.log(`shopslice`, res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

const subCatetorySlice = createSlice({
  name: "subCatetory",
  initialState: {
    subInitial: [],
    coutnInitial: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getSub.fulfilled]: (state, action) => {
      state.subInitial = action.payload.content;
      // [...state.libraryInitial].concat(action.payload.content)
      state.loading = true;
      state.error = "";
    },
    [getCount.fulfilled]: (state, action) => {
      state.coutnInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default subCatetorySlice.reducer;
