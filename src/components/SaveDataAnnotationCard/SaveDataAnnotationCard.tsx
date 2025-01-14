import * as React from 'react';
import { Box, Card, CardContent, CardHeader, Modal, TextField, Typography } from '@mui/material';
import { Button, Alert, AlertColorTypes, AlertVariantTypes } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import saveDataAnnotations from '@services/SaveDataAnnotation/SaveDataAnnotation';

interface SaveDataAnnotationCardProps{
    dataAnnotation?: any,
    userPrincipalName: string,
    uuid?: string,
    handleClose(): void
}

const SaveDataAnnotationCard = ({userPrincipalName, dataAnnotation, uuid, handleClose}: SaveDataAnnotationCardProps) => {
    const { t } = useTranslation('dpd');
    const [buttonText, setButtonText] = React.useState("");
    const [disableTextField, setDisableTextField] = React.useState(true);
    const [annotationText, setAnnotationText] = React.useState(t('button.save'));
    const [alertOpen, setAlertOpen] = React.useState(false);
    const handleAlertOpen = () => setAlertOpen(true);
    const handleAlertClose = () => setAlertOpen(false);
    const [alertText, setAlertText] = React.useState('');
    const [alertColour, setAlertColour] = React.useState(AlertColorTypes.Success);

    function buttonClick() {
        if(buttonText === t('button.edit')){
            setDisableTextField(false);
            setButtonText(t('button.save'));
        }
        else{
            const annotationID = (dataAnnotation) ? dataAnnotation.annotation_id : null; 
            const result = saveDataAnnotations(annotationText, userPrincipalName, uuid, annotationID)
            if(typeof result === 'string'){
                setAlertText(result);
                if(alertText.startsWith(t('label.annotation.error'))){
                    setAlertColour(AlertColorTypes.Error);
                }
            }
            handleClose();
            handleAlertOpen();
        }
    }

    function renderCardContent() {
        if (uuid && !dataAnnotation) {
            return (
                <CardContent>
                    <Typography variant="subtitle2">{t('label.annotation.userPrincipalName') + `: ${userPrincipalName}`}</Typography>
                    <TextField multiline fullWidth placeholder={t('annotations.placeholderText')} />
                </CardContent>
            )
        }
        setButtonText(t('button.edit'));
        return (
            <CardContent>
                <Typography variant="subtitle2">{t('label.annotation.userPrincipalName') + `: ${dataAnnotation.user_principal_name}`}</Typography>
                <Typography variant="subtitle2">{t('label.dateCreated') + `: ${dataAnnotation.timestamp_created}`}</Typography>
                <Typography variant="subtitle2">{t('label.lastModified') + `: ${dataAnnotation.timestamp_modified}`}</Typography>
                <TextField onChange={(v) => setAnnotationText(v.target.value)} disabled={disableTextField} multiline fullWidth defaultValue={dataAnnotation.annotation_text}/>
            </CardContent>
        )

    }

    return (
        <Box>
            <Modal open={alertOpen} onClose={handleAlertClose}>
                <Alert ariaDescription={alertText} color={alertColour} variant={AlertVariantTypes.Filled} testId={"saveAnnotationAlert"}/>
            </Modal>
            <Card>
                <CardHeader
                    title={t('label.annotation.title')}
                    subheader={t('label.dataProductUUID') + `: ${uuid}`}
                    action={<Button label={buttonText} testId="saveDataAnnotation" onClick={buttonClick}/>}
                />
                {renderCardContent()}
            </Card>
        </Box>
    );
}

export default SaveDataAnnotationCard;
