import React from 'react';
import { useTranslation } from 'react-i18next';
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

function generateSections(metaData) {
  return Object.keys(metaData.metaData).map((sectionTitle) =>
    metaData?.metaData[sectionTitle] && sectionDisplay(sectionTitle, metaData?.metaData[sectionTitle])
  );
}

const MetaDataComponent = (metaData) => {  
  const { t } = useTranslation();
  
  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4" component="div">{t('label.metaData')}</Typography>
          {generateSections(metaData)}
        </CardContent>
      </Card>
    </Box>
  );
}

export default MetaDataComponent 
