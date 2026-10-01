import { describe, it, expect } from 'vitest';
import { validatePeople, validateBill } from './validation.js';
import { VALIDATION_LIMITS } from './config/limits.js';

const { MIN: PEOPLE_MIN, MAX_VALIDATION: PEOPLE_MAX } = VALIDATION_LIMITS.PEOPLE_NUMBER;
const { MIN: BILL_MIN, MAX_VALIDATION: BILL_MAX } = VALIDATION_LIMITS.BILL_AMOUNT;

describe('validatePeople', () => {
  it.each([PEOPLE_MIN, PEOPLE_MAX, String(PEOPLE_MIN)])(
    'accepts %s',
    (value) => {
      expect(validatePeople(value)).toBe('');
    }
  );

  it.each([2.5, '1.5', 'abc', undefined])(
    'rejects %s as not an integer',
    (value) => {
      expect(validatePeople(value)).toBe('Must be an integer');
    }
  );

  it('rejects a value below the minimum', () => {
    expect(validatePeople(PEOPLE_MIN - 1)).toBe(`Minimum is ${PEOPLE_MIN} person`);
  });

  it('rejects a value above the maximum', () => {
    expect(validatePeople(PEOPLE_MAX + 1)).toBe(`Maximum is ${PEOPLE_MAX} people`);
  });
});

describe('validateBill', () => {
  it.each([BILL_MIN, BILL_MAX, '142.55'])(
    'accepts %s',
    (value) => {
      expect(validateBill(value)).toBe('');
    }
  );

  it.each(['abc', '12abc', undefined])(
    'rejects %s as not a number',
    (value) => {
      expect(validateBill(value)).toBe('Enter a valid number');
    }
  );

  it('rejects a value below the minimum', () => {
    expect(validateBill(BILL_MIN - 0.01)).toBe(`Amount must be at least ${BILL_MIN}`);
  });

  it('rejects a value above the maximum', () => {
    expect(validateBill(BILL_MAX + 0.01)).toBe(`Amount cannot exceed ${BILL_MAX}`);
  });

  it('rejects an empty string', () => {
     expect(validateBill('')).not.toBe('');
   });
});