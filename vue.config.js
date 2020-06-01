const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@comp", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@layout", resolve("src/layout"))
      .set("@static", resolve("src/static"))
      .set("@router", resolve("src/router"));
    // config.module
    //   .rule("css")
    //   .test(/\.css$/)
    //   .oneOf("vue")
    //   .resourceQuery(/\?vue/)
    //   .use("px2rem")
    //   .loader("px2rem-loader")
    //   .options({
    //     remUnit: 192
    //   })
    //   .end();
  },
  devServer: {
    port: 9000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/webapi": {
        target: "http://192.168.1.146:8087",
        changeOrigin: true
      }
    }
  }
};
