import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

let jwtToken = localStorage.getItem("Authorization");

export const likeData = createAsyncThunk(
  "likeData",
  async ({curPage, setTotalpage}) => {
  return Apis.get(`members/mypage/likes?page=${curPage-1}&size=20&sort=createdAt,DESC`,
  {
    headers: {
      Authorization: `${jwtToken}`,
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
  extraReducers: {
    [likeData.fulfilled]: (state, action) => {
      state.like = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default likeSlice.reducer;
