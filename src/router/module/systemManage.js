import Layout from "@/layout/index";

const systemManage = {
  path: "/systemManage",
  name: "systemManage",
  redirect: "/systemManage/menuManage",
  hiddenInMenu: true,
  meta: { icon: "setting", title: "系统管理", roles: ["admin"] },
  component: Layout,
  children: [
    {
      path: "menuManage",
      name: "menuManage",
      meta: { icon: "menu", title: "菜单管理" },
      component: () =>
        import(
          /* webpackChunkName: "meunManage" */ "@/views/systemManage/menuManage/MenuManage"
        )
    },
    {
      path: "roleManage",
      name: "roleManage",
      meta: { icon: "s-custom", title: "角色管理", roles: ["admin"] },
      component: () =>
        import(
          /* webpackChunkName: "roleManage" */ "@/views/systemManage/roleManage/Role"
        )
    }
  ]
};

export default systemManage;
