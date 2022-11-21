import axios from "axios";

const refreshToken = localStorage.getItem("Refresh");

const Apis = axios.create({
  baseURL: "https://flat-pandas-pump-113-52-194-59.loca.lt/",
  headers: {
    "Content-Type": "application/json",
  },
});
axios.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem("Authorization");
    if (token != undefined) {
      console.log(111);
      config.headers["Authorization"] = token;
      config.headers["Refresh"] = refreshToken;
      config.headers["Content-Type"] = "application/json";
      console.log(1, config);
    }
    return config;
  },
  async function (error) {
    // 오류 요청 가공
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(1234);
    return response;
  },
  async (err) => {
    console.log("abc", err);

    if (err.response.data.message === "JWT expired") {
      let originalRequest = err.config;
      console.log("abc", 11);
      try {
        console.log("abc", 22);
        const data = await Apis.post(
          "refresh",
          {},
          {
            headers: { Refresh: refreshToken },
          }
        );
        if (data) {
          console.log("abc", data);
          const accToken = data.headers.get("Authorization");
          localStorage.removeItem("Authorization");
          localStorage.setItem("Authorization", accToken);
          originalRequest.headers["Authorization"] = accToken;
          originalRequest.headers["Refresh"] = refreshToken;
          originalRequest.headers["Content-Type"] = "application/json";
          console.log("abcd", 2, originalRequest);
          return await axios.request(originalRequest);
          // return 1;
        }
      } catch (err) {
        console.log("abc", "토큰 갱신 에러");
        console.log(err);
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default Apis;
