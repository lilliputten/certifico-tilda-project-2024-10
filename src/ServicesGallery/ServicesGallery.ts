import './ServicesGallery.styles.scss';

export function initServicesGallery() {
  const blockSelector = `.uc-ServicesGallery`;
  const cardSelector = `${blockSelector} .t-card__col`;
  const cardNodes = document.querySelectorAll(cardSelector);
  cardNodes.forEach((node: HTMLDivElement) => {
    const img = node.querySelector('img');
    // NOTE: Wait for changing of nested img src change and set to node's background and then remove the img itself
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const { attributeName, target } = mutation;
          const value = (target as Element).getAttribute(attributeName);
          if (attributeName === 'src') {
            node.style.backgroundImage = `url("${value}")`;
            img.remove();
          }
        }
      });
    });
    observer.observe(img, { attributes: true });
  });
}
