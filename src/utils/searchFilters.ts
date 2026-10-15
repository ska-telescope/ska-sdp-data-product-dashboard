import type { SearchFilter, SearchSelection } from 'types/search/search';

const FILTER_ID_PREFIX = 'search-filter-';
let nextFilterId = 0;

/** Wraps a selection as a chip filter with a unique, stable id. */
export const createSearchFilter = (selection: SearchSelection): SearchFilter => ({
  ...selection,
  id: `${FILTER_ID_PREFIX}${nextFilterId++}`
});

/** Strips the chip id so only the fields the backend expects are sent. */
export const toSearchPanelItem = ({
  field,
  operator,
  value
}: SearchSelection): SearchSelection => ({
  field,
  operator,
  value
});
