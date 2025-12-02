import { merge } from 'webpack-merge';
import { ModuleFederationPlugin, createModuleFederationConfig } from '@module-federation/enhanced/rspack';
import packageJson from '../package.json' with { type: "json" };
import commonConfig from './rspack.common.js';

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/dashboard/latest/',
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
  ],
};

export default merge(commonConfig, prodConfig);
