const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const envFile = process.env.ENV_FILE || '.env';
require('dotenv').config({
  path: `${__dirname}/../${envFile}`,
});

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css',
    }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './assets/index.html',
      filename: 'index.html',
      basePath: process.env.CLIENT_BASE_PATH,
      inject: false,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  ie: '11',
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2, url: false },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
        ],
      },
    ],
  },
};
