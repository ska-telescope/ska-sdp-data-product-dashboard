const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const isDevelopment = process.env.NODE_ENV !== 'production';
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;
const webpack = require('webpack');

const dashboardUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DASHBOARD_URL;
const dashboardPort = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DASHBOARD_PORT;

module.exports = {
  output: {
    publicPath: `${dashboardUrl}:${dashboardPort}/`
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },

  devServer: {
    port: 3300,
    historyApiFallback: true
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

  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      'process.env.NODE_ENV': JSON.stringify(isDevelopment ? 'development' : 'production')
    }),
    new ModuleFederationPlugin({
      name: 'Ska_sdp_data_product_dashboard',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Ska_sdp_data_product_dashboard': './src/components/App/App.jsx'
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
        '@material-ui/core': { singleton: true, requiredVersion: '^auto' },
        '@mui/icons-material': { singleton: true, requiredVersion: '^auto', eager: true },
        '@mui/material': { singleton: true, requiredVersion: '^5.9.0', eager: true },
        '@emotion/react': { singleton: true, requiredVersion: '^11.9.3', eager: true },
        '@emotion/styled': { singleton: true, requiredVersion: '^11.9.3', eager: true },
        'prop-types': { singleton: true, requiredVersion: '^15.8.1', eager: true },
        'axios': { singleton: true, requiredVersion: '^auto', eager: true },
        'downloadjs': { singleton: true, requiredVersion: '^1.4.7', eager: true },
        moment: {
          eager: true,
          singleton: true,
          requiredVersion: deps.moment
        }
      }
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html'
    })
  ]
};
