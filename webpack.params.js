// @ts-check

/** @module Webpack params
 *  @since 2024.10.07, 00:00
 *  @changed 2024.10.07, 05:12
 */

const fs = require('fs');
const path = require('path');
const { getTruthy } = require('./webpack.helpers');

const isDev = getTruthy(process.env.DEV);
const isDebug = true; // getTruthy(process.env.DEBUG);

/** Use locally served assets (only for debug mode) */
const useLocalServedScripts = true;

const useInlineScripts = !useLocalServedScripts;

/** Create source maps for production mode (not dev) */
const generateSourcesForProduction = true;

const templateHeaderFile = 'src/template-header.html';

const appInfoFile = 'src/app-info.json';
const appInfoContent = fs.readFileSync(path.resolve(__dirname, appInfoFile), {
  encoding: 'utf8',
});
const appInfo = JSON.parse(appInfoContent);
const { projectName, version, timestamp } = appInfo;
const appVersionHash = [
  [
    // Debug & dev flags...
    isDebug && 'DEBUG',
    isDev && 'DEV',
  ]
    .filter(Boolean)
    .join(','),
  // Version...
  projectName + ' v.' + version + ' / ' + timestamp,
]
  .filter(Boolean)
  .join(': ');
const outPath = isDev ? 'build-dev' : 'build';

// @see https://webpack.js.org/configuration/devtool/#devtool
const devtool = isDev
  ? useInlineScripts
    ? 'inline-source-map'
    : 'source-map'
  : generateSourcesForProduction
    ? 'inline-source-map'
    : undefined;

// Info:
console.log('DEV:', isDev); // eslint-disable-line no-console
console.log('DEBUG:', isDebug); // eslint-disable-line no-console
console.log('appVersionHash:', appVersionHash); // eslint-disable-line no-console
console.log('devtool:', devtool); // eslint-disable-line no-console

// Export parameters...
module.exports = {
  isDev,
  isDebug,

  useLocalServedScripts,
  useInlineScripts,

  templateHeaderFile,
  generateSourcesForProduction,

  appInfoFile,
  appInfoContent,
  appInfo,
  appVersionHash,

  outPath,

  devtool,
};
