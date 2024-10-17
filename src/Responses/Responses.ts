import { htmlToNode } from '../core/helpers/html';

import './Responses.styles.scss';

function addTitle(rootNode: HTMLElement) {
  const content = '<div class="Title">Отзывы о работе с нами</div>';
  const node = htmlToNode(content);
  rootNode.prepend(node);
}

export function initResponses() {
  const rootNode = document.querySelector('.uc-Responses') as HTMLElement;
  if (rootNode) {
    addTitle(rootNode);
  }
}
