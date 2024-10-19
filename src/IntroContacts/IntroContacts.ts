import './IntroContacts.styles.scss';

export function initIntroContacts() {
  const textSelector = '.uc-Intro-Contacts .t-text';
  const textNode = document.querySelectorAll(`${textSelector} a, ${textSelector} strong`);
  if (!textNode) {
    return;
  }
  textNode.forEach((node) => {
    const text = node.innerHTML;
    if (!text.startsWith('#')) {
      return;
    }
    const match = text.match(/^#(.+?):\s*(.*)$/);
    if (!match) {
      return;
    }
    node.classList.toggle('ContactsItem', true);
    node.innerHTML = `<span class="SocialIcon" id=${match[1]}></span>${match[2]}`;
  });
}
