import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Message } from "element-ui";
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = window.localStorage.getItem("TOKEN");
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const roles = store.getters.roles && store.getters.roles.length > 0;
      if (roles) {
        next();
      } else {
        try {
          store.dispatch("GetInfo").then(roles => {
            store.dispatch("permission/generateRoutes", roles).then(routes => {
              router.addRoutes(routes);
              next({ ...to, replace: true });
            });
          });
        } catch (error) {
          store.dispatch("refreshToken");
          Message.error(error);
          next({ path: "/login" });
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: "/login" });
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
