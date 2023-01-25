import * as React from 'react';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

function sectionDisplay(title, data) {  
  const isString = typeof data === 'string';
  return (
    <>
      {data && <>
        <Divider />
        <Typography variant="h6" component="div">{title}</Typography>
        {isString && <Typography variant="body2" component="div">{data}</Typography>}
        {!isString && <Typography variant="body2" component="div">{JSON.stringify(data)}</Typography>}
      </>}
    </>
  );
}

export default function MetaDataComponent(metaData) {  
  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4" component="div">Meta Data</Typography>
          {metaData?.interface && sectionDisplay('interface', metaData?.interface)}
          {metaData?.execution_block && sectionDisplay('execution_block', metaData?.execution_block)}
          {metaData?.context && sectionDisplay('context', metaData?.context)}
          {metaData?.config && sectionDisplay('config', metaData?.config)}
          {metaData?.files && sectionDisplay('files', metaData?.files)}
        </CardContent>
      </Card>
    </Box>
  );
}
