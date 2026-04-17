import {
  getGridStringOperators,
  getGridNumericOperators,
  getGridDateOperators,
  GridFilterOperator
} from '@mui/x-data-grid';

/**
 * Returns the full MUI GridFilterOperator objects for a given column type.
 *
 * These objects carry `InputComponent` and all other MUI machinery, so they
 * can be passed directly to a DataGrid column's `filterOperators` prop.
 *
 * @param type - The MUI column type string (e.g. `"string"`, `"number"`, `"date"`).
 */
export function getMuiOperatorsForType(type?: string): GridFilterOperator[] {
  if (type === 'number') return getGridNumericOperators();
  if (type === 'date' || type === 'dateTime') return getGridDateOperators();
  return getGridStringOperators();
}

/**
 * A lightweight operator descriptor used by the custom search panel.
 * Contains only the fields the search panel actually reads.
 */
export interface SearchOperator {
  value: string;
  requiresFilterValue?: boolean;
}

/**
 * Returns lightweight operator descriptors for a given column type.
 *
 * Derived directly from MUI's built-in operators so the search panel always
 * shows the same operator set as the DataGrid column filter for the same type.
 *
 * @param type - The MUI column type string (e.g. `"string"`, `"number"`, `"date"`).
 */
export function getSearchOperatorsForType(type?: string): SearchOperator[] {
  return getMuiOperatorsForType(type).map((op) => ({
    value: op.value,
    ...(op.requiresFilterValue === false ? { requiresFilterValue: false as const } : {})
  }));
}
