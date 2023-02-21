import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadDataProduct from '../../services/DownloadDataProduct/DownloadDataProduct';

const DownloadCard = (selectedFileNames) => {
  const { t } = useTranslation();
  const { fileName } = selectedFileNames;

  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {t('prompt.selectFile')}
          </Typography>
          <Typography variant="h5" component="div">
            {fileName} 
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
  );
}

export default DownloadCard