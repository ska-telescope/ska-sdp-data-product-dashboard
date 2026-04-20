const mockMuiDataGridConfig = {
  columns: [
    {
      field: 'id',
      hide: true,
      type: 'string',
      filterable: false
    },
    {
      field: 'execution_block',
      headerName: 'Execution Block',
      width: 250,
      hide: false,
      type: 'string',
      filterable: true
    },
    {
      field: 'date_created',
      headerName: 'Date Created',
      width: 150,
      hide: false,
      type: 'date',
      filterable: true
    },
    {
      field: 'context.observer',
      headerName: 'Observer',
      width: 150,
      hide: false,
      type: 'string',
      filterable: true
    },
    {
      field: 'config.processing_block',
      headerName: 'Processing Block',
      width: 250,
      hide: false,
      type: 'string',
      filterable: true
    },
    {
      field: 'context.intent',
      headerName: 'Intent',
      width: 300,
      hide: false,
      type: 'string',
      filterable: true
    },
    {
      field: 'context.notes',
      headerName: 'Notes',
      width: 500,
      hide: false,
      type: 'string',
      filterable: true
    },
    {
      field: 'size',
      headerName: 'File Size',
      width: 80,
      hide: false,
      type: 'number',
      filterable: true
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      hide: false,
      type: 'string',
      filterable: true
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
