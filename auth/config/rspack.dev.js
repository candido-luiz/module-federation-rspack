import { merge } from 'webpack-merge';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin, createModuleFederationConfig } from '@module-federation/enhanced/rspack';
import commonConfig from './rspack.common.js';
import packageJson from '../package.json' with { type: "json" };

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/',
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      historyApiFallback: true,
    },
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin(createModuleFederationConfig({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
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
  ],
};

export default merge(commonConfig, devConfig);
