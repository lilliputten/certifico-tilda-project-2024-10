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
import { initFaq } from './Faq';

/** Print app info */
function printAppInfo() {
  const appVersion = process.env.APP_VERSION;
  const isDebug = process.env.DEBUG;
  const isDev = process.env.DEV;
  // eslint-disable-next-line no-console
  const consoleMethod = isDebug || isDev ? console.warn : console.log;
  consoleMethod.call(console, appVersion);
}

/** Init all the page */
function initPage() {
  // Start subcomponents...
  initNavHeader();
  initTopMenu();
  initServicesGallery();
  initResponses();
  initClientsGallery();
  initFaq();
}

printAppInfo();

window.addEventListener('load', initPage);
