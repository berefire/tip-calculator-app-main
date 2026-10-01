import { describe, it, expect, vi } from 'vitest';
import { addSafeListener } from './dom.js';

describe('addSafeListener', () => {
  it('adds the listener to the element', () => {
    const element = { addEventListener: vi.fn() };
    const handler = () => {};

    addSafeListener(element, 'click', handler);

    expect(element.addEventListener).toHaveBeenCalledWith('click', handler);
  });

  it('throws when the element is missing', () => {
    expect(() => addSafeListener(null, 'click', () => {}))
      .toThrow('Expected element for addSafeListener ("click")');
  });
});