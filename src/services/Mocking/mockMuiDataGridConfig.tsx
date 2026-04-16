const STRING_OPERATORS = [
  { value: 'contains' },
  { value: 'doesNotContain' },
  { value: 'equals' },
  { value: 'doesNotEqual' },
  { value: 'startsWith' },
  { value: 'endsWith' },
  { value: 'isEmpty', requiresFilterValue: false },
  { value: 'isNotEmpty', requiresFilterValue: false },
  { value: 'isAnyOf' }
];

const NUMBER_OPERATORS = [
  { value: '=' },
  { value: '!=' },
  { value: '>' },
  { value: '>=' },
  { value: '<' },
  { value: '<=' },
  { value: 'isEmpty', requiresFilterValue: false },
  { value: 'isNotEmpty', requiresFilterValue: false }
];

const DATE_OPERATORS = [
  { value: 'is' },
  { value: 'not' },
  { value: 'after' },
  { value: 'onOrAfter' },
  { value: 'before' },
  { value: 'onOrBefore' },
  { value: 'isEmpty', requiresFilterValue: false },
  { value: 'isNotEmpty', requiresFilterValue: false }
];

const mockMuiDataGridConfig = {
  columns: [
    {
      field: 'id',
      hide: true,
      type: 'string',
      filterable: false,
      filterOperators: STRING_OPERATORS
    },
    {
      field: 'execution_block',
      headerName: 'Execution Block',
      width: 250,
      hide: false,
      type: 'string',
      filterable: true,
      filterOperators: STRING_OPERATORS
    },
    {
      field: 'date_created',
      headerName: 'Date Created',
      width: 150,
      hide: false,
      type: 'date',
      filterable: true,
      filterOperators: DATE_OPERATORS
    },
    {
      field: 'context.observer',
      headerName: 'Observer',
      width: 150,
      hide: false,
      type: 'string',
      filterable: true,
      filterOperators: STRING_OPERATORS
    },
    {
      field: 'config.processing_block',
      headerName: 'Processing Block',
      width: 250,
      hide: false,
      type: 'string',
      filterable: true,
      filterOperators: STRING_OPERATORS
    },
    {
      field: 'context.intent',
      headerName: 'Intent',
      width: 300,
      hide: false,
      type: 'string',
      filterable: true,
      filterOperators: STRING_OPERATORS
    },
    {
      field: 'context.notes',
      headerName: 'Notes',
      width: 500,
      hide: false,
      type: 'string',
      filterable: true,
      filterOperators: STRING_OPERATORS
    },
    {
      field: 'size',
      headerName: 'File Size',
      width: 80,
      hide: false,
      type: 'number',
      filterable: true,
      filterOperators: NUMBER_OPERATORS
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      hide: false,
      type: 'string',
      filterable: true,
      filterOperators: STRING_OPERATORS
    }
  ],
  columnsWithDefaultColDef: [
    {
      width: 100,
      minWidth: 50,
      maxWidth: null,
      hideable: true,
      sortable: true,
      resizable: true,
      filterable: true,
      groupable: true,
      pinnable: true,
      aggregable: true,
      editable: false,
      type: 'string',
      align: 'left',
      filterOperators: [
        {
          value: 'contains'
        },
        {
          value: 'equals'
        },
        {
          value: 'startsWith'
        },
        {
          value: 'endsWith'
        },
        {
          value: 'isEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isNotEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isAnyOf'
        }
      ],
      field: 'id',
      hide: true
    },
    {
      width: 250,
      minWidth: 50,
      maxWidth: null,
      hideable: true,
      sortable: true,
      resizable: true,
      filterable: true,
      groupable: true,
      pinnable: true,
      aggregable: true,
      editable: false,
      type: 'string',
      align: 'left',
      filterOperators: [
        {
          value: 'contains'
        },
        {
          value: 'equals'
        },
        {
          value: 'startsWith'
        },
        {
          value: 'endsWith'
        },
        {
          value: 'isEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isNotEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isAnyOf'
        }
      ],
      field: 'execution_block',
      headerName: 'execution_block',
      hide: false
    },
    {
      width: 150,
      minWidth: 50,
      maxWidth: null,
      hideable: true,
      sortable: true,
      resizable: true,
      filterable: true,
      groupable: true,
      pinnable: true,
      aggregable: true,
      editable: false,
      type: 'string',
      align: 'left',
      filterOperators: [
        {
          value: 'contains'
        },
        {
          value: 'equals'
        },
        {
          value: 'startsWith'
        },
        {
          value: 'endsWith'
        },
        {
          value: 'isEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isNotEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isAnyOf'
        }
      ],
      field: 'date_created',
      headerName: 'date_created',
      hide: false
    },
    {
      width: 150,
      minWidth: 50,
      maxWidth: null,
      hideable: true,
      sortable: true,
      resizable: true,
      filterable: true,
      groupable: true,
      pinnable: true,
      aggregable: true,
      editable: false,
      type: 'string',
      align: 'left',
      filterOperators: [
        {
          value: 'contains'
        },
        {
          value: 'equals'
        },
        {
          value: 'startsWith'
        },
        {
          value: 'endsWith'
        },
        {
          value: 'isEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isNotEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isAnyOf'
        }
      ],
      field: 'context.observer',
      headerName: 'observer',
      hide: false
    },
    {
      width: 250,
      minWidth: 50,
      maxWidth: null,
      hideable: true,
      sortable: true,
      resizable: true,
      filterable: true,
      groupable: true,
      pinnable: true,
      aggregable: true,
      editable: false,
      type: 'string',
      align: 'left',
      filterOperators: [
        {
          value: 'contains'
        },
        {
          value: 'equals'
        },
        {
          value: 'startsWith'
        },
        {
          value: 'endsWith'
        },
        {
          value: 'isEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isNotEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isAnyOf'
        }
      ],
      field: 'config.processing_block',
      headerName: 'processing_block',
      hide: false
    },
    {
      width: 300,
      minWidth: 50,
      maxWidth: null,
      hideable: true,
      sortable: true,
      resizable: true,
      filterable: true,
      groupable: true,
      pinnable: true,
      aggregable: true,
      editable: false,
      type: 'string',
      align: 'left',
      filterOperators: [
        {
          value: 'contains'
        },
        {
          value: 'equals'
        },
        {
          value: 'startsWith'
        },
        {
          value: 'endsWith'
        },
        {
          value: 'isEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isNotEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isAnyOf'
        }
      ],
      field: 'context.intent',
      headerName: 'Intent',
      hide: false
    },
    {
      width: 500,
      minWidth: 50,
      maxWidth: null,
      hideable: true,
      sortable: true,
      resizable: true,
      filterable: true,
      groupable: true,
      pinnable: true,
      aggregable: true,
      editable: false,
      type: 'string',
      align: 'left',
      filterOperators: [
        {
          value: 'contains'
        },
        {
          value: 'equals'
        },
        {
          value: 'startsWith'
        },
        {
          value: 'endsWith'
        },
        {
          value: 'isEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isNotEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isAnyOf'
        }
      ],
      field: 'context.notes',
      headerName: 'notes',
      hide: false
    },
    {
      width: 80,
      minWidth: 50,
      maxWidth: null,
      hideable: true,
      sortable: true,
      resizable: true,
      filterable: true,
      groupable: true,
      pinnable: true,
      aggregable: true,
      editable: false,
      type: 'string',
      align: 'left',
      filterOperators: [
        {
          value: 'contains'
        },
        {
          value: 'equals'
        },
        {
          value: 'startsWith'
        },
        {
          value: 'endsWith'
        },
        {
          value: 'isEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isNotEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isAnyOf'
        }
      ],
      field: 'size',
      headerName: 'file_size',
      hide: false
    },
    {
      width: 80,
      minWidth: 50,
      maxWidth: null,
      hideable: true,
      sortable: true,
      resizable: true,
      filterable: true,
      groupable: true,
      pinnable: true,
      aggregable: true,
      editable: false,
      type: 'string',
      align: 'left',
      filterOperators: [
        {
          value: 'contains'
        },
        {
          value: 'equals'
        },
        {
          value: 'startsWith'
        },
        {
          value: 'endsWith'
        },
        {
          value: 'isEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isNotEmpty',
          requiresFilterValue: false
        },
        {
          value: 'isAnyOf'
        }
      ],
      field: 'status',
      headerName: 'status',
      hide: false
    }
  ],
  initialState: {
    columns: {
      columnVisibilityModel: {
        id: false
      }
    }
  }
};

export default mockMuiDataGridConfig;
