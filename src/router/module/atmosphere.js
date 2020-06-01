import Layout from "@/layout/index";

const atmosphere = {
  path: "/atmosphere",
  name: "atmosphere",
  redirect: "/atmosphere/simulation",
  component: Layout,
  hiddenInMenu: true,
  meta: { icon: "s-platform", title: "气象分析", roles: ["admin"] },
  children: [
    {
      path: "simulation",
      name: "simulation",
      meta: { icon: "s-data", title: "气象模拟分析", roles: ["admin"] },
      component: () =>
        import(
          /* webpackChunkName: "simulation" */ "@/views/atmosphere/simulation/Simulation"
        )
    }
  ]
};

export default atmosphere;
