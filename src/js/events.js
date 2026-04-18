import { state, setState } from './state.js';
import { calculateTip } from './calculator.js';
import { updateResults } from './ui.js';
import { validatePeople } from './validation.js';
import { showError, clearError } from './ui.js';

/* =========================
   DOM CACHE (evita queries repetidos)
========================= */
const DOM = {
  bill: document.querySelector('#bill'),
  people: document.querySelector('#people'),
  customTip: document.querySelector('#tip-custom'),
  tipRadios: document.querySelectorAll('input[name="tip"]'),
  tipContainer: document.querySelector('.group-buttons'),
  resetBtn: document.querySelector('.reset-btn'),
};

/* =========================
   HELPERS (single responsibility)
========================= */
function hasUserInput() {
  const { bill, people, tip, customTip } = state;

  return Boolean(
    bill > 0 ||
    people > 0 ||
    tip > 0 ||
    customTip > 0
  );
}

function updateResetButton() {
  DOM.resetBtn.disabled = !hasUserInput();
}

function getNumericValue(value) {
  return Number(value) || 0;
}

function getTipValue() {
  return state.customTip || state.tip;
}

function resetTipSelection() {
  DOM.tipRadios.forEach(radio => (radio.checked = false));
}

function clearInputs() {
  DOM.bill.value = '';
  DOM.people.value = '';
  DOM.customTip.value = '';
}

function resetState() {
  setState({
    bill: 0,
    tip: 0,
    people: 0,
    customTip: 0,
  });
}

/* =========================
   VALIDATION LAYER
========================= */
function validateField(name, value, element) {
  if (name !== 'people') return true;

  const error = validatePeople(value);

  if (error) {
    showError(element, error);
    return false;
  }

  clearError(element);
  return true;
}

/* =========================
   RENDER (single source of truth)
========================= */
function render() {
  const { bill, people } = state;
  const tipValue = getTipValue();

  updateResetButton();
  
  if (!bill || !people || !tipValue) {
    updateResults(0, 0);
    return;
  }

  const { tipAmount, total } = calculateTip(bill, tipValue, people);
  updateResults(tipAmount, total);
}

/* =========================
   EVENT HANDLERS
========================= */


function handleInputChange(e) {
  const { name, value } = e.target;
  const numericValue = getNumericValue(value);

  if (!validateField(name, numericValue, e.target)) return;

  setState({ [name]: numericValue });
  render();
}

function handleTipChange(e) {
  if (e.target.name !== 'tip') return;

  DOM.customTip.value = '';

  setState({
    tip: getNumericValue(e.target.value),
    customTip: 0,
  });

  render();
}

function handleCustomTip(e) {
  const value = getNumericValue(e.target.value);

  resetTipSelection();

  setState({
    customTip: value,
    tip: 0,
  });

  render();
}

function handleReset() {
  resetState();
  clearInputs();
  updateResults(0, 0);

  resetTipSelection();

  document.querySelector('#people-error').textContent = '';
  document.querySelector('#people').classList.remove('people__input--error');

  updateResetButton(); // 👈 importante
}

/* =========================
   INIT
========================= */
export function initEvents() {
  DOM.bill.addEventListener('input', handleInputChange);
  DOM.people.addEventListener('input', handleInputChange);

  DOM.tipContainer.addEventListener('change', handleTipChange);
  DOM.customTip.addEventListener('input', handleCustomTip);

  DOM.resetBtn.addEventListener('click', handleReset);

  updateResetButton();
}