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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default function DataProductDashboard() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Available data products:
          </Typography>
          <Demo>
            <List dense>
              {generate(
                <ListItem
                  /* eslint-disable react/jsx-wrap-multilines */
                  secondaryAction={
                    <IconButton edge="end" aria-label="download">
                      <DownloadIcon />
                    </IconButton>
                  }
                >
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Single-line item" />
                </ListItem>
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}
