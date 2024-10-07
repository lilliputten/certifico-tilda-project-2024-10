/**
 * @module Scripts root module
 * @since 2024.10.06, 22:40
 * @changed 2024.10.07, 04:58
 */

// Print app info...
const appVersion = process.env.APP_VERSION;
const isDebug = process.env.DEBUG;
const isDev = process.env.DEV;
// eslint-disable-next-line no-console
const consoleMethod = isDebug || isDev ? console.warn : console.log;
consoleMethod.call(console, appVersion);
