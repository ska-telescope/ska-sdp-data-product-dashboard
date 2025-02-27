import * as React from 'react';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { DataTree } from '@ska-telescope/ska-gui-components';
import { shellSize, FILTERCARDHEIGHT } from '@utils/constants';
import getMetaData from '@services/GetMetaData/GetMetaData';
import { useTranslation } from 'react-i18next';
import { SelectedDataProduct } from 'types/dataproducts/dataproducts';

function MetadataCard(selectedDataProduct: SelectedDataProduct) {
  const [metaData, setMetaData] = React.useState({ data: [] });
  const [oldFilename] = React.useState(null);
  const [cardHeight, setCardHeight] = React.useState(
    window.innerHeight - shellSize() - FILTERCARDHEIGHT
  );
  const { t } = useTranslation('dpd');

  React.useEffect(() => {
    const metaDataFile = selectedDataProduct?.uid;

    async function loadMetaData() {
      if (metaDataFile) {
        const results = await getMetaData(selectedDataProduct);
        setMetaData(results);
      }
    }

    if (metaDataFile && metaDataFile.length) {
      if (oldFilename !== metaDataFile) {
        loadMetaData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataProduct?.uid]);

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
  }, []);

  return (
    <>
      {selectedDataProduct?.relativePathName !== '' && (
        <Box m={1}>
          <Card variant="outlined" sx={{ maxHeight: cardHeight }}>
            <CardHeader title={t('label.metaData')} />
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
