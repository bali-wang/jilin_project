const getters = {
  token: state => state.user.token,
  username: state => state.user.username,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  routes: state => state.permission.routes,
  echartsTheme: state => state.permission.echartsTheme
};
export default getters;
