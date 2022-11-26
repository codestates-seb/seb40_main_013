import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../../apis/apis";

export const getKitchen = createAsyncThunk(
  "getKitchen",
  async ({ click, page }) => {
    return Apis.get(`products?main=주방&page=${page}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const kitchenSlice = createSlice({
  name: "kitchen",
  initialState: {
    kitchenInitial: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getKitchen.fulfilled]: (state, action) => {
      state.kitchenInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default kitchenSlice.reducer;
