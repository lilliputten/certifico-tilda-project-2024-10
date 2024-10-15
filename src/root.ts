/** @module Scripts root module
 *  @since 2024.10.06, 22:40
 *  @changed 2024.10.15, 13:56
 */

import './app-info.scss';
import './variables/variables-expose.scss';

import './misc-styles';

import { initNavHeader } from './NavHeader';
import { initTopMenu } from './TopMenu';
import { initServicesGallery } from './ServicesGallery';
import { initResponses } from './Responses';
import { initClientsGallery } from './ClientsGallery';

// Print app info...
const appVersion = process.env.APP_VERSION;
const isDebug = process.env.DEBUG;
const isDev = process.env.DEV;
// eslint-disable-next-line no-console
const consoleMethod = isDebug || isDev ? console.warn : console.log;
consoleMethod.call(console, appVersion);

function initPage() {
  // console.log('[root:initPage]');
  // Start subcomponents...
  initNavHeader();
  initTopMenu();
  initServicesGallery();
  initResponses();
  initClientsGallery();
  // setTimeout(initServicesGallery, 2000);
  // requestAnimationFrame(() => setTimeout(initServicesGallery, 1000));
}

window.addEventListener('load', initPage);
