import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

let jwtToken = localStorage.getItem("Authorization");

export const getAllReview = createAsyncThunk("review/allGet", async (id) => {
  return Apis.get(`members/mypage/reviews?page=0&size=20&sort=createdAt,ASC`, {
    headers: {
      Authorization: `${jwtToken}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
export const postReview = createAsyncThunk("review/post", async (id) => {
  return Apis.get(`members/mypage/reviews?page=0&size=20&sort=createdAt,ASC`, {
    headers: {
      Authorization: `${jwtToken}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    review: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getAllReview.fulfilled]: (state, action) => {
      state.review = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default reviewSlice.reducer;
