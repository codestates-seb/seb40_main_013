import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../../apis/apis";

export const getLivingRoom = createAsyncThunk(
  "getLivingRoom",
  async ({ page }) => {
    return Apis.get(`products?main=거실&page=${page}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const livingRoomSlice = createSlice({
  name: "livingroom",
  initialState: {
    livingRoomInitial: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {   //비동기처리를 해주는경우 여기서 사용해줘야함
    [getLivingRoom.fulfilled]: (state, action) => {
      state.livingRoomInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default livingRoomSlice.reducer;
