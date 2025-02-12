import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Box, Card, CardContent, CardHeader, Modal, TextField } from '@mui/material';
import { Button } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import SaveDataAnnotationCard from '@components/SaveDataAnnotationCard/SaveDataAnnotationCard';
import { DataAnnotation } from 'types/annotations/annotations';

function DataAnnotationComponent(props: DataAnnotation) {
  const {
    data_product_uuid,
    annotation_text,
    annotation_id,
    timestamp_modified,
    user_principal_name
  } = props;
  const { t } = useTranslation('dpd');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disableViewButton, setDisableViewButton] = React.useState(false);
  const { instance } = useMsal();
  const account = instance.getAllAccounts()[0];

  React.useEffect(() => {
    if (account?.username) {
      setDisableViewButton(false);
    } else {
      setDisableViewButton(true);
    }
  }, [account?.username]);

  return (
    <Box m={1}>
      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <SaveDataAnnotationCard
          user_principal_name={user_principal_name}
          annotation_text={annotation_text}
          data_product_uuid={data_product_uuid}
          annotation_id={annotation_id}
        />
      </Modal>
      <Card variant="outlined" sx={{ minWidth: 275 }}>
        <CardHeader
          title={t('label.lastModified') + `: ${timestamp_modified}`}
          action={
            <Button
              label={t('button.view')}
              testId="viewDataAnnotation"
              onClick={handleOpen}
              disabled={disableViewButton}
            />
          }
          titleTypographyProps={{ variant: 'subtitle1' }}
        />
        <CardContent>
          <TextField disabled multiline maxRows={4} fullWidth defaultValue={annotation_text} />
        </CardContent>
      </Card>
    </Box>
  );
}

export default DataAnnotationComponent;
