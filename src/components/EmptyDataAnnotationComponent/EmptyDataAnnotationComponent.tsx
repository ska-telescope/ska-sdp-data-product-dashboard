import React from 'react';
import { Box, Card, CardContent, Typography} from '@mui/material';

const EmptyDataAnnotationComponent = () => {
    return (
        <Box m={1}>
            <Card variant="outlined" sx={{ minHeight: '100%', minWidth: 275 }}>
                <CardContent>
                    <Typography align="center">
                        No Data Annotations found for this Data Product
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EmptyDataAnnotationComponent;
