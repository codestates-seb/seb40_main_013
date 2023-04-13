import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

export const likeData = createAsyncThunk("likeData", async ({ count, setTotalpage }) => {
  return Apis.get(`members/mypage/likes?page=${count}&size=20&sort=createdAt,DESC`, {
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
});

const likeSlice = createSlice({
  name: "like",
  initialState: {
    like: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(likeData.fulfilled, (state, action) => {
      state.like = action.payload;
      state.loading = true;
      state.error = "";
    }),
});

export default likeSlice.reducer;
