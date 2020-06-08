import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/iconfont/iconfont.css";
import "./plugins/element.js";
import "normalize.css/normalize.css";
import "./styles/index.scss";
import "lib-flexible";
import "./permission";
import vintage from "./assets/theme/vintage.json";
import chalk from "./assets/theme/chalk.json";
import infographic from "./assets/theme/infographic.json";
import macarons from "./assets/theme/macarons.json";
import echarts from "echarts";
echarts.registerTheme("vintage", vintage);
echarts.registerTheme("chalk", chalk);
echarts.registerTheme("infographic", infographic);
echarts.registerTheme("macarons", macarons);
store.dispatch("permission/setEchartsTheme", [
  "vintage",
  "chalk",
  "infographic",
  "macarons"
]);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
