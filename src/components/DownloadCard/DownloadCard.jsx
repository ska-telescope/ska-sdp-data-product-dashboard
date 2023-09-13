import React from "react";
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, DataTree } from '@ska-telescope/ska-gui-components';
// import DownloadDataProduct from '../../services/DownloadDataProduct/DownloadDataProduct';
import { useTranslation } from 'react-i18next';
import streamSaver from "streamsaver";


function DownloadCard(selectedFileNames, metaData) {
  // use state to track the download progress
  const URL_DOWNLOAD = '/download';
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATAPRODUCT_API_URL;
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
          <Grid container direction="row" spacing={1} justifyContent="space-between">
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle2" component="div">
                {selectedFileNames.fileName} 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                  color="secondary"
                  icon={<DownloadIcon />}
                  label={t('button.download')}
                  onClick={handleClick}
                  testId="downloadButton"
                  toolTip=""
                  variant="outlined"
                />
            </Grid>
          </Grid>           
          {metaData && <DataTree data={metaData} height="500" />}
          </CardContent>
        </Card>
      </Box>
    }
    </>
  );
}

export default DownloadCard
