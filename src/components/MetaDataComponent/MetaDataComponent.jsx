import React from 'react';
// import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent } from '@mui/material';
import { JSONView } from '@ska-telescope/ska-gui-components';
import { DATA_STORE_BOX_HEIGHT, FOOTER_HEIGHT, HEADER_HEIGHT } from '../../utils/constants';

/* TODO : Confirm that DataGrid component is OK, and this function can be removed 

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

/* TODO : Confirm that DataGrid component is OK, and this function can be removed 

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
*/

const MetaDataComponent = (metaData) => {  
//  const { t } = useTranslation('dpd');

  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minHeight: "100%", minWidth: 275 }}>
        <CardContent>
          <JSONView data={metaData} height="500" />
        </CardContent>
      </Card>
    </Box>
  );
}

export default MetaDataComponent 
