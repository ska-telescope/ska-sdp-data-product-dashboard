import React from 'react';
import { Box, Card, CardContent, CardHeader, Modal, TextField } from '@mui/material';
import { Button } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import SaveDataAnnotationCard from '@components/SaveDataAnnotationCard/SaveDataAnnotationCard';

function DataAnnotationComponent(data: any, userPrincipalName: string = '') {
  const { t } = useTranslation('dpd');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box m={1}>
      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <SaveDataAnnotationCard userPrincipalName={userPrincipalName} dataAnnotation={data.data} />
      </Modal>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardHeader
          title={t('label.lastModified') + `: ${data.data.timestamp_modified}`}
          action={
            <Button label={t('button.view')} testId="viewDataAnnotation" onClick={handleOpen} />
          }
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
