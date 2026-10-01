import { addSafeListener, DOM } from './utils/dom.js';
import { state, setState, resetState, hasErrors } from './state.js';
import { calculateTip } from './calculator.js';
import { validatePeople, validateBill } from './validation.js';
import { updateResults, showError, clearError, announceResults } from './ui.js';
import { sanitizeNumber, formatCurrency, enforceMaxValue, limitLength } from './utils/number.js';
import { VALIDATION_LIMITS } from './config/limits.js';

/* =========================
   HELPERS (single responsibility)
========================= */
function hasUserInput() {
  const { bill, people, tip, customTip } = state;
  return bill > 0 || people > 0 || tip > 0 || customTip > 0;
}

function updateResetButton() {
  DOM.resetBtn.disabled = !hasUserInput();
}

function getTipValue() {
  return state.customTip || state.tip;
}

function resetTipSelection() {
  DOM.tipRadios.forEach((radio) => (radio.checked = false));
}

function clearInputs() {
  DOM.bill.value = '';
  DOM.people.value = '';
  DOM.customTip.value = '';
}

/* =========================
   VALIDATION LAYER
========================= */
function validateField(name, value, element) {
  let error = '';

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

  if (hasErrors() || !bill || !people || !tipValue) {
    updateResults(0, 0);
    return;
  }

  const { tipAmount, total } = calculateTip(bill, tipValue, people);

  updateResults(tipAmount, total);

  if (DOM.announcer) {
    announceResults(DOM.announcer, formatCurrency(tipAmount), formatCurrency(total));
  }
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

  setState({ [name]: sanitizeNumber(numericValue) });
  render();
}

function handleTipChange(e) {
  if (e.target.name !== 'tip') return;

  DOM.customTip.value = '';

  setState({
    tip: sanitizeNumber(Number(e.target.value)),
    customTip: 0,
  });

  render();
}

function handleCustomTip(e) {
  resetTipSelection();

  setState({
    customTip: sanitizeNumber(Number(e.target.value)),
    tip: 0,
  });

  render();
}

function handleReset() {
  resetState();
  clearInputs();
  resetTipSelection();
  clearError(DOM.bill);
  clearError(DOM.people);
  render();
}

/* =========================
   INIT
========================= */
export function initEvents() {
  const { bill, people, tipContainer, resetBtn, customTip } = DOM;

  addSafeListener(bill, 'input', (e) => {
    enforceMaxValue(e, VALIDATION_LIMITS.BILL_AMOUNT.MAX_INPUT);
    limitLength(e, VALIDATION_LIMITS.BILL_AMOUNT.MAX_LENGTH);
    handleInputChange(e);
  });

  addSafeListener(people, 'input', (e) => {
    enforceMaxValue(e, VALIDATION_LIMITS.PEOPLE_NUMBER.MAX_INPUT);
    limitLength(e, VALIDATION_LIMITS.PEOPLE_NUMBER.MAX_LENGTH);
    handleInputChange(e);
  });

  addSafeListener(tipContainer, 'change', handleTipChange);

  addSafeListener(customTip, 'input', (e) => {
    enforceMaxValue(e, VALIDATION_LIMITS.TIP_PERCENTAGE.MAX_INPUT);
    limitLength(e, VALIDATION_LIMITS.TIP_PERCENTAGE.MAX_LENGTH);
    handleCustomTip(e);
  });

  addSafeListener(resetBtn, 'click', handleReset);

  updateResetButton();
}