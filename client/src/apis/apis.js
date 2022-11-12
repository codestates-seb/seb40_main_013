import axios from "axios";

const Apis = axios.create({
  baseURL: "http://localhost:3001/",
});

export default Apis;
