const getters = {
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  routes: state => state.permission.routes,
  echartsTheme: state => state.permission.echartsTheme
};
export default getters;
