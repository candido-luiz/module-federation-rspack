import { VueLoaderPlugin }  from 'vue-loader'

export default {
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
  },
  resolve: {
    extensions: [".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
        type: "asset/inline",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.scss|\.css$/,
        use: ["vue-style-loader", "style-loader", "css-loader", "sass-loader"],
      },
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
                jsx: false,
              },
            },
          },
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
