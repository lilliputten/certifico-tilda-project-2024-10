// @ts-check

/** @module Webpack config
 *  @since 2024.10.07, 00:00
 *  @changed 2024.10.07, 04:11
 */

const webpack = require('webpack');

const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getCompilationScriptsContent } = require('./webpack.helpers');
const {
  isDebug,
  appInfoFile,
  useLocalServedScripts,
  appVersionHash,
  outPath,
  templateHeaderFile,
  devtool,
} = require('./webpack.params');

module.exports = {
  mode: 'production',
  // @see https://webpack.js.org/configuration/devtool/#devtool
  devtool,
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
              // TODO: Inject 'use' for math and color features, import common variables and mixins.
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEBUG': isDebug,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CopyPlugin({
      patterns: [{ from: appInfoFile }],
    }),
    new HtmlWebpackPlugin({
      template: 'src/template-header.html',
      filename: 'include.html',
      inject: false,
      minify: false,
      templateContent: (args) => {
        const headerContent = fs
          .readFileSync(path.resolve(__dirname, templateHeaderFile), {
            encoding: 'utf8',
          })
          .trim();
        /** @type {webpack.Compilation} */
        const compilation = args.compilation;
        // Get scripts chunk content...
        const scriptsContent = getCompilationScriptsContent(compilation, {
          isDebug,
          useLocalServedScripts,
        });
        return [
          // Combine template...
          '<!-- ' + appVersionHash + ' -->',
          '',
          headerContent,
          '',
          scriptsContent,
          '',
        ].join('\n');
      },
    }),
  ],
  optimization: {
    minimize: !isDebug || !useLocalServedScripts,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_debugger: false,
          },
        },
      }),
    ],
  },
  output: {
    filename: 'scripts.js',
    // NOTE: See also `outDir` field in `tsconfig.json`
    path: path.resolve(__dirname, outPath),
  },
};
