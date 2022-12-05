import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

export const getMyOrder = createAsyncThunk(
  "getMyOrder",
  async ({ count, setTotalpage }) => {
    return Apis.get(`orders?page=${count}&size=20&sort=createdAt,DESC`, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setTotalpage(res.data.pageInfo?.totalPages);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const filterMyOrder = createAsyncThunk("filterMyOrder", async (id) => {
  return Apis.get(`orders/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem("Authorization")}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

const myOrderSlice = createSlice({
  name: "myorder",
  initialState: {
    myorder: {},
    filterorder: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(getMyOrder.fulfilled, (state, action) => {
      state.myorder = action.payload;
      state.loading = true;
      state.error = "";
    })
    .addCase(filterMyOrder.fulfilled, (state, action) => {
      state.filterorder = action.payload;
      state.loading = true;
      state.error = "";
    })
});

export default myOrderSlice.reducer;
