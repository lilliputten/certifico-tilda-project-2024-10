import { blockTopMenu, blockNavHeader } from '../variables';

import './TopMenu.styles.scss';

export function initTopMenu() {
  // Find and move menu to the nav header...
  const menuSelector = `.uc-TopMenu ${blockTopMenu}__maincontainer`;
  const navHeaderWrapperSelector = `.uc-NavHeader ${blockNavHeader}`;
  const menuNode = document.querySelector(menuSelector);
  const navHeaderWrapperNode = document.querySelector(navHeaderWrapperSelector);
  // Clone menu node...
  const menuNodeCopy = menuNode.cloneNode(true) as Element;
  // Clean styles...
  menuNodeCopy.removeAttribute('style');
  menuNodeCopy.classList.toggle('SubMenu', true);
  // Add menu node copy to the hav header...
  navHeaderWrapperNode.append(menuNodeCopy);
  /* console.log('[TopMenu:initTopMenu]', {
   *   menuNodeCopy,
   *   menuNode,
   *   navHeaderWrapperNode,
   * });
   */
}
