// @ts-check

/** @module Webpack config
 *  @since 2024.10.07, 00:00
 *  @changed 2024.10.15, 20:48
 */

// eslint-disable-next-line no-unused-vars
const webpack = require('webpack'); // Used only for typings

const {
  scriptsAssetFile,
  stylesAssetFile,
  localServerPrefix,
  appVersionTag,
} = require('./webpack.params');

/** @param {webpack.sources.Source | webpack.sources.ConcatSource} asset */
function getSourceContent(asset) {
  /** @type {string | Buffer} */
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
  /** @type {string} */
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
 * @param {boolean} [opts.isDev]
 * @param {boolean} [opts.isDebug]
 * @param {boolean} [opts.useLocalServedScripts]
 */
function getCompilationScriptsContent(compilation, opts = {}) {
  if (opts.isDev && opts.useLocalServedScripts) {
    return [
      '<!-- DEV: Locally linked scripts & styles -->',
      `<script src="${localServerPrefix}${scriptsAssetFile}?${appVersionTag}"></script>`,
      `<link rel="stylesheet" type="text/css" href="${localServerPrefix}${stylesAssetFile}?${appVersionTag}" />`,
    ].join('\n');
  }
  // Get all assets hash from the compilation...
  const { assets } = compilation;
  // Get scripts chunk...
  /** @type {webpack.sources.Source} */
  const scriptsAsset = assets[scriptsAssetFile];
  if (!scriptsAsset) {
    throw new Error('Script asset "' + scriptsAssetFile + '" not found!');
  }
  const scriptsContent = getAssetContent(scriptsAsset);
  // Get styles chunk...
  /** @type {webpack.sources.Source} */
  const stylesAsset = assets[stylesAssetFile];
  if (!stylesAsset) {
    throw new Error('Style asset "' + stylesAssetFile + '" not found!');
  }
  const stylesContent = getAssetContent(stylesAsset);
  if (opts.isDebug) {
    return [
      `<!-- DEBUG: Injected scripts begin (${scriptsAssetFile}) -->`,
      `<script src="data:text/javascript;base64,${btoa(scriptsContent)}"></script>`,
      `<!-- DEBUG: Injected scripts end (${scriptsAssetFile}) -->`,
      '',
      `<!-- DEBUG: Injected styles begin (${stylesAssetFile}) -->`,
      `<link rel="stylesheet" type="text/css" href="data:text/css;base64,${btoa(stylesContent)}" />`,
      `<!-- DEBUG: Injected styles end (${stylesAssetFile}) -->`,
    ].join('\n');
  }
  return [
    `<!-- Inline scripts begin (${scriptsAssetFile}) -->`,
    '<script>',
    scriptsContent,
    '</script>',
    `<!-- Inline scripts end (${scriptsAssetFile}) -->`,
    '',
    `<!-- Inline styles begin (${stylesAssetFile}) -->`,
    '<style>',
    stylesContent,
    '</style>',
    `<!-- Inline styles end (${stylesAssetFile}) -->`,
  ].join('\n');
}

module.exports = {
  getCompilationScriptsContent,
};
