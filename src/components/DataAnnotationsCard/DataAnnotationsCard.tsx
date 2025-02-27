import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Box, Card, CardContent, CardHeader, Modal, Stack } from '@mui/material';
import { Button } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import {
  shellSize,
  FILTERCARDHEIGHT,
  tableHeight,
  SKA_DATAPRODUCT_API_URL
} from '@utils/constants';
import DataAnnotationComponent from '@components/DataAnnotationComponent/DataAnnotationComponent';
import EmptyDataAnnotationComponent from '@components/EmptyDataAnnotationComponent/EmptyDataAnnotationComponent';
import SaveDataAnnotationCard from '@components/SaveDataAnnotationCard/SaveDataAnnotationCard';
import getDataAnnotations from '@services/GetDataAnnotations/GetDataAnnotations';
import { DataAnnotation } from 'types/annotations/annotations';
import { SelectedDataProduct } from 'types/dataproducts/dataproducts';
import useAxiosClient from '@services/AxiosClient/AxiosClient';
import { useUserAuthenticated } from '@services/GetAuthStatus/GetAuthStatus';

function DataAnnotationsCard(selectedDataProduct: SelectedDataProduct) {
  const { t } = useTranslation('dpd');
  const { instance } = useMsal();
  const account = instance.getAllAccounts()[0];
  const [listOfDataAnnotations, setListOfDataAnnotations] = React.useState([]);
  const [annotationsTableAvailable, setAnnotationsTableAvailable] = React.useState(false);
  const [disableCreateButton, setDisableCreateButton] = React.useState(false);
  const [cardHeight, setCardHeight] = React.useState(
    tableHeight() - (window.innerHeight - shellSize() - FILTERCARDHEIGHT - 240)
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const newAnnotation: DataAnnotation = {
    data_product_uid: selectedDataProduct.uid,
    annotation_text: '',
    user_principal_name: account?.username ?? '',
    annotation_id: 0
  };
  const authAxiosClient = useAxiosClient(SKA_DATAPRODUCT_API_URL);
  const isAuthenticated = useUserAuthenticated();

  React.useEffect(() => {
    if (isAuthenticated && annotationsTableAvailable) {
      setDisableCreateButton(false);
    } else {
      setDisableCreateButton(true);
    }
  }, [isAuthenticated, annotationsTableAvailable]);

  React.useEffect(() => {
    async function loadDataAnnotations() {
      setListOfDataAnnotations([]);
      const result = await getDataAnnotations(authAxiosClient, selectedDataProduct.uid);
      if ([200, 201].includes(result.status)) {
        setListOfDataAnnotations(result.data);
        setAnnotationsTableAvailable(true);
      } else if ([204].includes(result.status)) {
        setAnnotationsTableAvailable(true);
      } else {
        setAnnotationsTableAvailable(false);
      }
    }
    if (selectedDataProduct.uid !== '') {
      loadDataAnnotations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataProduct.uid]);

  React.useEffect(() => {
    function handleResize() {
      setCardHeight(tableHeight() - (window.innerHeight - shellSize() - FILTERCARDHEIGHT - 240));
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function renderDataAnnotationStack(listOfDataAnnotations: any) {
    if (listOfDataAnnotations.length > 0) {
      return (
        <>
          {listOfDataAnnotations.map((annotation: DataAnnotation) => (
            <DataAnnotationComponent {...annotation} />
          ))}
        </>
      );
    } else {
      return <EmptyDataAnnotationComponent />;
    }
  }

  return (
    <>
      {selectedDataProduct.uid !== '' && (
        <Box m={1}>
          <Modal
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <SaveDataAnnotationCard {...newAnnotation} />
          </Modal>
          <Card
            variant="outlined"
            sx={{ maxHeight: cardHeight, overflow: { overflowY: 'scroll' } }}
          >
            <CardHeader
              title={t('label.annotation.title')}
              action={
                <Button
                  disabled={disableCreateButton}
                  label={t('button.create')}
                  testId="createDataAnnotation"
                  onClick={handleOpen}
                />
              }
            />
            <CardContent>
              <Stack>{renderDataAnnotationStack(listOfDataAnnotations)}</Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}

export default DataAnnotationsCard;
