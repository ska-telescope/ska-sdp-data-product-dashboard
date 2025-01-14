import axios from 'axios';
import { SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import { useTranslation } from 'react-i18next';

async function saveDataAnnotations(annotationText: string, userPrincipalName: string, uuid?: string, annotationID?: number) {
    const { t } = useTranslation('dpd');
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const currentTimestamp = new Date().toISOString();

    let payload: object = {
        annotation_text: annotationText,
        user_principal_name: userPrincipalName,
        data_product_uuid: uuid,
        timestamp_modified: currentTimestamp,
    };

    if (annotationID) {
        payload = {
            ...payload,
            annotation_id: annotationID
        };
    } else {
        payload = {
            ...payload,
            timestamp_created: currentTimestamp
        };
    }

    try {
        const result = await axios.post(`${SKA_DATAPRODUCT_API_URL}/annotation`, config, payload);
        if (result.status in [200, 201]) {
            return result.data.message;
        }
        return `${t('label.annotation.error')}: \n${t('label.statusCode')}: ${result.status}\n${t('label.annotation.errorMessage')}: ${result.data.message}`;
    } catch (error) {
        throw new Error('Error Saving Data Annotation');
    }
}

export default saveDataAnnotations;