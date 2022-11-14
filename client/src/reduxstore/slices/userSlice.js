import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

export const signUser = createAsyncThunk(
  "user/signUser",
  async ({ signData, navigate }) => {
    return Apis.post(`/users/login/`, signData)
      .then((res) => {
        navigate("/users/login");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ loginData, navigate }) => {
    return Apis.post(`user`, loginData)
      .then((res) => {
        console.log(res);
        navigate("/");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [signUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = true;
      state.error = "";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default userSlice.reducer;
