import axios from "axios";
import { Link } from "react-router-dom";
import { Toast } from "../components/Alert";

const url = process.env.REACT_APP_URL;

const Apis = axios.create({
  baseURL: "https://stale-games-flash-125-134-111-45.loca.lt",
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
    const refreshDatas = refreshTokenExpiredDataMessage.startsWith(
      "Refresh Token Error"
    );
    if (datas) {
      let originalRequest = err.config;
      try {
        const data = await Apis.post(
          "refresh",
          {},
          {
            headers: { Refresh: localStorage.getItem("Refresh") },
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
      Toast("warning", "로그인 해주세요!");
      localStorage.clear();
    }

    return Promise.reject(err);
  }
);

export default Apis;
