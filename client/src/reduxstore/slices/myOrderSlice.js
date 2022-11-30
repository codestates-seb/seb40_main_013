import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

let jwtToken = localStorage.getItem("Authorization");

export const getMyOrder = createAsyncThunk(
  "getMyOrder",
  async ( {curPage, setTotalpage} ) => {
    console.log(curPage);
    return Apis.get(`orders?page=${curPage-1}&size=20&sort=createdAt,DESC`,     
    {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setTotalpage(res.data.pageInfo?.totalPages);
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
