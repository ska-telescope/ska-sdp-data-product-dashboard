import React, { useEffect, useState } from 'react';
import SearchOption, {
  EMPTY_SEARCH_SELECTION,
  isSearchSelectionValid
} from '@components/SearchComponent/SearchOption';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

import Chip from '@mui/material/Chip';
import type { SearchBoxProps, SearchFilter } from 'types/search/search';
import { SEARCH_BOX } from 'src/utils/constants';

const DRAFT_DEBOUNCE_MS = 300;

const SearchBox = ({
  availableColumns,
  formFields,
  setFormFields,
  onDraftChange
}: SearchBoxProps) => {
  const { t } = useTranslation('dpd');
  const { t: tColumns } = useTranslation('humanreadable');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchSelection, setSearchSelection] = useState(EMPTY_SEARCH_SELECTION);

  // Apply the in-progress search as the user types, before it is added as a chip
  useEffect(() => {
    const draft = isSearchSelectionValid(availableColumns, searchSelection)
      ? searchSelection
      : null;
    const timer = setTimeout(() => onDraftChange(draft), DRAFT_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [availableColumns, searchSelection, onDraftChange]);

  const removeField = (opt: SearchFilter) => {
    setFormFields(formFields.filter((o) => o.id !== opt.id));
    setSearchSelection({ field: opt.field, operator: opt.operator, value: opt.value });
    setIsDropdownOpen(true);
  };
  const deleteField = (opt: SearchFilter) => {
    setFormFields(formFields.filter((o) => o.id !== opt.id));
  };

  const renderSelectedOptions = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px' }}>
      <SearchIcon />
      {formFields.map((opt, index) => (
        <Chip
          key={opt.id}
          id={`search-option-${index}`}
          label={`${tColumns(opt.field)}  ${t(opt.operator)}  ${opt.value}`}
          onClick={() => removeField(opt)}
          onDelete={() => deleteField(opt)}
          variant="outlined"
          data-testid={`search-option-${index}`}
        />
      ))}
    </div>
  );

  return (
    <>
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          cursor: 'pointer',
          minHeight: `${SEARCH_BOX}px`,
          padding: '6px',
          border: '2px solid #e1e8ed',
          borderRadius: '8px',
          fontSize: '14px',
          background: 'white',
          position: 'relative',
          zIndex: 1000
        }}
        data-testid="search-bar"
      >
        {renderSelectedOptions()}
      </div>

      {isDropdownOpen && (
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: 'white',
            border: '2px solid #0000001f'
          }}
        >
          <SearchOption
            availableColumns={availableColumns}
            formFields={formFields}
            setFormFields={setFormFields}
            searchSelection={searchSelection}
            setSearchSelection={setSearchSelection}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        </div>
      )}
    </>
  );
};

export default SearchBox;
