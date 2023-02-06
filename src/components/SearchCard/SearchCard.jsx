import * as React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadDataProduct from '../../services/DownloadDataProduct/DownloadDataProduct';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DownloadCard = () => {
  const [startDate, setStartDate] = React.useState("2015-01-01");
  const [endDate, setEndDate] = React.useState("2050-12-12");

  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Filter data products based on metadata:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              required
              id="outlined-required"
              label="Key"
              defaultValue="execution_block"
            />
            <TextField
              required
              id="outlined-required"
              label="Value"
              defaultValue="eb-m001-20191031-12345"
            />      
          </LocalizationProvider>
  
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="secondary" onClick={() => DownloadDataProduct()}>
            <SearchIcon />
            Search
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default DownloadCard