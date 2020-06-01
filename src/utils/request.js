import axios from "axios";
import { Message } from "element-ui";
// import router from "../router";

const service = axios.create({
  baseURL: "/webapi",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
  timeout: 5000
});
const hanldeConfig = config => {
  const token = window.localStorage.getItem("TOKEN");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
};
const handleErr = err => {
  Message.error(err);
  return Promise.reject(err);
};
service.interceptors.request.use(hanldeConfig, handleErr);
service.interceptors.response.use();
export { service as axios };
