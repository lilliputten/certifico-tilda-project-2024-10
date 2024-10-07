// @ts-check

/** @module Webpack params
 *  @since 2024.10.07, 00:00
 *  @changed 2024.10.07, 03:45
 */

const fs = require('fs');
const path = require('path');
const { getTruthy } = require('./webpack.helpers');

const isDebug = getTruthy(process.env.DEBUG);

const useLocalServedScripts = true;

const useInlineScripts = !useLocalServedScripts;

const generateSourcesForProduction = false;

const templateHeaderFile = 'src/template-header.html';

const appInfoFile = 'src/app-info.json';
const appInfoContent = fs.readFileSync(path.resolve(__dirname, appInfoFile), {
  encoding: 'utf8',
});
const appInfo = JSON.parse(appInfoContent);
const { projectName, version, timestamp } = appInfo;
const appVersionHash =
  (isDebug ? 'DEBUG: ' : '') + projectName + ' v.' + version + ' / ' + timestamp;

const outPath = isDebug ? 'build-debug' : 'build';

// @see https://webpack.js.org/configuration/devtool/#devtool
const devtool = isDebug
  ? useInlineScripts
    ? 'inline-source-map'
    : 'source-map'
  : generateSourcesForProduction
    ? 'source-map'
    : undefined;

// Export parameters...
module.exports = {
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
