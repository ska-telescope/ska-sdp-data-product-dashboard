import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import { DataTree } from '@ska-telescope/ska-gui-components';

const MetaDataComponent = (metaData) => {  

  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minHeight: "100%", minWidth: 275 }}>
        <CardContent>
          <DataTree data={metaData} height="500" />
        </CardContent>
      </Card>
    </Box>
  );
}

export default MetaDataComponent 
