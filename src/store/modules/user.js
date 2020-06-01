import { login } from "@/api/user";
const state = {
  token: "",
  roles: []
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = [...roles];
  }
};
const actions = {
  Login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(result => {
          console.log(result);
          const { authorization } = result.headers;
          window.localStorage.setItem("TOKEN", authorization);
          commit("SET_TOKEN", authorization);
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  GetInfo({ commit }) {
    return new Promise(resolve => {
      // getInfo().then(res => {
      //   commit();
      // });
      setTimeout(() => {
        commit("SET_ROLES", ["admin"]);
        resolve(["admin"]);
      }, 1000);
    });
  },
  refreshToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", "");
      resolve();
    });
  }
};

export default {
  // namespaced: true,
  state,
  actions,
  mutations
};
