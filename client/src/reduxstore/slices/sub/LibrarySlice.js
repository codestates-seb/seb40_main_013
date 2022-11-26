import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../../apis/apis";

export const getLibrary = createAsyncThunk(
  "getLibrary",
  async ({ click, page }) => {
    return Apis.get(`products?main=서재&&page=${page}`)
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
  },
});

export default librarySlice.reducer;
