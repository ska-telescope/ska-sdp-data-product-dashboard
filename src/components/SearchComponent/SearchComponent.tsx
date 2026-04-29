import React, { useState } from 'react';
import SearchOption from '@components/SearchComponent/SearchOption';
import SearchIcon from '@mui/icons-material/Search';

import {
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Autocomplete,
  TextField
} from '@mui/material';

import { ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import Chip from '@mui/material/Chip';
import { Button, DateEntry, TextEntry, ButtonColorTypes } from '@ska-telescope/ska-gui-components';

const SearchBox = (t, tColumns, availableColumns, formFields, setFormFields) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchSelection, setSearchSelection] = useState({
    field: 'string',
    operator: '>',
    value: 'string'
  });

  const addOption = () => {};

  const removeField = (opt) => {
    setFormFields(formFields.filter((o) => o !== opt));
    setSearchSelection(opt);
    setIsDropdownOpen(true);
  };

  const renderSelectedOptions = () => (
    <div>
      {formFields.map((opt) => (
        <Chip
          key={`${opt.field}-${opt.operator}-${opt.value}`}
          id={`${opt.field}-${opt.operator}-${opt.value}`}
          label={`${opt.field}  ${opt.operator}  ${opt.value}`}
          onClick={() => removeField(opt)}
          variant="outlined"
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
      >
      <SearchIcon/>
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
