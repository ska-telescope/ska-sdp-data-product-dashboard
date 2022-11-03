const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const deps = require('./package.json').dependencies;

module.exports = (env, argv) => { return {
  entry: "./src/index.jsx",
  output: {},

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
  },

  devServer: {
    port: 8100,
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

  devtool: "source-map",

  plugins: [
    new ModuleFederationPlugin({
      name: 'sdpDataProductDashboard',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Dashboard': './src/components/App/App.jsx'
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
        axios: { singleton: true, requiredVersion: '^auto', eager: true },
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
      REACT_APP_SKA_SDP_DATA_PRODUCT_DASHBOARD_URL:'http://localhost',
      REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL: 'http://localhost:8000',
      REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA: 'false'
    }),
    new CopyWebpackPlugin({
        patterns: [
            {
              from: 'public',
              globOptions: {
                dot: true,
                gitignore: true,
                ignore: ["**/*.html"],
              },
            }
        ]
    })   
  ]
};};
