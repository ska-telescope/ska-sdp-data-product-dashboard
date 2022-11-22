import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import { onDownloadClick } from '../../services/DataProduct/DataProductDownload';

// Moved the onDownloadClick to DataProductDownload as it is easier to test. 


export default function DownloadCard(selectedFileNames) {
  const { fileName } = selectedFileNames
  return (
    <Card sx={{ minWidth: 275 }}>
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
  );
}
