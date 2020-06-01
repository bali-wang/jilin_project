import { axios } from "@/utils/request";
// 用户登录
export const login = params => {
  return axios({
    url: "/login",
    method: "POST",
    data: params
  });
};
