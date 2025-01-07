import React from 'react';
import { Box, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { Button } from '@ska-telescope/ska-gui-components';

const DataAnnotationComponent = (data: any) => {
    return (
        <Box m={1}>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardHeader title={`Last Modified: ${data.data.timestamp_modified}`} action={<Button label='View' testId='viewDataAnnotation'/>} titleTypographyProps={{variant:'subtitle1'}}/>
                <CardContent >
                   <TextField disabled multiline maxRows={4} fullWidth defaultValue={data.data.annotation_text}/>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DataAnnotationComponent;
