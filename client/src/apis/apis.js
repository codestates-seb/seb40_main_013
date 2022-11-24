import axios from "axios";

const refreshToken = localStorage.getItem("Refresh");

const Apis = axios.create({
  baseURL: "https://hot-facts-like-113-52-194-59.loca.lt/",
});

axios.interceptors.request.use(function (config) {

  return config;
});

Apis.interceptors.response.use(
  function (response) {
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
          // originalRequest.headers["Refresh"] = refreshToken;
          originalRequest.headers["Content-Type"] = "application/json";
          console.log("abcd", 2, originalRequest);
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
        console.log("abc", "토큰 갱신 에러");
        console.log(err);
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default Apis;
