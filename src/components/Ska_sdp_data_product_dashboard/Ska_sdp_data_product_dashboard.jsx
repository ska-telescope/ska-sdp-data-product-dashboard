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

const DataProductDashboard = () => {
  const [filelist, setFilelist] = React.useState([]);
  let fileUrl = 'http://localhost:8000/download/Chicken.jpg'

  function onDownload(fileName) {
    var a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
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
        setFilelist(data.Filelist);
      });
  }

  if (filelist.length === 0) {
    fetchfilelist();
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Available data products:
          </Typography>
          <List dense>
            {filelist.map((file, key) => {
              return (
                <ListItem
                  key={key}
                  secondaryAction={
                    <IconButton edge="end" aria-label="download" onClick={onDownload({file})}>
                      <DownloadIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary={file} />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataProductDashboard;
