export const DOM = {
  get bill() {
    return document.querySelector('#bill');
  },

  get people() {
    return document.querySelector('#people');
  },

  get customTip() {
    return document.querySelector('#tip-custom');
  },

  get tipRadios() {
    return document.querySelectorAll('input[name="tip"]');
  },

  get tipContainer() {
    return document.querySelector('.group-buttons');
  },

  get resetBtn() {
    return document.querySelector('.reset-btn');
  },

  get announcer() {
    return document.getElementById('results-announcer');
  },
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

export function initDOM() {
  Object.entries(DOM).forEach(([key, element]) => {
    if (!element) {
      throw new Error(
        `Missing DOM element: ${key}`
      );
    }
  });
}