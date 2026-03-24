import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { Alert, Progress, AlertColorTypes } from '@ska-telescope/ska-gui-components';

// Derive the type for each object in `extendedColumns`
type ExtendedColumn = {
  field: string;
  headerName: string;
  width: number;
};

const DataProductsTable = (
  updating: boolean,
  apiRunning: boolean,
  dataproductDataGrid: React.JSX.Element,
  indexingProgress?: any
) => {
  const { t } = useTranslation('dpd');
  const [columnInfo, setColumnInfo] = React.useState([]);

  // Create Header name from column_name
  const headerText = (key: string) => {
    const tmp = key?.split('.');
    const lowerCaseKey = tmp[tmp?.length - 1]?.toLowerCase(); // Convert key to lowercase
    return t(lowerCaseKey, { ns: 'ivoa' });
  };

  // Create the array of column names and html from /layout call
  const extendedColumns: ExtendedColumn[] = [];

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
      {!apiRunning && RenderInfo(1, 'error.API_NOT_AVAILABLE')}
      {apiRunning && RenderData()}
    </>
  );
};

export default DataProductsTable;
