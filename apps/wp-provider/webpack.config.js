const path = require('path');
const dist = path.resolve(__dirname, 'dist');
// const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    port: 3004,
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    publicPath: 'auto',
  },
  mode,
  plugins: [
    new ModuleFederationPlugin({
      name: 'wp_provider',
      filename: 'remoteEntry.js',
      exposes: {
        './button': './src/button.tsx',
        './switch': './src/ModeSwitch.tsx',
      },
      shared: [{
        react: {
          requiredVersion: "^18.3.1",
          singleton: true,
        },
        'react-dom': {
          requiredVersion: "^18.3.1",
          singleton: true,
        },
        '@emotion/styled': {
          requiredVersion: "^11.11.5",
          singleton: true,
        },
        '@emotion/react': {
          requiredVersion: "^11.11.4",
          singleton: true,
        },
        '@mui/material': {
          requiredVersion: "^5.15.19",
          singleton: true,
        }
      }],
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack Example',
      filename: 'index.html',
      template: 'index.html',
    }),
  ],
};
