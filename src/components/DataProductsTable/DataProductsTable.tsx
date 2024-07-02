import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { Alert, Progress, AlertColorTypes } from '@ska-telescope/ska-gui-components';
import GetLayout from '@services/GetLayout/GetLayout';

// Derive the type for each object in `extendedColumns`
type ExtendedColumn = {
  field: string;
  headerName: string;
  width: number;
};

type ColumnVisibilityModel = {
  [columnName: string]: boolean;
};

const DataProductsTable = (
  jsonDataProducts: never[],
  updating: boolean,
  apiRunning: boolean,
  dataproductDataGrid: React.JSX.Element
) => {
  const { t } = useTranslation('dpd');
  const [columnInfo, setColumnInfo] = React.useState([]);
  const ignore_columns_names = ['dataproduct_file', 'metadata_file'];

  async function fetchTableLayout() {
    try {
      const layout = await GetLayout();
      if (layout?.data && layout?.data.length > 0) {
        setColumnInfo(layout.data);
      } else {
        // Handle the case when layout is undefined
        console.error('Layout data is undefined');
      }
    } catch (error) {
      // Handle API fetch error
      console.error('Error fetching layout data:', error);
    }
  }

  React.useEffect(() => {
    fetchTableLayout();
  }, []);

  // Create Header name from column_name
  const headerText = (key: string) => {
    const tmp = key?.split('.');
    const lowerCaseKey = tmp[tmp?.length - 1]?.toLowerCase(); // Convert key to lowercase
    return t(lowerCaseKey, { ns: 'ivoa' });
  };

  // Create the array of column names and html from /layout call
  const extendedColumns: ExtendedColumn[] = [];
  const columnVisibilityModel: ColumnVisibilityModel = {};

  if (columnInfo !== undefined) {
    for (const column of columnInfo) {
      extendedColumns.push({
        field: column['name'],
        headerName: headerText(column['name']),
        width: column['width']
      });
    }
  }

  const haveData = () => {
    return typeof jsonDataProducts === 'object' && jsonDataProducts?.length > 0;
  };

  if (haveData()) {
    for (const dataproduct in jsonDataProducts) {
      for (const key of Object.keys(jsonDataProducts[dataproduct])) {
        // skip keys in ignore_column_names
        if (ignore_columns_names.includes(key)) {
          continue;
        }
        // skip keys already in columns
        else if (extendedColumns.map((a) => a.headerName).includes(headerText(key))) {
          const index = extendedColumns.findIndex((object) => {
            return object.headerName === headerText(key);
          });
          extendedColumns[index]['field'] = key;
        } else {
          // add new column to extendedColumns
          extendedColumns.push({
            field: key,
            headerName: headerText(key),
            width: 200
          });
          columnVisibilityModel[key] = false;
        }
      }
    }
  }

  function RenderInfo(value: number, msg: string) {
    return (
      <Box m={1} sx={{ height: '43vh', width: '100%' }}>
        <Grid
          data-testid={'apiAvailability'}
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          {value === 2 && <Progress testId={'RenderInfoProgress'} />}
          <Box mt={2}>
            <Alert testId={''} color={AlertColorTypes.Error}>
              <>{t(msg)}</>
            </Alert>
          </Box>
        </Grid>
      </Box>
    );
  }

  function RenderData() {
    return <>{dataproductDataGrid}</>;
  }

  return (
    <>
      {apiRunning && updating && RenderInfo(2, 'info.fetching')}
      {!apiRunning && RenderInfo(1, 'error.API_NOT_AVAILABLE')}
      {apiRunning && !updating && !haveData() && RenderInfo(1, 'error.API_NO_DATA')}
      {apiRunning && !updating && haveData() && RenderData()}
    </>
  );
};

export default DataProductsTable;
