/**
 * @module Scripts root module
 * @since 2024.10.06, 22:40
 * @changed 2024.10.07, 04:00
 */

import appInfo from '../app-info.json';

const { appVersionHash } = appInfo;

const isDebug = process.env.DEBUG;

if (isDebug) {
  // eslint-disable-next-line no-console
  console.warn('DEBUG:', appVersionHash);
} else {
  // eslint-disable-next-line no-console
  console.log('App:', appVersionHash);
}
// debugger;

export { appVersionHash };
