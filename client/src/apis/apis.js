import axios from "axios";

const refreshToken = localStorage.getItem("Refresh");

const Apis = axios.create({
  baseURL: "http://localhost:3001",
});

axios.interceptors.request.use(function (config) {
  console.log(123);

  config.withCredentials = true;
  let token = localStorage.getItem("Authorization");
  config.headers["Authorization"] = token;
  config.headers["Refresh"] = refreshToken;
  config.headers["Content-Type"] = "application/json";
  return config;
});

Apis.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    console.log(err);
    if (err.response && err.response.data.message === "JWT expired") {
      const originalRequest = err.config;
      console.log(11);
      try {
        console.log(22);
        const data = await Apis.post(
          "refresh",
          {},
          {
            headers: { Refresh: refreshToken },
          }
        );
        if (data) {
          console.log(data);
          const accToken = data.headers.get("authorization");
          localStorage.removeItem("Authorization");
          localStorage.setItem("Authorization", accToken);
          originalRequest.headers["Authorization"] = accToken;
          // originalRequest.headers["Authorization"] = accToken;
          // axios.defaults.headers.common.Authorization = accToken;
          originalRequest.headers["Refresh"] = refreshToken;
          console.log(originalRequest);
          return await axios.request(originalRequest);
          // return 1;
        }
      } catch (err) {
        console.log("토큰 갱신 에러");
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default Apis;
