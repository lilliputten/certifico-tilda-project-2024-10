import './ConfirmForm.styles.scss';

const initialChecked = true;

/* // DEBUG
 * let __count = 0;
 */

export function processForm(formNode: HTMLFormElement) {
  const wrapper = formNode.closest<HTMLDivElement>('.t698__mainwrapper, .t702__wrapper');
  const buttonNode = wrapper?.querySelector<HTMLButtonElement>('button[type="submit"]');
  const textNode = wrapper?.querySelector<HTMLDivElement>(
    '.t698__form-bottom-text, .t702__form-bottom-text',
  );
  if (!textNode || !buttonNode) {
    // eslint-disable-next-line no-console
    console.error('[ConfirmForm:processForm] Cannot find text and button nodes for a form.', {
      formNode,
      wrapper,
      buttonNode,
      textNode,
    });
    debugger; // eslint-disable-line no-debugger
  }
  const checkboxNode = document.createElement('input');
  checkboxNode.setAttribute('type', 'checkbox');
  if (initialChecked) {
    checkboxNode.setAttribute('checked', 'true');
  } else {
    buttonNode.classList.toggle('disabled', true);
  }
  checkboxNode.addEventListener('change', () => {
    const checked = checkboxNode.checked;
    buttonNode.classList.toggle('disabled', !checked);
  });
  textNode.prepend(checkboxNode);
  /* // DEBUG
   * __count++;
   * console.log('[ConfirmForm:processForm]', __count, {
   *   checkboxNode,
   *   textNode,
   *   wrapper,
   *   formNode,
   *   buttonNode,
   * });
   */
}

export function initConfirmForms() {
  const forms = document.querySelectorAll<HTMLFormElement>('form[role="form"]');
  forms.forEach(processForm);
}
