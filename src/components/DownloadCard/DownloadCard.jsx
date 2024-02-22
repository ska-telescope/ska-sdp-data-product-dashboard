import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, DataTree } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import streamSaver from "streamsaver";
import { SKA_SDP_DATAPRODUCT_API_URL } from "../../utils/constants";


function DownloadCard(selectedFileNames, metaData) {
  const URL_DOWNLOAD = '/download';
  const apiUrl = SKA_SDP_DATAPRODUCT_API_URL;
  const { t } = useTranslation('dpd');
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
    body: JSON.stringify(selectedFileNames)
  };

  // handle the click event of the button
  const handleClick = async () => {
    try {
      // make a request to the endpoint with the file object
      const response = await fetch(`${apiUrl}${URL_DOWNLOAD}`,options);
      // create a write stream using streamSaver library
      const fileStream = streamSaver.createWriteStream(selectedFileNames.relativePathName + ".tar");
      const readableStream = response.body;

      // pipe the stream
      if (window.WritableStream && readableStream.pipeTo) {
        await readableStream.pipeTo(fileStream);
      } else {
        // fallback
        // declare writer here
        const writer = fileStream.getWriter();
        const reader = response.body.getReader();
        const pump = () =>
          reader.read().then((res) =>
            res.done ? writer.close() : writer.write(res.value).then(pump)
          );
        pump();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {selectedFileNames?.relativePathName !== '' && 
      <Box m={1}>
        <Card variant="outlined">
          <CardContent>
            <Typography data-testid={"metaDataDescription"}  sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              {t('prompt.selectedProduct')}
            </Typography>
            <Typography variant="subtitle2" component="div">
              Execution Block ID: {selectedFileNames.fileName} 
            </Typography>
            <Button
              color="secondary"
              icon={<DownloadIcon />}
              label={t('button.download')}
              onClick={handleClick}
              testId="downloadButton"
              toolTip="Download the selected data product. This will stream the selected data product to a tar file in your default downloads directory."
              variant="outlined"
            />        
          {metaData && <DataTree data={metaData} height="500" />}
          </CardContent>
        </Card>
      </Box>
    }
    </>
  );
}

export default DownloadCard
