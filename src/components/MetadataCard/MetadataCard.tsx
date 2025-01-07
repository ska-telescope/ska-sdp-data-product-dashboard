import * as React from 'react';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { DataTree } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import { shellSize, FILTERCARDHEIGHT } from '@utils/constants';
import getMetaData from '@services/GetMetaData/GetMetaData';

function MetadataCard(selectedDataProduct: {
  execution_block: any;
  relativePathName: any;
  metaDataFile: any;
  uuid: any;
}) {
  const { t } = useTranslation('dpd');

  const [metaData, setMetaData] = React.useState({ data: [] });
  const [oldFilename] = React.useState(null);
  const [cardHeight, setCardHeight] = React.useState(
    window.innerHeight - shellSize() - FILTERCARDHEIGHT
  );

  React.useEffect(() => {
    const metaDataFile = selectedDataProduct?.uuid;

    async function loadMetaData() {
      if (metaDataFile) {
        const results = await getMetaData(metaDataFile);
        setMetaData(results);
      }
    }

    if (metaDataFile && metaDataFile.length) {
      if (oldFilename !== metaDataFile) {
        loadMetaData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataProduct?.uuid]);

  React.useEffect(() => {
    function handleResize() {
      setCardHeight(window.innerHeight - shellSize() - FILTERCARDHEIGHT);
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      {selectedDataProduct?.relativePathName !== '' && (
        <Box m={1}>
          <Card variant="outlined" sx={{ maxHeight: cardHeight }}>
            <CardHeader title="Meta Data Tree"/>
            <CardContent>
              {metaData && (
                <DataTree
                  testId="MetadataDataTree"
                  data={metaData}
                  height={cardHeight - 130}
                  maxWidth={1000}
                />
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}

export default MetadataCard;
