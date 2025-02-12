const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
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
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    fallback: {
      path: require.resolve('path-browserify'),
    }
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
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] }
      }
    ]
  },

  devtool: "source-map",

  plugins: [
    new ModuleFederationPlugin({
      name: 'dataProductDashboard',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        './Dashboard': './src/components/DataProductDashboard/DataProductDashboard.tsx'
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          eager: true,
          singleton: true,
          requiredVersion: deps['react-router-dom'],
        },
        '@react-spring/web': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@react-spring/web'],
        },
        // i18n
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
        '@mui/icons-material': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@mui/icons-material']
        },
        '@mui/material': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@mui/material']
        },
        '@mui/x-data-grid': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@mui/x-data-grid']
        },
        '@emotion/react': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@emotion/react']
        },
        '@mui/system': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@mui/system']
        },
        '@emotion/styled': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@emotion/styled']
        },
        'prop-types': {
          eager: true,
          singleton: true,
          requiredVersion: deps['prop-types']
        },
        'streamsaver': {
          eager: true,
          singleton: true,
          requiredVersion: deps['streamsaver']
        },
        '@ska-telescope/ska-gui-components': {
          requiredVersion: 'auto',
          eager: true
        },
        // SKAO components
        '@ska-telescope/ska-gui-components': {
          eager: true,
          singleton: true,
          requiredVersion: deps['@ska-telescope/ska-gui-components'],
        },
        '@ska-telescope/ska-gui-local-storage': {
          requiredVersion: deps['@ska-telescope/ska-gui-local-storage'],
          singleton: true,
          eager: true,
        },
        // MS Entra components
        '@azure/msal-browser': {
          requiredVersion: deps['@azure/msal-browser'],
          singleton: true,
          eager: true,
        },
        '@azure/msal-react': {
          requiredVersion: deps['@azure/msal-react'],
          singleton: true,
          eager: true,
        },
        // mixture
        axios: {
          eager: true,
          singleton: true,
          requiredVersion: deps.axios,
        },
        downloadjs: {
          eager: true,
          singleton: true,
          requiredVersion: deps.downloadjs,
        },
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
