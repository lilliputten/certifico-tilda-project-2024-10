// @ts-check

const path = require('path');
// const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  // @see https://webpack.js.org/configuration/devtool/#devtool
  // devtool: 'source-map',
  devtool: 'inline-source-map',
  entry: [
    // NOTE: See also `files` field in `tsconfig.json`
    './src/scripts/root.ts',
    './src/styles/styles.scss',
  ],
  resolve: {
    extensions: ['.scss', '.sass', '.css', '.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // @see https://github.com/TypeStrong/ts-loader
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },

          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },

          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_debugger: false,
            // global_defs: {
            //   '@console.log': 'alert',
            // },
            // passes: 2,
            // html5_comments: true,
          },
        },
      }),
    ],
  },
  output: {
    filename: 'scripts.js',
    // NOTE: See also `outDir` field in `tsconfig.json`
    path: path.resolve(__dirname, 'build'),
  },
};
