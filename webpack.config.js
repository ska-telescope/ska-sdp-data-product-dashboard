const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const deps = require('./package.json').dependencies;
const version = require('./package.json').version;

module.exports = (env, argv) => { return {
  entry: "./src/index.jsx",
  output: {},

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },


  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },

  devServer: {
    port: 8100,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js|\.jsx/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  devtool: "source-map",

  plugins: [
    new ModuleFederationPlugin({
      name: 'sdpDataProductDashboard',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Dashboard': './src/components/DataProductDashboard/DataProductDashboard.jsx'
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps['react']
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-dom']
        },
        i18next: {
          eager: true,
          singleton: true,
          requiredVersion: deps.i18next
        },
        'react-i18next': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-i18next']
        },
        'i18next-browser-languagedetector': {
          eager: true,
          singleton: true,
          requiredVersion: deps['i18next-browser-languagedetector']
        },
        'i18next-http-backend': {
          eager: true,
          singleton: true,
          requiredVersion: deps['i18next-http-backend']
        },
        // Material UI
        '@mui/icons-material': { singleton: true, requiredVersion: '^5.8.4', eager: true },
        '@mui/material': { singleton: true, requiredVersion: '^5.9.0', eager: true },
        '@mui/x-data-grid': { singleton: true, requiredVersion: '^5.17.22', eager: true },
        '@emotion/react': { singleton: true, requiredVersion: '^11.9.3', eager: true },
        '@mui/system': { singleton: true, requiredVersion: '^5.11.16', eager: true },
        '@emotion/styled': { singleton: true, requiredVersion: '^11.9.3', eager: true },
        'prop-types': { singleton: true, requiredVersion: '^15.8.1', eager: true },
        'streamsaver': { singleton: true, requiredVersion: '^2.0.6', eager: true },
        '@ska-telescope/ska-gui-components': {
          requiredVersion: 'auto',
          eager: true
        },
        axios: { singleton: true, requiredVersion: '^0.27.2', eager: true },
        downloadjs: { singleton: true, requiredVersion: '^1.4.7', eager: true },
        moment: {
          eager: true,
          singleton: true,
          requiredVersion: deps.moment
        }
      }
    }),
    new HtmlWebPackPlugin({
      inject: true,
      template: './public/index.html'
    }),
    new webpack.EnvironmentPlugin({
      REACT_APP_VERSION: version,
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
              from: 'public',
              to: 'dist',
              globOptions: {
                dot: true,
                gitignore: true,
                ignore: ["**/*.html"],
              },
            }
        ]
    }),
    new Dotenv({
      path: '.env',
    })
  ]
  };
};
