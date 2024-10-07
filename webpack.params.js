// @ts-check

/** @module Webpack params
 *  @since 2024.10.07, 00:00
 *  @changed 2024.10.07, 16:04
 */

const fs = require('fs');
const path = require('path');

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

const scriptsAssetFile = 'scripts.js';
const stylesAssetFile = 'styles.css';

const localServerPrefix = 'http://localhost:3000/';

// @see https://webpack.js.org/configuration/devtool/#devtool
const devtool = isDev
  ? useInlineScripts
    ? 'inline-source-map'
    : 'source-map'
  : generateSourcesForProduction
    ? 'inline-source-map'
    : undefined;
const minimizeAssets = !isDev || !useLocalServedScripts;

// Info:
console.log('DEV:', isDev); // eslint-disable-line no-console
console.log('DEBUG:', isDebug); // eslint-disable-line no-console
console.log('VERSION:', appVersionHash); // eslint-disable-line no-console
console.log('devtool:', devtool); // eslint-disable-line no-console
console.log('outPath:', outPath); // eslint-disable-line no-console

// Core helpers...

/** @param {boolean|string|number|undefined|null} val */
function getTruthy(val) {
  if (!val || val === 'false' || val === '0') {
    return false;
  }
  return true;
}

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

  scriptsAssetFile,
  stylesAssetFile,

  localServerPrefix,

  devtool,
  minimizeAssets,
};
