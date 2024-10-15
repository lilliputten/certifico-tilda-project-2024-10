import { htmlToNode } from '../core/helpers/html';
// import { blockResponses } from '../variables';

import './Responses.styles.scss';

function addTitle(rootNode: HTMLElement) {
  const content = '<div class="Title">Отзывы о работе с нами</div>';
  const node = htmlToNode(content);
  rootNode.prepend(node);
}

export function initResponses() {
  const rootNode = document.querySelector('.uc-Responses') as HTMLElement;
  console.log('[Responses:initResponses]', {
    rootNode,
  });
  addTitle(rootNode);
}
