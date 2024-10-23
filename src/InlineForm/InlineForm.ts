import './InlineForm.styles.scss';

export function initInlineForm() {
  const wrapperNode = document.querySelector('.uc-InlineForm .t698__mainwrapper');
  // Find ANY socials icons block to copy
  const socialIconsNode = document.querySelector('.SocialIcons');
  if (wrapperNode && socialIconsNode) {
    const clonedNode = socialIconsNode.cloneNode(true) as HTMLElement;
    clonedNode.setAttribute('data-animate-style', 'fadeinup');
    clonedNode.setAttribute('data-animate-group', 'yes');
    clonedNode.setAttribute('data-animate-order', '1');
    clonedNode.classList.toggle('t-animate', true);
    wrapperNode.append(clonedNode);
  }
}
