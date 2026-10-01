import { setError, clearError as clearStateError } from './state.js';
export { hasErrors } from './state.js';
import { formatCurrency } from "./utils/number";

export function updateResults(tipAmount, total, container = document) {
  const tipEl = container.querySelector('#tip-amount');
  const totalEl = container.querySelector('#total');

  if (!tipEl || !totalEl) {
    // Throwing an error can surface issues during development/test runs
    throw new Error('updateResults: required elements (#tip-amount, #total) not found in container');
  }


  tipEl.textContent = formatCurrency(tipAmount);
  totalEl.textContent = formatCurrency(total);
}

export function showError(input, message) {
    const id = input.id;
    const errorEl = document.getElementById(`${id}-error`);

    setError(id, message);

    input.classList.add(`${id}__input--error`);
    input.setAttribute('aria-invalid', 'true');
    if (errorEl) errorEl.textContent = message;
}

export function clearError(input) {
    const id = input.id;
    const errorEl = document.getElementById(`${id}-error`);

    clearStateError(input.id);

    input.classList.remove(`${id}__input--error`);
    input.setAttribute('aria-invalid', 'false');
    if (errorEl) errorEl.textContent = '';
}   

export function announceResults(element, tipAmount, total) {
    element.textContent = `Tip amount per person: ${tipAmount}, Total per person: ${total}`;
}