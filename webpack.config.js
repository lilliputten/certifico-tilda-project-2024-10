// @ts-check

// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');

const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const templateHeaderFile = 'src/template-header.html';

module.exports = {
  mode: 'production',
  // @see https://webpack.js.org/configuration/devtool/#devtool
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
    new CopyPlugin({
      patterns: [{ from: 'src/app-info.json' }],
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
        const { compilation } = args;
        // Read scripts chunk...
        const { assets } = compilation;
        /** @type {webpack.sources.ConcatSource} */
        const scriptsAsset = assets['scripts.js'];
        const scriptsSources = scriptsAsset.getChildren();
        const scriptsContent = scriptsSources.map((s) => s.source()).join('');
        return [
          // Combine template...
          headerContent,
          '',
          '<!-- Injected script -->',
          '<script>',
          scriptsContent,
          '</script>',
        ].join('\n');
      },
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
