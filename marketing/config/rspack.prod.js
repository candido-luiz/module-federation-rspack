import { merge } from 'webpack-merge';
import { ModuleFederationPlugin, createModuleFederationConfig } from '@module-federation/enhanced/rspack';
import packageJson from '../package.json' with { type: "json" };
import commonConfig from './rspack.common.js';

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/marketing/latest/',
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
  ],
};

export default merge(commonConfig, prodConfig);
