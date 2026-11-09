import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { Alert, Progress, AlertColorTypes } from '@ska-telescope/ska-gui-components';

const DataProductsTable = (
  updating: boolean,
  apiRunning: boolean,
  dataproductDataGrid: React.JSX.Element,
  indexingProgress?: any
) => {
  const { t } = useTranslation('dpd');

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
