// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import Apis from "../../apis/apis";

// export const newData = createAsyncThunk("newData", async () => {
//   return Apis.get(`products/brandListLike`)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// const mainSlice = createSlice({
//   name: "main",
//   initialState: {
//     main: {},
//     loading: false,
//     error: "",
//   },
//   reducers: {},
//   extraReducers: (builder) =>
//     builder.addCase(newData.fulfilled, (state, action) => {
//       state.main = action.payload;
//       state.loading = true;
//       state.error = "";
//     }),
// });

// export default mainSlice.reducer;
