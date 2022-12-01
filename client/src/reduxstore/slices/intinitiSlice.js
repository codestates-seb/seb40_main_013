import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

export const loadInfinite = createAsyncThunk(
    "loadInfinite",
    async ({ searchWord, page }) => {
        console.log(555);
        return Apis.get(`/products/search?title=${searchWord}&page=${page}`)
          .then((res) => {
            console.log(`shopslice`, res.data);
            return res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
  );
   
const infiniteSlice = createSlice({
    name: 'infinite',
    initialState: {
        infiniteList: []
    },
    extraReducers: {
        [loadInfinite.fulfilled]: (state, action) => {
            state.infiniteList =  [...state.infiniteList].concat(action.payload.content)
            state.loading = true;
            state.error = "";
        },
    },
  });

  export default infiniteSlice.reducer;

//   [...state.infiniteList].concat(action.payload)