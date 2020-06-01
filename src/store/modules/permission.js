import constantRoutes from "@/router/constantRoutes";
import currentRoleRoutes from "@/utils/routesUtils";
import permissionRoutes from "@/router/permissionRoutes";
const state = {
  routes: [],
  addRoutes: [],
  echartsTheme: []
};
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = [...routes];
    state.routes = constantRoutes.concat(routes);
  },
  SET_ECHARTS_THEMEN: (state, themeList) => {
    state.echartsTheme = [...themeList];
  }
};
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let roleRoutes = [];
      if (roles.includes("admin")) {
        roleRoutes = [...permissionRoutes] || [];
      } else {
        roleRoutes = currentRoleRoutes(roles, permissionRoutes);
      }
      commit("SET_ROUTES", roleRoutes);
      resolve(roleRoutes);
    });
  },
  setEchartsTheme({ commit }, themeList) {
    commit("SET_ECHARTS_THEMEN", themeList);
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
