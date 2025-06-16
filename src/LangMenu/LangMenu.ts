import './LangMenu.styles.scss';

const langSynonyms: Record<string, string> = {
  en: 'gb',
  russian: 'ru',
  english: 'gb',
  chinese: 'ch',
  русский: 'ru',
};

function processLangLinks(langMenuNode: HTMLElement) {
  const links = langMenuNode.querySelectorAll('a');
  links.forEach((item) => {
    let lang = item.innerText.toLowerCase();
    if (langSynonyms[lang]) {
      lang = langSynonyms[lang];
    }
    const iconNode = document.createElement('i');
    iconNode.classList.add('icon', 'fi', `fi-${lang}`);
    item.prepend(iconNode);
  });
}

export function initLangMenu() {
  const langMenuRoot = document.querySelector<HTMLElement>('.uc-LangMenu');
  const langMenuNode = langMenuRoot?.querySelector<HTMLElement>('.t228__right_langs');
  if (!langMenuNode) {
    return;
  }
  langMenuNode.classList.add('LangMenu');
  processLangLinks(langMenuNode);
  const footerTarget = document.querySelector('.uc-Footer .t977__col_left');
  const navHeaderTarget = document.querySelector('.uc-NavHeader .SubMenu');
  if (footerTarget) {
    footerTarget.appendChild(langMenuNode.cloneNode(true));
  }
  if (navHeaderTarget) {
    navHeaderTarget.appendChild(langMenuNode.cloneNode(true));
  }
  // Remove original menu in the end
  if (/* !isDev && */ langMenuRoot) {
    langMenuRoot.remove();
  }
}
