import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

let jwtToken = localStorage.getItem("Authorization");

export const signUser = createAsyncThunk(
  "user/signUser",
  async ({ signData, navigate }) => {
    return Apis.post(`signup`, signData)
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
    return Apis.post(`login`, loginData, { withCredentials: true })
      .then((res) => {
        let jwtToken = res.headers.get("Authorization");
        let jwtrefreshToken = res.headers.get("Refresh");
        localStorage.setItem("Authorization", jwtToken);
        localStorage.setItem("Refresh", jwtrefreshToken);
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
