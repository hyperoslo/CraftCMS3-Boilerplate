const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.join(__dirname, './web'),
    filename: 'bundle.js'
  },
  devServer: {
    host: 'localhost',
    proxy: {
      '**': 'http://localhost:8888'
    },
    contentBase: path.join(__dirname, "./templates"),
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "stylus-loader"
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "url-loader"
        }
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader,
          {loader: "css-loader"},
          {
            loader: 'postcss-loader',
            options: {
                plugins: () => [require('autoprefixer')({
                    'browsers': ['> 1%', 'last 2 versions']
                })],
            }
          },
          {loader: "stylus-loader"}
        ]
      }
    ]
  },
  plugins: [
    new WriteFilePlugin(),
    new CopyWebpackPlugin([{ from: './src/assets/images', to: '../templates/images' }]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};
