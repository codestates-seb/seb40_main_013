import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

export const categoryData = createAsyncThunk(
  "categoryData",
  async () => {
    return Apis.get(`products/categoryCreated`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const mainCategorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [categoryData.fulfilled]: (state, action) => {
      state.category = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default mainCategorySlice.reducer;