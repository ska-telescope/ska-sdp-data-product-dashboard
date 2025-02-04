import * as React from 'react';
import { Box, Card, CardContent, CardHeader, Modal, TextField, Typography } from '@mui/material';
import {
  Button,
  Alert,
  AlertColorTypes,
  AlertVariantTypes
} from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import saveDataAnnotations from '@services/SaveDataAnnotation/SaveDataAnnotation';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { DataAnnotation } from 'types/annotations/annotations';

const SaveDataAnnotationCard = (props: DataAnnotation) => {
  const { data_product_uuid, annotation_text, user_principal_name, annotation_id } = props;
  const { t } = useTranslation('dpd');
  const [saveEditButtonText, setSaveEditButtonText] = React.useState(t('button.save'));
  const [disableAnnotationTextEntryField, setDisableAnnotationTextEntryField] =
    React.useState(true);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);
  const [alertText, setAlertText] = React.useState('');
  const [alertColour, setAlertColour] = React.useState(AlertColorTypes.Success);
  const [standardText, setStandardText] = React.useState('');
  const { user } = storageObject.useStore();
  const token: string = user?.token ?? '';
  const [disableEditButton, setDisableEditButton] = React.useState(false);

  // TODO: This need to change to pull form session storage
  React.useEffect(() => {
    if (user) {
      setDisableEditButton(false);
    } else {
      setDisableEditButton(true);
    }
  }, [user, user_principal_name]);

  async function saveEditButtonClick() {
    if (saveEditButtonText === t('button.edit')) {
      setDisableAnnotationTextEntryField(false);
      setSaveEditButtonText(t('button.save'));
    } else {
      const annotationID = annotation_id ? annotation_id : null;
      if (standardText) {
        const result = await saveDataAnnotations(
          token,
          standardText,
          data_product_uuid,
          annotationID
        );
        setAlertText(result.data.message);
        if (!(result.status in [200, 201])) {
          setAlertColour(AlertColorTypes.Error);
          setAlertText(
            `${t('label.annotation.error')}: \n${t('label.statusCode')}: ${result.status}\n${t('label.annotation.errorMessage')}: ${result.data.message}`
          );
          handleAlertOpen();
        }
      }
    }
  }

  const handleStandardChange = (event) => {
    setStandardText(event.target.value);
  };

  React.useEffect(() => {
    if (data_product_uuid && annotation_text) {
      setSaveEditButtonText(t('button.edit'));
    }
    setStandardText(annotation_text);
  }, [data_product_uuid, annotation_text, t]);

  function renderCardContent() {
    if (data_product_uuid && !annotation_text) {
      return (
        <CardContent>
          <TextField
            multiline={true}
            rows={9}
            fullWidth
            placeholder={t('label.annotation.placeholderText')}
            value={standardText}
            onChange={handleStandardChange}
          />
        </CardContent>
      );
    }

    return (
      <CardContent>
        <Typography variant="subtitle1">
          {t('label.userPrincipalName') + `: ${user_principal_name}`}
        </Typography>
        <TextField
          disabled={disableAnnotationTextEntryField}
          multiline={true}
          rows={7}
          fullWidth
          defaultValue={annotation_text}
          value={standardText}
          onChange={handleStandardChange}
        />
      </CardContent>
    );
  }

  return (
    <Box>
      <Modal open={alertOpen} onClose={handleAlertClose}>
        <Alert
          ariaDescription={alertText}
          color={alertColour}
          variant={AlertVariantTypes.Filled}
          testId={'saveAnnotationAlert'}
        />
      </Modal>
      <Card sx={{ width: 600, height: 400 }}>
        <CardHeader
          title={t('label.annotation.title')}
          subheader={t('label.dataProductUUID') + `: ${data_product_uuid}`}
          action={
            <Button
              label={saveEditButtonText}
              testId="saveDataAnnotation"
              onClick={saveEditButtonClick}
              disabled={disableEditButton}
            />
          }
        />
        {renderCardContent()}
      </Card>
    </Box>
  );
};

export default SaveDataAnnotationCard;
