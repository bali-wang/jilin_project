import Layout from "@/layout/index";

const forecast = {
  path: "/forecast",
  component: Layout,
  name: "forecast",
  redirect: "/forecast/city",
  hiddenInMenu: true,
  meta: { icon: "s-marketing", title: "预报分析", roles: ["admin"] },
  children: [
    {
      path: "city",
      name: "city",
      meta: { icon: "s-marketing", title: "城市逐日预报", roles: ["admin"] },
      component: () =>
        import(/* webpackChunkName: "city" */ "@/views/forecast/city/City")
    }
  ]
};

export default forecast;
