import Layout from "@/layout/index";

const assessment = {
  path: "/assessment",
  name: "assessment",
  redirect: "/assessment/effect",
  component: Layout,
  hiddenInMenu: true,
  meta: { icon: "s-order", title: "预报评估", roles: ["admin"] },
  children: [
    {
      path: "effect",
      name: "effect",
      meta: {
        icon: "office-building",
        title: "预报效果评估",
        roles: ["admin"]
      },
      component: () =>
        import(
          /* webpackChunkName: "simulation" */ "@/views/assessment/effectEvaluation/EffectEvaluation"
        )
    }
  ]
};

export default assessment;
