import './LangMenu.styles.scss';

export function initLangMenu() {
  // To remove this in the end
  const langMenuRoot = document.querySelector('.uc-LangMenu');
  const langMenuNode = langMenuRoot?.querySelector('.t228__right_langs');
  if (!langMenuNode) {
    return;
  }
  langMenuNode.classList.add('LangMenu');
  const footerTarget = document.querySelector('.uc-Footer .t977__col_left');
  const navHeaderTarget = document.querySelector('.uc-NavHeader .SubMenu');
  console.log('[LangMenu:initLangMenu]', {
    footerTarget,
    navHeaderTarget,
    langMenuNode,
    langMenuRoot,
  });
  if (footerTarget) {
    footerTarget.appendChild(langMenuNode.cloneNode(true));
  }
  if (navHeaderTarget) {
    navHeaderTarget.appendChild(langMenuNode.cloneNode(true));
  }
  if (langMenuRoot) {
    langMenuRoot.remove();
  }
}
