// import { TSocialId, socialIds } from 'src/core/constants/socialIds';
import { TSocialId, socialIds } from '../core/constants/socialIds';

// import tgIcon from '../../assets/social-icons/tg.svg';

const BLOCK = '.t821';

export function initNavHeader() {
  const selectorSocialsWrapper = `.uc-NavHeader ${BLOCK}__adress-container .t-descr`;
  const selectorSocials = `${selectorSocialsWrapper} a`;
  const wrapper = document.querySelector(selectorSocialsWrapper);
  const items = document.querySelectorAll(selectorSocials);
  console.log('[NavHeader:initNavHeader]', {
    items,
    // tgIcon,
    // nodeNavHeader,
  });
  if (wrapper) {
    wrapper.classList.toggle('SocialIcons', true);
  }
  items.forEach((item) => {
    const content = item.textContent;
    const id = content.startsWith('#') && (content.substring(1) as TSocialId);
    const isValid = id && socialIds.includes(id);
    console.log('[NavHeader:initNavHeader:forEach]', {
      isValid,
      id,
      content,
      item,
      items,
    });
    if (isValid) {
      item.classList.toggle('SocialIcon', true);
      item.id = id;
      item.setAttribute('target', '_blank');
      item.innerHTML = '';
    }
  });
}
