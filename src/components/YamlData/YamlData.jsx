import * as React from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

export default function YamlData(metaData) {  
  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4" component="div">*.yaml Data</Typography>
          <Divider />
          <Typography variant="h6" component="div">interface</Typography>
          <Typography variant="body2" component="div">{metaData.interface}</Typography>
          <Divider />
          <Typography variant="h6" component="div">execution_block</Typography>
          <Typography variant="body2" component="div">{metaData.execution_block}</Typography>
          <Divider />
          <Typography variant="h6" component="div">context</Typography>
          <Typography variant="body2" component="div">{JSON.stringify(metaData.context)}</Typography>
          <Divider />
          <Typography variant="h6" component="div">config</Typography>
          <Typography variant="body2" component="div">{JSON.stringify(metaData.config)}</Typography>
          <Divider />
          <Typography variant="h6" component="div">files</Typography>
          <Typography variant="body2" component="div">{JSON.stringify(metaData.files)}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
