import * as React from 'react';
import { Box, Button, Card, CardActions, CardContent, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FetchDataProductList from "../../services/FetchDataProductList/FetchDataProductList"

const DownloadCard = () => {
  const [startDate, updateStartDate] = React.useState("2015-01-01");
  const [endDate, updateEndDate] = React.useState("2050-12-12");
  const [metadataKey, updateMetadataKey] = React.useState("execution_block");
  const [metadataValue, updateMetadataValue] = React.useState("eb-m001-20191031-12345");

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
                updateStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => {
                updateEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              required
              id="outlined-required"
              label="Key"
              defaultValue={metadataKey}
              onChange={(newValue) => {
                updateMetadataKey(newValue);
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Value"
              defaultValue={metadataValue}
              onChange={(newValue) => {
                updateMetadataValue(newValue);
              }}
            />      
          </LocalizationProvider>
  
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="secondary" onClick={() => FetchDataProductList(startDate, endDate, metadataKey, metadataValue)}>
            <SearchIcon />
            Search
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default DownloadCard