import * as React from 'react';
import { Box, Card, CardContent, CardHeader, Modal, Stack } from '@mui/material';
import { Button } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import { shellSize, FILTERCARDHEIGHT, tableHeight } from '@utils/constants';
import DataAnnotationComponent from '@components/DataAnnotationComponent/DataAnnotationComponent';
import EmptyDataAnnotationComponent from '@components/EmptyDataAnnotationComponent/EmptyDataAnnotationComponent';
import SaveDataAnnotationCard from '@components/SaveDataAnnotationCard/SaveDataAnnotationCard';
import getDataAnnotations from '@services/GetDataAnnotations/GetDataAnnotations';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { DataAnnotation } from 'types/annotations/annotations';
import { SelectedDataProduct } from 'types/dataproducts/dataproducts';

function DataAnnotationsCard(selectedDataProduct: SelectedDataProduct) {
  const { t } = useTranslation('dpd');

  const [listOfDataAnnotations, setListOfDataAnnotations] = React.useState([]);
  const [dataAnnotationMessage, setDataAnnotationMessage] = React.useState('');
  const [annotationsTableAvailable, setAnnotationsTableAvailable] = React.useState(false);
  const [disableCreateButton, setDisableCreateButton] = React.useState(false);
  const [cardHeight, setCardHeight] = React.useState(
    tableHeight() - (window.innerHeight - shellSize() - FILTERCARDHEIGHT - 240)
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = storageObject.useStore();
  const newAnnotation: DataAnnotation = {
    data_product_uuid: selectedDataProduct.uuid,
    annotation_text: '',
    user_principal_name: user?.email ?? '',
    annotation_id: 0
  };

  // TODO: This need to change to pull form session storage
  React.useEffect(() => {
    if (user && annotationsTableAvailable) {
      setDisableCreateButton(false);
    } else {
      setDisableCreateButton(true);
    }
  }, [user, annotationsTableAvailable]);

  React.useEffect(() => {
    async function loadDataAnnotations() {
      const result = await getDataAnnotations(selectedDataProduct.uuid);
      if (typeof result === 'string') {
        setDataAnnotationMessage(result);
        setListOfDataAnnotations([]);
        setAnnotationsTableAvailable(false);
      } else {
        setListOfDataAnnotations(result);
        setAnnotationsTableAvailable(true);
      }
    }
    if (selectedDataProduct.uuid !== '') {
      loadDataAnnotations();
    }
  }, [selectedDataProduct.uuid]);

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
      return <EmptyDataAnnotationComponent message={dataAnnotationMessage} />;
    }
  }

  return (
    <>
      {selectedDataProduct.uuid !== '' && (
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
