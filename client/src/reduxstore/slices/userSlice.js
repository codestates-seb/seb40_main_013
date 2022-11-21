import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";

let jwtToken = localStorage.getItem("Authorization");
export const signUser = createAsyncThunk(
  "user/signUser",
  async ({ signData, navigate }) => {
    return Apis.post(`signup`, signData)
      .then((res) => {
        navigate("/users/login");
        window.alert("회원가입 성공!");
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
        window.alert("로그인 성공!");
        // return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const guestUser = createAsyncThunk(
  "user/guestUser",
  async ({ navigate }) => {
    return Apis.post(`guest`)
      .then((res) => {
        let jwtToken = res.headers.get("Authorization");
        localStorage.setItem("Authorization", jwtToken);
        navigate("/");
        window.alert("로그인 성공!");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
export const getUser = createAsyncThunk(
  "user/getUser",
  async () => {
    return Apis.get(`members/mypage`, {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json",
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
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updateData) => {
    console.log(updateData)
    return Apis.patch(`members/mypage`, updateData, {
      headers: {
        Authorization: `${jwtToken}`,
        "Content-Type": "application/json",
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    uadateUser: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [signUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.updateUser = [];
      state.loading = true;
      state.error = "";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.updateUser = [];
      state.loading = true;
      state.error = "";
    },
    [guestUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.updateUser = [];
      state.loading = true;
      state.error = "";
    },
    [getUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.updateUser = [];
      state.loading = true;
      state.error = "";
    },
    [updateUser.fulfilled]: (state, action) => {
      state.users = [];
      state.updateUser = action.payload;
      state.loading = true;
      state.error = "";
    },
  },
});

export default userSlice.reducer;
