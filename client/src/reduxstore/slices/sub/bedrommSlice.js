import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../../apis/apis";

export const getBedroom = createAsyncThunk(
  "getBedroom",
  async ({ page}) => {
    return Apis.get(`products?main=침실&page=${page}`)
      .then((res) => {
        console.log(`shopslice`, res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const bedroomSlice = createSlice({
  name: "bedroom",
  initialState: {
    bedroomInitial: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getBedroom.fulfilled]: (state, action) => {
      console.log(action);
      state.bedroomInitial = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default bedroomSlice.reducer;
