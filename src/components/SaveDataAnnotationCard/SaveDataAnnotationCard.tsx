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

interface SaveDataAnnotationCardProps {
  dataAnnotation?: any;
  userPrincipalName: string;
  uuid?: string;
}

const SaveDataAnnotationCard = ({
  userPrincipalName,
  dataAnnotation,
  uuid
}: SaveDataAnnotationCardProps) => {
  const { t } = useTranslation('dpd');
  const [buttonText, setButtonText] = React.useState(t('button.save'));
  const [disableTextField, setDisableTextField] = React.useState(true);
  const [annotationText, setAnnotationText] = React.useState('');
  const [alertOpen, setAlertOpen] = React.useState(false);
  const handleAlertOpen = () => setAlertOpen(true);
  const handleAlertClose = () => setAlertOpen(false);
  const [alertText, setAlertText] = React.useState('');
  const [alertColour, setAlertColour] = React.useState(AlertColorTypes.Success);

  async function buttonClick() {
    if (buttonText === t('button.edit')) {
      setDisableTextField(false);
      setButtonText(t('button.save'));
    } else {
      const annotationID = dataAnnotation ? dataAnnotation.annotation_id : null;
      const result = await saveDataAnnotations(
        annotationText,
        userPrincipalName,
        uuid,
        annotationID
      );
      setAlertText(result.data.message);
      if (!(result.status in [200, 201])) {
        setAlertColour(AlertColorTypes.Error);
        setAlertText(
          `${t('label.annotation.error')}: \n${t('label.statusCode')}: ${result.status}\n${t('label.annotation.errorMessage')}: ${result.data.message}`
        );
      }
    }
    handleAlertOpen();
  }

  function renderCardContent() {
    if (uuid && !dataAnnotation) {
      return (
        <CardContent>
          <Typography variant="subtitle1">
            {t('label.userPrincipalName') + `: ${userPrincipalName}`}
          </Typography>
          <TextField
            multiline={true}
            rows={9}
            fullWidth
            placeholder={t('label.annotation.placeholderText')}
          />
        </CardContent>
      );
    }
    setButtonText(t('button.edit'));
    return (
      <CardContent>
        <Typography variant="subtitle1">
          {t('label.annotation.userPrincipalName') + `: ${dataAnnotation.user_principal_name}`}
        </Typography>
        <Typography variant="subtitle1">
          {t('label.dateCreated') + `: ${dataAnnotation.timestamp_created}`}
        </Typography>
        <Typography variant="subtitle1">
          {t('label.lastModified') + `: ${dataAnnotation.timestamp_modified}`}
        </Typography>
        <TextField
          onChange={(v) => setAnnotationText(v.target.value)}
          disabled={disableTextField}
          multiline={true}
          rows={7}
          fullWidth
          defaultValue={dataAnnotation.annotation_text}
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
      <Card sx={{ width: 1500, height: 400 }}>
        <CardHeader
          title={t('label.annotation.title')}
          subheader={t('label.dataProductUUID') + `: ${uuid}`}
          action={<Button label={buttonText} testId="saveDataAnnotation" onClick={buttonClick} />}
        />
        {renderCardContent()}
      </Card>
    </Box>
  );
};

export default SaveDataAnnotationCard;
