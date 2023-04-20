import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

function sectionDisplay(title, data) {  
  const isString = typeof data === 'string';
  return (
    <div key={title}>
      {data && <>
        <Divider />
        <Typography variant="h6" component="div">{title}</Typography>
        {isString && <Typography variant="body2" component="div">{data}</Typography>}
        {!isString && <Typography variant="body2" component="div">{JSON.stringify(data)}</Typography>}
      </>}
    </div>
  );
}

function generateSections(metaData) {
  const sections = metaData?.metaData;

  // abort if metaData does not contain sections as expected
  if (typeof sections === "undefined"){
    return [];
  }

  return Object.keys(sections).map((sectionTitle) =>
    sections[sectionTitle] && sectionDisplay(sectionTitle, sections[sectionTitle])
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
