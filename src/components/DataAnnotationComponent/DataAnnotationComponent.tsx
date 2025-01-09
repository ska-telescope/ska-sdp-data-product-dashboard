import React from 'react';
import { Box, Card, CardContent, CardHeader, TextField } from '@mui/material';
import { Button } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';

function DataAnnotationComponent(data: any) {
  const { t } = useTranslation('dpd');
  return (
    <Box m={1}>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardHeader
          title={t('label.lastModified') + `: ${data.data.timestamp_modified}`}
          action={<Button label={t('button.view')} testId="viewDataAnnotation" />}
          titleTypographyProps={{ variant: 'subtitle1' }}
        />
        <CardContent>
          <TextField
            disabled
            multiline
            maxRows={4}
            fullWidth
            defaultValue={data.data.annotation_text}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default DataAnnotationComponent;
