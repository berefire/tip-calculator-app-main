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

function assertElement(element, context) {
    if (!element) {
        throw new Error(`Expected element for ${context}, but got ${element}`);
    }
}

export function addSafeListener(element, event, handler){
    assertElement(element, `addSafeListener ("${event}")`);
    element.addEventListener(event, handler);
}