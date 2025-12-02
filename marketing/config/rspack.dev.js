import { merge } from 'webpack-merge';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin, createModuleFederationConfig } from '@module-federation/enhanced/rspack';
import commonConfig from './rspack.common.js';
import packageJson from '../package.json' with { type: "json" };

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8081/',
  },
  devServer: {
    port: 8081,
    historyApiFallback: {
      historyApiFallback: true,
    },
  },
  plugins: [
    new ModuleFederationPlugin(createModuleFederationConfig({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap',
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-router-dom'],
        },
      },
    })),
    new rspack.HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
};

export default merge(commonConfig, devConfig);
