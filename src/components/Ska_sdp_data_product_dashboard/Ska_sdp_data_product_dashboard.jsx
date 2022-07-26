import React from 'react';

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Grid,
  Typography
} from '@mui/material';

import FolderIcon from '@mui/icons-material/Folder';
import DownloadIcon from '@mui/icons-material/Download';

// import { DownloadIcon, FolderIcon } from '@mui/icons-material';

const DataProductDashboard = () => {
  const [fileList, setFileList] = React.useState([]);

  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const apiPort = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_PORT;

  async function onDownload(fileName) {
    const a = document.createElement('a');
    a.href = `${apiUrl}:${apiPort}/download/${fileName.file}`;
    a.setAttribute('download', fileName);
    a.click();
  }

  async function fetchfilelist() {
    fetch(`${apiUrl}:${apiPort}/filelist`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setFileList(data.filelist);
      });
  }

  if (fileList.length === 0) {
    fetchfilelist();
  }

  const secondAction = file => (
    <IconButton
      edge="end"
      aria-label="download"
      onClick={() => {
        onDownload({ file });
      }}
    >
      <DownloadIcon />
    </IconButton>
  );

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Available data products:
          </Typography>
          <List dense>
            {fileList.map((filename, id) => (
              <ListItem key={filename.id} secondaryAction={secondAction(filename.filename)}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText key={id.id} primary={filename.filename} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataProductDashboard;
