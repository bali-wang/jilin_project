module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px2rem-exclude": {
      remUnit: 136,
      exclude: "/node_modules|floder_name/i"
    }
  }
};
