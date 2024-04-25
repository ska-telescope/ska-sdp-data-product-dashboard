import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Button,
  DataTree,
  ButtonColorTypes,
  ButtonVariantTypes
} from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import streamSaver from 'streamsaver';
import { SKA_SDP_DATAPRODUCT_API_URL } from '@utils/constants';
import MetaData from '@services/MetaData/MetaData';

function DownloadCard(selectedFileNames: {
  fileName: any;
  relativePathName: any;
  metaDataFile?: string;
}) {
  const URL_DOWNLOAD = '/download';
  const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
  const { t } = useTranslation('dpd');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip'
    },
    body: JSON.stringify(selectedFileNames)
  };
  const [metaData, setMetaData] = React.useState({ data: [] });
  const [oldFilename] = React.useState(null);

  React.useEffect(() => {
    const metaDataFile = selectedFileNames?.metaDataFile;

    async function getMetaData() {
      if (metaDataFile) {
        const results = await MetaData(metaDataFile);
        setMetaData(results);
      }
    }

    if (metaDataFile && metaDataFile.length) {
      if (oldFilename !== metaDataFile) {
        getMetaData();
      }
    }
  }, [oldFilename, selectedFileNames]);

  const handleClick = async () => {
    try {
      // Make a request to the endpoint with the file object
      const response = await fetch(`${apiUrl}${URL_DOWNLOAD}`, options);

      // Create a write stream using streamSaver library
      const fileStream = streamSaver.createWriteStream(selectedFileNames.relativePathName + '.tar');

      const readableStream = response.body;

      // Pipe the stream
      if (window.WritableStream && readableStream?.pipeTo) {
        // Use the modern pipeTo method if available
        await readableStream.pipeTo(fileStream);
      } else {
        // Fallback for older browsers
        const writer = fileStream.getWriter();
        const reader = response?.body?.getReader();

        const pump = async () => {
          try {
            const { value, done } = await reader?.read();
            if (done) {
              writer.close();
            } else {
              await writer.write(value);
              await pump();
            }
          } catch (error) {
            console.error('Error while streaming:', error);
            writer.abort();
          }
        };

        await pump();
      }
    } catch (error) {
      console.error('Error fetching or streaming data:', error);
    }
  };

  return (
    <>
      {selectedFileNames?.relativePathName !== '' && (
        <Box m={1}>
          <Card variant="outlined">
            <CardContent>
              <Typography
                data-testid={'metaDataDescription'}
                sx={{ fontSize: 16 }}
                color="text.secondary"
                gutterBottom
              >
                {t('prompt.selectedProduct')}
              </Typography>
              <Typography variant="subtitle2" component="div">
                Execution Block ID: {selectedFileNames.fileName}
              </Typography>
              <Button
                testId="downloadButton"
                color={ButtonColorTypes.Secondary}
                icon={<DownloadIcon />}
                label={t('button.download')}
                onClick={handleClick}
                toolTip="Download the selected data product. This will stream the selected data product to a tar file in your default downloads directory."
                variant={ButtonVariantTypes.Outlined}
              />
              {metaData && <DataTree testId="MetadataDataTree" data={metaData} height={500} />}
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}

export default DownloadCard;
