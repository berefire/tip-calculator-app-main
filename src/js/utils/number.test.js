import { describe, it, expect } from 'vitest';
import { sanitizeNumber, formatCurrency, enforceMaxValue, limitLength } from './number.js';

describe('sanitizeNumber', () => {
  it.each([
    [10, 10],
    ['12.346', 12.35],   // rounds up to 2 decimals
    [12.344, 12.34],     // rounds down
  ])('sanitizeNumber(%s) → %s', (input, expected) => {
    expect(sanitizeNumber(input)).toBe(expected);
  });

  it.each(['abc', undefined, NaN, Infinity, -5, '', null])(
    'returns 0 for %s',
    (input) => {
      expect(sanitizeNumber(input)).toBe(0);
    }
  );
});

describe('formatCurrency', () => {
  it.each([
    [0, '$0.00'],
    [4.27, '$4.27'],
    [32.7865, '$32.79'],
    [1234.5, '$1,234.50'],
  ])('formatCurrency(%s) → %s', (input, expected) => {
    expect(formatCurrency(input)).toBe(expected);
  });
});

describe('enforceMaxValue', () => {
  it('replaces a value above the max with the max', () => {
    const event = { target: { value: '150' } };
    enforceMaxValue(event, 100);
    expect(event.target.value).toBe('100');
  });

  it('keeps a value at or below the max', () => {
    const event = { target: { value: '100' } };
    enforceMaxValue(event, 100);
    expect(event.target.value).toBe('100');
  });
});

describe('limitLength', () => {
  it('cuts the value to maxLength', () => {
    const event = { target: { value: '123456' } };
    limitLength(event, 4);
    expect(event.target.value).toBe('1234');
  });

  it('keeps a short value unchanged', () => {
    const event = { target: { value: '12' } };
    limitLength(event, 4);
    expect(event.target.value).toBe('12');
  });
});