import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';

const HEADER_HEIGHT = 70;
const ERR_MSG = 'WE ARE UNABLE TO PROVIDE YOU LOGIN FUNCTIONALITY AT THIS TIME';

function LoginComponentError() {
  return (
    <>
      <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
      <Grid container m={2} direction="row" justifyContent="space-between">
        <Grid item xs={4}></Grid>
        <Grid
          item
          xs={4}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            m={2}
            data-testid="devHomeDesc"
            variant="h4"
            component="div"
          >
            Unable to get remote
          </Typography>
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={2}></Grid>
        <Grid
          item
          xs={8}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography data-testid="errorMessage" variant="h5" component="div">
            {ERR_MSG}
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}

export default LoginComponentError;