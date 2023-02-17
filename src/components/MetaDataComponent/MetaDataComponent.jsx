import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

export const SECTIONS= [ 'interface', 'execution_block', 'context', 'config', 'files'];

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
  const { t } = useTranslation();
  
  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4" component="div">{t('label.metaData')}</Typography>
          {metaData?.metaData?.interface && sectionDisplay(SECTIONS[0], metaData?.metaData?.interface)}
          {metaData?.metaData?.execution_block && sectionDisplay(SECTIONS[1], metaData?.metaData?.execution_block)}
          {metaData?.metaData?.context && sectionDisplay(SECTIONS[2], metaData?.metaData?.context)}
          {metaData?.metaData?.config && sectionDisplay(SECTIONS[3], metaData?.metaData?.config)}
          {metaData?.metaData?.files && sectionDisplay(SECTIONS[4], metaData?.metaData?.files)}
        </CardContent>
      </Card>
    </Box>
  );
}

export default MetaDataComponent 