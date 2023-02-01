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

const MetaDataComponent = (metaData) => {  
  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4" component="div">Meta Data</Typography>
          {metaData?.metaData?.interface && sectionDisplay('interface', metaData?.metaData?.interface)}
          {metaData?.metaData?.execution_block && sectionDisplay('execution_block', metaData?.metaData?.execution_block)}
          {metaData?.metaData?.context && sectionDisplay('context', metaData?.metaData?.context)}
          {metaData?.metaData?.config && sectionDisplay('config', metaData?.metaData?.config)}
          {metaData?.metaData?.files && sectionDisplay('files', metaData?.metaData?.files)}
        </CardContent>
      </Card>
    </Box>
  );
}

export default MetaDataComponent 