const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

module.exports = {
  output: {
    publicPath: 'http://localhost:3300/'
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
        '@material-ui/core': { singleton: true, requiredVersion: 'auto' },
        '@mui/icons-material': { singleton: true, requiredVersion: 'auto' },
        '@mui/material': { singleton: true, requiredVersion: 'auto', eager: true },
        '@emotion/react': { singleton: true, requiredVersion: 'auto', eager: true },
        '@emotion/styled': { singleton: true, requiredVersion: 'auto', eager: true },
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
