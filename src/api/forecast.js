import { axios } from "@/utils/request";

// 查询树数据
export const queryTree = params => {
  return axios({
    url: "/sys/QueryTree",
    method: "GET",
    params
  });
};

// 城市气象预报查询(产品时间)
export const cityWrfPredictByTimeQuery = params => {
  return axios({
    url: "/wrf/CityWrfPredictByTimeQuery",
    method: "GET",
    params
  });
};

// 城市污染物预报数据查询（产品时间）
export const cityPredictionByTimeQuery = params => {
  return axios({
    url: "/pollutant/CityPredictionByTimeQuery",
    method: "GET",
    params
  });
};

// 城市污染物实测数据查询
export const cityActuallyQuery = params => {
  return axios({
    url: "/pollutant/CityActuallyQuery",
    method: "GET",
    params
  });
};

// 站点气象预报查询(产品时间)
export const stationWrfByTimeQuery = params => {
  return axios({
    url: "/wrf/StationWrfByTimeQuery",
    method: "GET",
    params
  });
};

// 站点污染物预报数据查询（产品时间）
export const stationPredictionByTimeQuery = params => {
  return axios({
    url: "/pollutant/StationPredictionByTimeQuery",
    method: "GET",
    params
  });
};

// 站点污染物实测数据查询
export const stationActuallyQuery = params => {
  return axios({
    url: "/pollutant/StationActuallyQuery",
    method: "GET",
    params
  });
};

// 人工订正数据查询(产品时效)
export const manualWorkCorrectDataQuery = params => {
  return axios({
    url: "/correct/ManualWorkCorrectDataQuery",
    method: "GET",
    params
  });
};

// 查询用户列表
export const queryUserList = params => {
  return axios({
    url: "/admin/user/QueryUserList",
    method: "GET",
    params
  });
};

// 订正区域查询
export const queryAreaInfo = params => {
  return axios({
    url: "/area/QueryAreaInfo",
    method: "GET",
    params
  });
};
