import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "../components/Alert";

const refreshToken = localStorage.getItem("Refresh");

const Apis = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
axios.interceptors.request.use(function (config) {
  return config;
});

Apis.interceptors.response.use(
  function (response) {
    return response;
  },
  async (err) => {
    let tokenExpiredDataMessage = String(err.response.data.message);
    let refreshTokenExpiredDataMessage = String(err.response.data.message);
    const datas = tokenExpiredDataMessage.startsWith("JWT expired");
    const refreshDatas = refreshTokenExpiredDataMessage.startsWith("JWT");
    if (datas) {
      let originalRequest = err.config;
      try {
        const data = await Apis.post(
          "refresh",
          {},
          {
            headers: { Refresh: refreshToken },
          }
        );
        if (data) {
          const accToken = data.headers.get("Authorization");
          localStorage.removeItem("Authorization");
          localStorage.setItem("Authorization", accToken);
          // originalRequest.headers["Refresh"] = refreshToken;
          originalRequest.headers["Content-Type"] = "application/json";
          // return axios.request(originalRequest);
          return Apis({
            ...originalRequest,
            headers: {
              ...originalRequest.headers,
              Authorization: `${accToken}`,
            },
            sent: true,
          });
        }
      } catch (err) {
        console.log(err);
      }
      return Promise.reject(err);
    }
    if (err.response.data.message === "Unauthorized" || refreshDatas) {
      Toast("success", "다시 로그인 해주세요!");
      localStorage.clear();
    }

    return Promise.reject(err);
  }
);

export default Apis;
