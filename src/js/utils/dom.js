/* =========================
   DOM CACHE
========================= */
export const DOM = {
  bill: document.querySelector('#bill'),
  people: document.querySelector('#people'),
  customTip: document.querySelector('#tip-custom'),
  tipRadios: document.querySelectorAll('input[name="tip"]'),
  tipContainer: document.querySelector('.group-buttons'),
  resetBtn: document.querySelector('.reset-btn'),
  announcer: document.getElementById('results-announcer'),
};

export function addSafeListener(element, event, handler){
    if (!element) return;

    element.addEventListener(event, handler);
}