import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";
import { Toast } from "../../components/Alert";
import { Alert } from "../../components/Alert";

export const signUser = createAsyncThunk(
  "user/signUser",
  async ({ signData, navigate }) => {
    return Apis.post(`signup`, signData)
      .then((res) => {
        navigate("/users/login");
        Toast("success", "회원가입에 성공하셨습니다!");
        return res.data;
      })
      .catch((err) => {
        Toast("error", "회원가입에 실패했습니다!");
        console.log(err);
      });
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ loginData, navigate }) => {
    return Apis.post(`login`, loginData, { withCredentials: true })
      .then((res) => {
        localStorage.clear();
        let jwtToken = res.headers.get("Authorization");
        let jwtrefreshToken = res.headers.get("Refresh");
        localStorage.setItem("Authorization", jwtToken);
        localStorage.setItem("Refresh", jwtrefreshToken);
        navigate("/");
        Toast("success", "로그인에 성공하셨습니다!");
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        Toast("error", "로그인에 실패했습니다!");
        console.log(err);
      });
  }
);

export const getUser = createAsyncThunk("user/getUser", async () => {
  return Apis.get(`members/mypage`, {
    headers: {
      Authorization: `${localStorage.getItem("Authorization")}`,
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
});
export const updateUser = createAsyncThunk(
  "user/updatesUser",
  async (updateData) => {
    console.log(updateData);
    return Apis.patch(`members/mypage`, updateData, {
      headers: {
        Authorization: `${localStorage.getItem("Authorization")}`,
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
export const guestUser = createAsyncThunk(
  "user/guestUser",
  async ({ navigate }) => {
    return Apis.post(`guest`)
      .then((res) => {
        console.log(res);
        localStorage.clear();
        let jwtToken = res.headers.get("Authorization");
        let jwtrefreshToken = res.headers.get("Refresh");
        localStorage.setItem("Authorization", jwtToken);
        localStorage.setItem("Refresh", jwtrefreshToken);
        let sellAuthority = res.data;
        localStorage.setItem("authority", sellAuthority);
        navigate("/");
        Toast("success", "게스트 로그인 성공!");
        return res.data;
      })
      .catch((err) => {
        Toast("error", "로그인에 실패했습니다!");
      });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    updateUser: [],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(signUser.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = true;
      state.error = "";
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = true;
      state.error = "";
    })
    .addCase(guestUser.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = true;
      state.error = "";
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = true;
      state.error = "";
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.updateUser = action.payload;
      state.loading = true;
      state.error = "";
    })
});

export default userSlice.reducer;
