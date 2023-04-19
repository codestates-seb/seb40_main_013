import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Apis from "../../apis/apis";
import { Toast, Alert } from "../../components/Alert";
interface signUserArgs {
  signData: any;
  navigate: any;
}

interface loginUserArgs {
  loginData: any;
  navigate: any;
}

export const signUser = createAsyncThunk("user/signUser", async ({ signData, navigate }: signUserArgs) => {
  return await Apis.post(`signup`, signData)
    .then((res) => {
      navigate("/users/login");
      Toast("success", "회원가입에 성공하셨습니다!");
      return res.data;
    })
    .catch((err) => {
      if (err.response.data.message === "Nickname already exist") {
        Alert("error", "똑같은 닉네임이 존재합니다!");
      } else if (err.response.data.message === "Email already exist") {
        Alert("error", "똑같은 이메일이 존재합니다!");
      }
      console.log(err);
    });
});

export const loginUser = createAsyncThunk("user/loginUser", async ({ loginData, navigate }: loginUserArgs) => {
  return await Apis.post(`login`, loginData, { withCredentials: true })
    .then((res) => {
      localStorage.clear();
      const jwtToken = res.headers.get("Authorization");
      const jwtrefreshToken = res.headers.get("Refresh");
      localStorage.setItem("Authorization", jwtToken);
      localStorage.setItem("Refresh", jwtrefreshToken);
      navigate("/");
      Toast("success", "로그인에 성공하셨습니다!");
      return res.data;
    })
    .catch((err) => {
      Alert("error", "이메일이나 비밀번호를 확인해주세요!");
      console.log(err);
    });
});

export const getUser = createAsyncThunk("user/getUser", async () => {
  return await Apis.get(`members/mypage`, {
    headers: {
      Authorization: `${localStorage?.getItem("Authorization") ?? ""}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const updateUser = createAsyncThunk("user/updatesUser", async (updateData) => {
  return await Apis.patch(`members/mypage`, updateData, {
    headers: {
      Authorization: `${localStorage?.getItem("Authorization") ?? ""}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      // eslint-disable-next-line no-undef
      navigate("/members/mypage/purchase");
      window.location.reload();
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const guestUser = createAsyncThunk("user/guestUser", async ({ navigate }) => {
  return await Apis.post(`guest`)
    .then((res) => {
      localStorage.clear();
      const jwtToken = res.headers.get("Authorization");
      const jwtrefreshToken = res.headers.get("Refresh");
      localStorage.setItem("Authorization", jwtToken);
      localStorage.setItem("Refresh", jwtrefreshToken);
      const sellAuthority = res.data;
      localStorage.setItem("authority", sellAuthority);
      navigate("/");
      Toast("success", "게스트 로그인 성공!");
      return res.data;
    })
    // eslint-disable-next-line n/handle-callback-err
    .catch((err) => {
      Toast("error", "로그인에 실패했습니다!");
    });
});

interface User {
  address?: string;
  email: string;
  img?: string;
  memberId: number;
  memberStatus: string;
  nickname: string;
  phone: string;
}

interface UserState {
  users: User | null;
  updateUser: any[];
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  users: null,
  updateUser: [],
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
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
      }),
});

export default userSlice.reducer;
