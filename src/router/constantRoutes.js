import Login from "@/views/user/Login";
import Layout from "@/layout/index";
const constantRoutes = [
  {
    path: "/login",
    component: Login,
    hiddenInMenu: true
  },
  {
    path: "/",
    redirect: "/home",
    name: "home",
    hiddenInMenu: true,
    meta: { icon: "s-home", title: "首页" },
    component: Layout,
    children: [
      {
        path: "home",
        hiddenInMenu: true,
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/Home")
      }
    ]
  }
];

export default constantRoutes;
