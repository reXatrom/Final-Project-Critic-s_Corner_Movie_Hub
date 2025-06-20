// const webpack = require("webpack");

// module.exports = {
//   webpack: {
//     configure: (webpackConfig) => {
//       webpackConfig.resolve.fallback = {
//         ...webpackConfig.resolve.fallback,
//         process: require.resolve("process/browser"),
//         stream: require.resolve("stream-browserify"),
//         crypto: require.resolve("crypto-browserify"),
//         assert: require.resolve("assert"),
//         util: require.resolve("util"),
//         http: require.resolve("stream-http"),
//         https: require.resolve("https-browserify"),
//         zlib: require.resolve("browserify-zlib")
//       };

//       webpackConfig.plugins = [
//         ...webpackConfig.plugins,
//         new webpack.ProvidePlugin({
//           process: "process/browser",
//           Buffer: ["buffer", "Buffer"],
//         }),
//       ];

//       return webpackConfig;
//     },
//   },
// };


module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
