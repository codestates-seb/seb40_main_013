import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

export const getMyOrder = createAsyncThunk(
  "getMyOrder",
  async ({ page }) => {
    return Apis.get(`orders?page=${page}&size=20&sort=createdAt,DESC`)
      .then((res) => {
        console.log(`orderslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const myOrderSlice = createSlice({
  name: "myorder",
  initialState: {
    myorder: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getMyOrder.fulfilled]: (state, action) => {
      state.myorder = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default myOrderSlice.reducer;
