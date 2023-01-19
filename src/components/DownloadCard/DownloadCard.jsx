import * as React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { onDownloadClick } from '../../services/DataProduct/DataProductDownload';

// Moved the onDownloadClick to DataProductDownload as it is easier to test. 

export default function DownloadCard(selectedFileNames) {
  const { fileName } = selectedFileNames
  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Selected file:
          </Typography>
          <Typography variant="h5" component="div">
            {fileName} 
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="secondary" onClick={() => onDownloadClick(selectedFileNames)}>
            <DownloadIcon />
            Download
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
