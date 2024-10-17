import { htmlToNode } from '../core/helpers/html';

import './Faq.styles.scss';

function addTitle(rootNode: HTMLElement) {
  const content = '<div class="Title">Вопросы и ответы</div>';
  const node = htmlToNode(content);
  rootNode.prepend(node);
}

export function initFaq() {
  const rootNode = document.querySelector('.uc-Faq') as HTMLElement;
  if (rootNode) {
    addTitle(rootNode);
  }
}
