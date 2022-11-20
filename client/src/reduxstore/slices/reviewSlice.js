import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";
import axios from "axios";

let jwtToken = localStorage.getItem("Authorization");

export const getAllReview = createAsyncThunk("review/allGet", async (id) => {
  return axios
    .get(
      `https://large-masks-worry-59-20-223-31.loca.lt/members/mypage/reviews`,
      {
        headers: {
          // Authorization: `${jwtToken}`,
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjY4NzYxNTQ0LCJleHAiOjE2Njg3NjE2MDQsInJvbGVzIjpbIlVTRVIiXX0.nQgR6AfkwNld3RckeyrsFzj17pAnASRVk7L-9yGgKGQ`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});
export const postReview = createAsyncThunk(
  "review/post",
  async ({ postData }) => {
    return Apis.post(`products/1/reviews`, postData, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

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
    [postReview.fulfilled]: (state, action) => {
      state.review = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default reviewSlice.reducer;
