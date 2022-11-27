import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../../apis/apis";

export const getLibrary = createAsyncThunk(
  "getLibrary",
  async ({ page}) => {
    return Apis.get(`products?main=서재&page=${page}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getSubLibrary = createAsyncThunk(
  "getSubLibrary",
  async ({ click, page, sortArgument}) => {
    console.log({click, page, sortArgument});
    return Apis.get(`products?main=서재&sub=${click}&page=${page}&sortType=${sortArgument}`)
      .then((res) => {
        console.log(`getSubLibrary`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const getAsc = createAsyncThunk(
  "getAsc",
  async ({ click, page, sortArgument, third}) => {
    return Apis.get(`products?main=서재&sub=${click}&page=${page}&sortType=${sortArgument}&order=${third}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState: {
    libraryInitial: {},
    sublibraryInitial: {},
    ascInitial: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getLibrary.fulfilled]: (state, action) => {
      state.libraryInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
    [getSubLibrary.fulfilled]: (state, action) => {
      state.sublibraryInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
    [getAsc.fulfilled]: (state, action) => {
      state.ascInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default librarySlice.reducer;
