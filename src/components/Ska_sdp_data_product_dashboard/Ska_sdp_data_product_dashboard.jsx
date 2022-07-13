import * as React from 'react';
import { styled } from '@mui/material/styles';
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

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

const DataProductDashboard = () => {
  const [filelist, setFilelist] = React.useState([]);

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
          <Demo>
            <List dense>
              {filelist.map(file => {
                return (
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="download">
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
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataProductDashboard;
