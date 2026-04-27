import { state, setState } from './state.js';
import { calculateTip } from './calculator.js';
import { validatePeople, validateBill } from './validation.js';
import { updateResults, showError, clearError, announceResults } from './ui.js';
import { sanitizeNumber, enforceMaxValue, limitLength } from './utils/number.js';
import { VALIDATION_LIMITS } from './config/limits.js';

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
  announcer: document.getElementById('results-announcer'),
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
  let error= '';

  if (name === 'people') {
    error = validatePeople(value);
  }

  if (name === 'bill') {
    error = validateBill(value);
  }

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
  announceResults(DOM.announcer, `$${tipAmount.toFixed(2)}`, `$${total.toFixed(2)}`);
}

/* =========================
   EVENT HANDLERS
========================= */


function handleInputChange(e) {
  const { name, value } = e.target;

  const numericValue = Number(value);

  if (!validateField(name, numericValue, e.target)) {
    setState({ [name]: 0 });
    render();
    return;
  }

  const sanitizedValue = sanitizeNumber(numericValue);

  setState({ [name]: sanitizedValue });
  render();
}

function handleTipChange(e) {
  if (e.target.name !== 'tip') return;

  DOM.customTip.value = '';

  const raw = e.target.value;
  const parsed = raw === '0' ? 0 : Number(raw);

  setState({
    tip: sanitizeNumber(parsed),
    customTip: 0,
  });

  render();
}

function handleCustomTip(e) {
  const value = sanitizeNumber(e.target.value);

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

 clearError(DOM.bill);
 clearError(DOM.people);

  updateResetButton();
}

/* =========================
   INIT
========================= */
export function initEvents() {
  DOM.bill.addEventListener('input', (e) => {
    enforceMaxValue(e, VALIDATION_LIMITS.BILL_AMOUNT.MAX_INPUT);
    limitLength(e, VALIDATION_LIMITS.BILL_AMOUNT.MAX_LENGTH);
    handleInputChange(e);
  });

  DOM.people.addEventListener('input', (e) => {
    enforceMaxValue(e, VALIDATION_LIMITS.PEOPLE_NUMBER.MAX_INPUT);
    limitLength(e, VALIDATION_LIMITS.PEOPLE_NUMBER.MAX_LENGTH);
    handleInputChange(e);
  });

  DOM.tipContainer.addEventListener('change', handleTipChange);
  DOM.customTip.addEventListener('input', (e) => {
    enforceMaxValue(e, VALIDATION_LIMITS.CUSTOM_TIP.MAX_INPUT);
    limitLength(e, VALIDATION_LIMITS.CUSTOM_TIP.MAX_LENGTH);
    handleCustomTip(e);
  });

  DOM.resetBtn.addEventListener('click', handleReset);

  updateResetButton();
}