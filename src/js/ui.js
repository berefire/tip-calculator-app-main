export function updateResults(tipAmount, total) {
  const tipEl = document.querySelector('#tip-amount');
  const totalEl = document.querySelector('#total');

  tipEl.textContent = `$${tipAmount.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

export function showError(input, message) {
    const errorEl = document.getElementById(`${input.id}-error`);

    input.classList.add('people__input--error');
    errorEl.textContent = message;
}

export function clearError(input) {
    const errorEl = document.getElementById(`${input.id}-error`);

    input.classList.remove('people__input--error');
    errorEl.textContent = '';
}   