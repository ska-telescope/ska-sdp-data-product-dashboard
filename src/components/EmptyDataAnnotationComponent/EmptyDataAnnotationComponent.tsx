import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function EmptyDataAnnotationComponent(message: any) {
  const { t } = useTranslation('dpd');

  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minHeight: '100%', minWidth: 275 }}>
        <CardContent>
          <Typography align="center">
            {message.message ? message.message : t('annotations.noAnnotations')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default EmptyDataAnnotationComponent;
