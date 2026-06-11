import { describe, it, expect } from 'vitest';

/**
 * Smoke test — verifies that the Vitest infrastructure is configured correctly.
 * No application logic is tested here.
 */
describe('vitest setup', () => {
  it('runs a basic assertion', () => {
    expect(1 + 1).toBe(2);
  });

  it('has access to the DOM via happy-dom', () => {
    const el = document.createElement('div');
    el.textContent = 'hello';
    expect(el.textContent).toBe('hello');
  });
});
