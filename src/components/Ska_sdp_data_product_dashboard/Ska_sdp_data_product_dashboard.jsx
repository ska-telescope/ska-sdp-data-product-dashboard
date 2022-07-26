import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DownloadIcon from '@mui/icons-material/Download';
// import { DownloadIcon, FolderIcon } from '@mui/icons-material';

const result = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL

const DataProductDashboard = () => {
  const [fileList, setFilelist] = React.useState([]);

  async function onDownload(fileName) {
    const a = document.createElement('a');
    a.href = `http://localhost:8000/download/${fileName.file}`;
    a.setAttribute('download', fileName);
    a.click();
  }

  async function fetchfilelist() {
    fetch('http://localhost:8000/filelist', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setFilelist(data.filelist);
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
