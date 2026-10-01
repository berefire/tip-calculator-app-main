import { describe, it, expect, beforeEach } from 'vitest';
import { state, setState, setError, clearError, hasErrors } from './state.js';

// Runs before EVERY test, so each test starts with a clean state
beforeEach(() => {
  setState({
    bill: 0,
    tip: 0,
    customTip: 0,
    people: 0,
    errors: { bill: '', people: '' },
  });
});

describe('setState', () => {
  it('updates one field and keeps the others', () => {
    setState({ bill: 100 });

    expect(state.bill).toBe(100);
    expect(state.tip).toBe(0);
    expect(state.people).toBe(0);
  });

  it('updates several fields at once', () => {
    setState({ bill: 50, tip: 15, people: 2 });

    expect(state).toMatchObject({ bill: 50, tip: 15, people: 2 });
  });
});

describe('errors', () => {
  it('starts with no errors', () => {
    expect(hasErrors()).toBe(false);
  });

  it('setError stores the message for a field', () => {
    setError('people', "Can't be zero");

    expect(state.errors.people).toBe("Can't be zero");
    expect(hasErrors()).toBe(true);
  });

  it('clearError removes the message', () => {
    setError('bill', 'Enter a valid number');
    clearError('bill');

    expect(state.errors.bill).toBe('');
    expect(hasErrors()).toBe(false);
  });

  it('hasErrors is true if only one field has an error', () => {
    setError('bill', 'Enter a valid number');

    expect(hasErrors()).toBe(true);
  });
});