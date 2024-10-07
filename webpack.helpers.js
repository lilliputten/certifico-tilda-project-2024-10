// @ts-check

/** @module Webpack config
 *  @since 2024.10.07, 00:00
 *  @changed 2024.10.07, 03:49
 */

// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');

/** @param {boolean|string|number|undefined|null} val */
function getTruthy(val) {
  if (!val || val === 'false' || val === '0') {
    return false;
  }
  return true;
}

/** @param {webpack.sources.Source | webpack.sources.ConcatSource} asset */
function getSourceContent(asset) {
  /** @type {string | Buffer<ArrayBufferLike>} */
  const content = asset.source();
  // Convert to string if buffer...
  if (content instanceof Buffer) {
    return content.toString('utf8');
  }
  // TODO: Check other (?) types?
  return String(content);
}

/** @param {webpack.sources.Source | webpack.sources.ConcatSource} asset */
function getAssetContent(asset) {
  /** @type {string | Buffer<ArrayBufferLike>} */
  let content = '';
  // Extract content from a list of children or a single item...
  const concatSourceAsset = /** @type {webpack.sources.ConcatSource} */ (asset);
  if (typeof concatSourceAsset.getChildren === 'function') {
    const sources = concatSourceAsset.getChildren();
    content = sources.map(getSourceContent).join('');
    // content = sources.map((s) => s.source()).join('');
  } else {
    content = getSourceContent(asset);
  }
  return content;
}

/**
 * @param {webpack.Compilation} compilation
 * @param {object} [opts]
 * @param {boolean} [opts.isDebug]
 * @param {boolean} [opts.useLocalServedScripts]
 */
function getCompilationScriptsContent(compilation, opts = {}) {
  const scriptFile = 'scripts.js';
  const styleFile = 'styles.css';
  if (opts.isDebug && opts.useLocalServedScripts) {
    return [
      '<!-- DEBUG: Locally inked scripts & styles -->',
      '<script src="http://localhost:3000/' + scriptFile + '"></script>',
      '<link rel="stylesheet" href="http://localhost:3000/' + styleFile + '" type="text/css" />',
    ].join('\n');
  }
  // Read scripts chunk...
  const { assets } = compilation;
  /** @type {webpack.sources.Source} */
  const assetSource = assets[scriptFile];
  if (!assetSource) {
    throw new Error('Script asset "' + scriptFile + '" not found!');
  }
  const scriptsContent = getAssetContent(assetSource);
  if (opts.isDebug) {
    return [
      '<!-- DEBUG: Injected script begin (' + scriptFile + ') -->',
      '<script src="data:text/javascript;base64,' + btoa(scriptsContent) + '"></script>',
      '<!-- DEBUG: Injected script end (' + scriptFile + ') -->',
    ].join('\n');
  }
  return [
    '<!-- Inline script begin (' + scriptFile + ') -->',
    '<script>',
    scriptsContent,
    '</script>',
    '<!-- Inline script end (' + scriptFile + ') -->',
  ].join('\n');
}

module.exports = {
  getTruthy,
  getCompilationScriptsContent,
};
