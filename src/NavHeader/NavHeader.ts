import { TSocialId, socialIds } from '../core/constants/socialIds';

import { blockNavHeader } from '../variables';

const BLOCK = blockNavHeader;

import './NavHeader.styles.scss';

export function initNavHeader() {
  const selectorSocialsWrapper = `.uc-NavHeader ${BLOCK}__adress-container .t-descr`;
  const selectorSocials = `${selectorSocialsWrapper} a`;
  const wrapper = document.querySelector(selectorSocialsWrapper);
  const items = document.querySelectorAll(selectorSocials);
  if (wrapper) {
    wrapper.classList.toggle('SocialIcons', true);
  }
  items.forEach((item) => {
    const content = item.textContent;
    const id = content.startsWith('#') && (content.substring(1) as TSocialId);
    const isValid = id && socialIds.includes(id);
    if (isValid) {
      item.classList.toggle('SocialIcon', true);
      item.id = id;
      item.setAttribute('target', '_blank');
      item.innerHTML = '';
    }
  });
}
