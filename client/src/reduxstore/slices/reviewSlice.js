import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";
import axios from "axios";

let jwtToken = localStorage.getItem("Authorization");

export const getAllReview = createAsyncThunk(
  "review/allGet",
  async ({ curPage, setTotalpage }) => {
    return Apis.get(
      `members/mypage/reviews?page=${
        curPage - 1
      }&size=20&sort=createdAt%2CDESC`,
      {
        headers: {
          Authorization: `${jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setTotalpage(res.data.pageInfo?.totalPages);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
export const postReview = createAsyncThunk(
  "review/post",
  async ({ postData, navigate }) => {
    console.log({ postData });
    const form = new FormData();
    form.append("content", postData.content);
    form.append("score", postData.score);
    form.append("img", postData.img);
    return Apis.post(`products/${postData.filterProductId}/reviews`, form, {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        navigate("purchase");
        window.location.reload();
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
export const updateReview = createAsyncThunk(
  "review/update",
  async ({ updateData }) => {
    return Apis.patch(`products/3/reviews`, updateData, {
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
export const deleteReview = createAsyncThunk(
  "review/delete",
  async ({ deleteData }) => {
    return Apis.delete(
      `products/${deleteData.productId}/reviews/${deleteData.reviewId}`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        window.location.reload();
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
    [deleteReview.fulfilled]: (state, action) => {
      state.review = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default reviewSlice.reducer;
