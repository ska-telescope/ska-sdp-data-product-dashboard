import type React from 'react';
import type { MuiColumnConfig } from '@components/DataGrid/GetMuiDataGridConfig';

/** The subset of a column definition the search form needs. */
export type SearchableColumn = Pick<MuiColumnConfig, 'field' | 'type'>;

/** The in-progress or submitted key / operator / value triple. */
export interface SearchSelection {
  field: string;
  operator: string;
  value: string;
}

/** A search chip: a selection with a stable identity. */
export interface SearchFilter extends SearchSelection {
  id: string;
}

export type SetSearchFilters = React.Dispatch<React.SetStateAction<SearchFilter[]>>;

export interface SearchBoxProps {
  availableColumns: SearchableColumn[];
  formFields: SearchFilter[];
  setFormFields: SetSearchFilters;
  onDraftChange: (draft: SearchSelection | null) => void;
}

export interface SearchOptionProps {
  availableColumns: SearchableColumn[];
  formFields: SearchFilter[];
  setFormFields: SetSearchFilters;
  searchSelection: SearchSelection;
  setSearchSelection: (selection: SearchSelection) => void;
  setIsDropdownOpen: (open: boolean) => void;
}
