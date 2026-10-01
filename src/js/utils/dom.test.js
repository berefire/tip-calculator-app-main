// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addSafeListener, initDOM } from './dom.js';

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

const fullHTML = `
  <input id="bill" />
  <input id="people" />
  <div class="group-buttons">
    <input type="radio" name="tip" value="5" />
    <input type="radio" name="tip" value="10" />
  </div>
  <input id="tip-custom" />
  <button class="reset-btn">Reset</button>
  <div id="results-announcer"></div>
`;

describe('initDOM', () => {
  beforeEach(() => {
    document.body.innerHTML = fullHTML;
  });

  it('does not throw when all elements exist', () => {
    expect(() => initDOM()).not.toThrow();
  });

  it('throws when the tip radios are missing', () => {
    document.querySelectorAll('input[name="tip"]').forEach((el) => el.remove());

    expect(() => initDOM()).toThrow('Missing DOM element: tipRadios');
  });

  it('throws when the bill input is missing', () => {
    document.querySelector('#bill').remove();

    expect(() => initDOM()).toThrow('Missing DOM element: bill');
  });
});