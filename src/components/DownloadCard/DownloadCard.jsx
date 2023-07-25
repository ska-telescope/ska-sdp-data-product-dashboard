import * as React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadDataProduct from '../../services/DownloadDataProduct/DownloadDataProduct';
import { useTranslation } from 'react-i18next';

const DownloadCard = (selectedFileNames) => {
  const { t } = useTranslation('dpd');
  
  return (
    <>
    {selectedFileNames?.relativePathName !== '' && 
      <Box m={1}>
        <Card variant="outlined" sx={{ minWidth: 275 }}>
          <CardContent data-testid={"selectedFileDetails"}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {t('label.selectFile')}
            </Typography>
            <Typography variant="h5" component="div">
              {selectedFileNames.fileName} 
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="secondary" onClick={() => DownloadDataProduct(selectedFileNames)}>
              <DownloadIcon />
              {t('button.download')}
            </Button>
          </CardActions>
        </Card>
      </Box>
    }
    </>
  );
}

export default DownloadCard
