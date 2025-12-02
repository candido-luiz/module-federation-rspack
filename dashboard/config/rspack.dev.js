import { merge } from 'webpack-merge';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin, createModuleFederationConfig } from '@module-federation/enhanced/rspack';
import commonConfig from './rspack.common.js';
import packageJson from '../package.json' with { type: "json" };

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/',
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      historyApiFallback: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ModuleFederationPlugin(createModuleFederationConfig({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardApp': './src/bootstrap',
      },
      shared: packageJson.dependencies,
    })),
    new rspack.HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};

export default merge(commonConfig, devConfig);
