import React from 'react';
import { Box, Card, CardContent, CardHeader, Modal, TextField, Typography } from '@mui/material';
import { Button, Alert, AlertColorTypes } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import saveDataAnnotations from '@services/SaveDataAnnotation/SaveDataAnnotation';
import { DataAnnotation } from 'types/annotations/annotations';
import { SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import useAxiosClient from '@services/AxiosClient/AxiosClient';
import { useUserAuthenticated } from '@services/GetAuthStatus/GetAuthStatus';

const SaveDataAnnotationCard = (props: DataAnnotation) => {
  const { data_product_uid, annotation_text, user_principal_name, annotation_id } = props;
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
  const isAuthenticated = useUserAuthenticated();
  const [disableEditButton, setDisableEditButton] = React.useState(false);
  const authAxiosClient = useAxiosClient(SKA_DATAPRODUCT_API_URL);

  React.useEffect(() => {
    if (isAuthenticated) {
      setDisableEditButton(false);
    } else {
      setDisableEditButton(true);
    }
  }, [isAuthenticated, user_principal_name]);

  async function saveEditButtonClick() {
    if (saveEditButtonText === t('button.edit')) {
      setDisableAnnotationTextEntryField(false);
      setSaveEditButtonText(t('button.save'));
    } else {
      const annotationID = annotation_id ? annotation_id : undefined;
      if (standardText) {
        const result = await saveDataAnnotations(
          authAxiosClient,
          standardText,
          data_product_uid,
          annotationID
        );
        setAlertText(result.data.message);
        setAlertColour(AlertColorTypes.Info);
        if (![200, 201].includes(result.status)) {
          setAlertColour(AlertColorTypes.Error);
          setAlertText(
            `${t('label.annotation.error')}: \n${t('label.statusCode')}: ${result.status}\n${t('label.annotation.errorMessage')}: ${result.data.message}`
          );
        }
        handleAlertOpen();
      }
    }
  }

  const handleStandardChange = (event) => {
    setStandardText(event.target.value);
  };

  React.useEffect(() => {
    if (data_product_uid && annotation_text) {
      setSaveEditButtonText(t('button.edit'));
    }
    setStandardText(annotation_text);
  }, [data_product_uid, annotation_text, t]);

  function renderCardContent() {
    if (data_product_uid && !annotation_text) {
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
        <Alert testId={'saveAnnotationAlert'} color={alertColour}>
          <>{alertText}</>
        </Alert>
      </Modal>
      <Card sx={{ width: 600, height: 400 }}>
        <CardHeader
          title={t('label.annotation.title')}
          subheader={t('label.dataProductUUID') + `: ${data_product_uid}`}
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
