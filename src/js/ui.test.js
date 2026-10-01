// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { updateResults, showError, clearError, announceResults, hasErrors } from './ui.js';
import { state, setState } from './state.js';

beforeEach(() => {
  document.body.innerHTML = `
    <input id="bill" />
    <p id="bill-error"></p>
    <input id="people" />
    <p id="people-error"></p>
    <p id="tip-amount"></p>
    <p id="total"></p>
    <div id="results-announcer" aria-live="polite"></div>
  `;
  setState({ errors: { bill: '', people: '' } }); // or resetState() if you added it
});

describe('updateResults', () => {
  it('shows the values formatted as currency', () => {
    updateResults(5, 55);

    expect(document.querySelector('#tip-amount').textContent).toBe('$5.00');
    expect(document.querySelector('#total').textContent).toBe('$55.00');
  });

  it('works with a custom container', () => {
    const container = document.createElement('div');
    container.innerHTML = '<p id="tip-amount"></p><p id="total"></p>';

    updateResults(1, 2, container);

    expect(container.querySelector('#tip-amount').textContent).toBe('$1.00');
    expect(container.querySelector('#total').textContent).toBe('$2.00');
  });

  it('throws when the result elements are missing', () => {
    document.body.innerHTML = '';

    expect(() => updateResults(1, 2)).toThrow('required elements');
  });
});

describe('showError', () => {
  it('marks the input as invalid and shows the message', () => {
    const input = document.querySelector('#people');

    showError(input, "Can't be zero");

    expect(input.classList.contains('people__input--error')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(document.querySelector('#people-error').textContent).toBe("Can't be zero");
    expect(state.errors.people).toBe("Can't be zero");
  });

  it('does not throw if the error element does not exist', () => {
    document.querySelector('#bill-error').remove();

    expect(() => showError(document.querySelector('#bill'), 'Invalid')).not.toThrow();
  });
});

describe('clearError', () => {
  it('removes the error from the input, the message and the state', () => {
    const input = document.querySelector('#people');
    showError(input, "Can't be zero");

    clearError(input);

    expect(input.classList.contains('people__input--error')).toBe(false);
    expect(input.getAttribute('aria-invalid')).toBe('false');
    expect(document.querySelector('#people-error').textContent).toBe('');
    expect(state.errors.people).toBe('');
  });
});

describe('announceResults', () => {
  it('writes the message for screen readers', () => {
    const announcer = document.querySelector('#results-announcer');

    announceResults(announcer, '$5.00', '$55.00');

    expect(announcer.textContent).toBe(
      'Tip amount per person: $5.00, Total per person: $55.00'
    );
  });
});

describe('hasErrors', () => {
  it('is true after showError and false after clearError', () => {
    const input = document.querySelector('#bill');

    showError(input, 'Invalid');
    expect(hasErrors()).toBe(true);

    clearError(input);
    expect(hasErrors()).toBe(false);
  });
});