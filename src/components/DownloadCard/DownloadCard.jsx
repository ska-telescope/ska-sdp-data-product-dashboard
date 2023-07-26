import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Button, DataTree } from '@ska-telescope/ska-gui-components';
import DownloadDataProduct from '../../services/DownloadDataProduct/DownloadDataProduct';
import { useTranslation } from 'react-i18next';

const DownloadCard = (selectedFileNames, metaData) => {
  const { t } = useTranslation('dpd');
  
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
                  onClick={() => DownloadDataProduct(selectedFileNames)}
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
