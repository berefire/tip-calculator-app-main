import { formatCurrency } from "./utils/number";

export function updateResults(tipAmount, total) {
  const tipEl = document.querySelector('#tip-amount');
  const totalEl = document.querySelector('#total');

  tipEl.textContent = formatCurrency(tipAmount);
  totalEl.textContent = formatCurrency(total);
}

export function showError(input, message) {
    const errorEl = document.getElementById(`${input.id}-error`);

    input.classList.add(`${input.id}__input--error`);
    if (errorEl) errorEl.textContent = message;
}

export function clearError(input) {
    const errorEl = document.getElementById(`${input.id}-error`);

    input.classList.remove(`${input.id}__input--error`);
    if (errorEl) errorEl.textContent = '';
}   