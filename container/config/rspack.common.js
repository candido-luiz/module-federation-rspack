import { rspack } from '@rspack/core';

const config = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            env: {
              targets: "defaults",
            },

            transform: {
              runtime: true,
              regenerator: true,
            },

            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  runtime: "automatic",
                  development: false,
                  refresh: false,
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./public/index.html",
    }),
  ],
};

export default config;