import React from 'react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBox from '../../src/components/SearchComponent/SearchComponent';
import { isSearchSelectionValid } from '../../src/components/SearchComponent/SearchOption';

const DEBOUNCE_MS = 300;
const COLUMNS = [
  { field: 'name', type: 'string' },
  { field: 'size', type: 'number' }
];

// The shared GUI library cannot be loaded by vitest; stub the pieces the search form uses.
vi.mock('@ska-telescope/ska-gui-components', () => ({
  ButtonColorTypes: { Secondary: 'secondary' },
  ButtonVariantTypes: { Outlined: 'outlined' },
  DateEntry: () => null,
  TextEntry: ({ value, setValue }) => (
    <input data-testid="textEntry-value" value={value} onChange={(e) => setValue(e.target.value)} />
  ),
  Button: ({ testId, disabled, onClick }) => (
    <button data-testid={testId} disabled={disabled} onClick={onClick} />
  )
}));

describe('isSearchSelectionValid', () => {
  it.each([
    ['the empty selection', { field: '', operator: '', value: '' }, false],
    ['an unknown field', { field: 'string', operator: 'contains', value: 'x' }, false],
    ['a missing value', { field: 'name', operator: 'contains', value: '' }, false],
    ['an operator needing no value', { field: 'name', operator: 'isEmpty', value: '' }, true],
    ['a complete selection', { field: 'name', operator: 'contains', value: 'abc' }, true]
  ])('%s', (_label, selection, expected) => {
    expect(isSearchSelectionValid(COLUMNS, selection)).toBe(expected);
  });
});

describe('SearchBox', () => {
  const onDraftChange = vi.fn();
  const setFormFields = vi.fn();

  const openAndSelectKey = () => {
    render(
      <SearchBox
        t={(k: string) => k}
        tColumns={(k: string) => k}
        availableColumns={COLUMNS}
        formFields={[]}
        setFormFields={setFormFields}
        onDraftChange={onDraftChange}
      />
    );
    fireEvent.click(screen.getByTestId('search-bar'));
    const keyInput = screen.getByTestId('textEntry-Key');
    fireEvent.focus(keyInput);
    fireEvent.keyDown(keyInput, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText('name'));
  };

  const type = (value: string) =>
    fireEvent.change(screen.getByTestId('textEntry-value'), { target: { value } });

  beforeEach(() => {
    vi.useFakeTimers();
    onDraftChange.mockReset();
    setFormFields.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('publishes the typed search as a draft after the debounce', () => {
    openAndSelectKey();
    type('abc');

    act(() => {
      vi.advanceTimersByTime(DEBOUNCE_MS - 1);
    });
    expect(onDraftChange).not.toHaveBeenCalledWith(expect.objectContaining({ value: 'abc' }));

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(onDraftChange).toHaveBeenLastCalledWith({
      field: 'name',
      operator: 'contains',
      value: 'abc'
    });
  });

  it('publishes no draft while the value is empty and disables Add', () => {
    openAndSelectKey();

    act(() => {
      vi.advanceTimersByTime(DEBOUNCE_MS);
    });
    expect(onDraftChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByTestId('AddKeyValuePairButton')).toBeDisabled();
  });

  it('adds the search as a chip when Enter is pressed in the value field', () => {
    openAndSelectKey();
    type('abc');
    fireEvent.keyDown(screen.getByTestId('textEntry-value'), { key: 'Enter' });

    expect(setFormFields).toHaveBeenCalledWith([
      { id: expect.any(String), field: 'name', operator: 'contains', value: 'abc' }
    ]);
  });

  describe('chips', () => {
    const duplicates = [
      { id: 'a', field: 'name', operator: 'contains', value: 'abc' },
      { id: 'b', field: 'name', operator: 'contains', value: 'abc' }
    ];
    const renderChips = () =>
      render(
        <SearchBox
          t={(k: string) => k}
          tColumns={(k: string) => k}
          availableColumns={COLUMNS}
          formFields={duplicates}
          setFormFields={setFormFields}
          onDraftChange={onDraftChange}
        />
      );

    it('removes only the chip whose id matches, even when another is identical', () => {
      renderChips();
      const chip = screen.getByTestId('search-option-0');
      fireEvent.click(chip.querySelector('.MuiChip-deleteIcon') as Element);

      expect(setFormFields).toHaveBeenCalledWith([duplicates[1]]);
    });

    it('loads a clicked chip back into the form for editing', () => {
      renderChips();
      fireEvent.click(screen.getByTestId('search-option-1'));

      expect(setFormFields).toHaveBeenCalledWith([duplicates[0]]);
      expect(screen.getByTestId('textEntry-value')).toHaveValue('abc');
    });
  });
});
