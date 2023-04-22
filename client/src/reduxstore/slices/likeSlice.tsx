import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";
import { type PageInfo, type ProductArgs } from "../../type";

interface Args {
  count: number;
  setTotalpage: React.Dispatch<React.SetStateAction<number>>;
}

export const likeData = createAsyncThunk("likeData", async ({ count, setTotalpage }: Args) => {
  return await Apis.get(`members/mypage/likes?page=${count}&size=20&sort=createdAt,DESC`, {
    headers: {
      Authorization: `${localStorage?.getItem("Authorization") ?? ""}`,
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

interface LikeStateArgs {
  content: ProductArgs[];
  pageInfo: PageInfo;
}

interface LikeState {
  like: LikeStateArgs;
  loading: boolean;
  error: string;
}

const initialState: LikeState = {
  like: {
    content: [],
    pageInfo: {
      page: 0,
      size: 0,
      totalElements: 0,
      totalPages: 0,
    },
  },
  loading: false,
  error: "",
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(likeData.fulfilled, (state, action) => {
      state.like = action.payload;
      state.loading = true;
      state.error = "";
    }),
});

export default likeSlice.reducer;
