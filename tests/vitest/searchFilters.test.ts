import { describe, it, expect } from 'vitest';
import { createSearchFilter, toSearchPanelItem } from '../../src/utils/searchFilters';

const SELECTION = { field: 'name', operator: 'contains', value: 'abc' };

describe('searchFilters', () => {
  it('gives identical selections distinct ids', () => {
    expect(createSearchFilter(SELECTION).id).not.toBe(createSearchFilter(SELECTION).id);
  });

  it('strips the id when building a backend item', () => {
    expect(toSearchPanelItem(createSearchFilter(SELECTION))).toEqual(SELECTION);
  });
});
