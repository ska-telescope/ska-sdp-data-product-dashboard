import React, { useState } from 'react';
import SearchOption from '@components/SearchComponent/SearchOption';
import SearchIcon from '@mui/icons-material/Search';

import Chip from '@mui/material/Chip';

const SearchBox = (t, tColumns, availableColumns, formFields, setFormFields) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchSelection, setSearchSelection] = useState({
    field: 'string',
    operator: '>',
    value: 'string'
  });

  const removeField = (opt) => {
    setFormFields(formFields.filter((o) => o !== opt));
    setSearchSelection(opt);
    setIsDropdownOpen(true);
  };
  const deleteField = (opt) => {
    setFormFields(formFields.filter((o) => o !== opt));
  };

  const renderSelectedOptions = () => (
    <div>
      <SearchIcon />
      {formFields.map((opt) => (
        <Chip
          key={`search-option-${formFields.indexOf(opt)}`}
          id={`search-option-${formFields.indexOf(opt)}`}
          label={`${tColumns(opt.field)}  ${t(opt.operator)}  ${opt.value}`}
          onClick={() => removeField(opt)}
          onDelete={() => deleteField(opt)}
          variant="outlined"
          data-testid={`search-option-${formFields.indexOf(opt)}`}
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
          minHeight: '60px',
          padding: '12px',
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
        <div>
          {SearchOption(
            t,
            tColumns,
            availableColumns,
            formFields,
            setFormFields,
            searchSelection,
            setSearchSelection,
            setIsDropdownOpen
          )}
        </div>
      )}
    </>
  );
};

export default SearchBox;
