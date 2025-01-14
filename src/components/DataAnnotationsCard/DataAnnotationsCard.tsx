import * as React from 'react';
import { Box, Card, CardContent, CardHeader, Modal, Stack } from '@mui/material';
import { Button } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import { shellSize, FILTERCARDHEIGHT, tableHeight } from '@utils/constants';
import DataAnnotationComponent from '@components/DataAnnotationComponent/DataAnnotationComponent';
import EmptyDataAnnotationComponent from '@components/EmptyDataAnnotationComponent/EmptyDataAnnotationComponent';
import SaveDataAnnotationCard from '@components/SaveDataAnnotationCard/SaveDataAnnotationCard';
import getDataAnnotations from '@services/GetDataAnnotations/GetDataAnnotations';

function DataAnnotationsCard(uuid: any, userPrincipalName: string = '') {
  const { t } = useTranslation('dpd');

  const [dataAnnotations, setDataAnnotations] = React.useState([]);
  const [dataAnnotationMessage, setDataAnnotationMessage] = React.useState('');
  const [disableCreateButton, setDisableCreateButton] = React.useState(false);
  const [cardHeight, setCardHeight] = React.useState(
    tableHeight() - (window.innerHeight - shellSize() - FILTERCARDHEIGHT - 240)
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    async function loadDataAnnotations() {
      const result = await getDataAnnotations(uuid);
      if (typeof result === 'string') {
        setDataAnnotationMessage(result);
        setDataAnnotations([]);
        setDisableCreateButton(true);
      } else {
        setDataAnnotations(result);
        setDisableCreateButton(false);
      }
    }
    if (uuid !== '') {
      loadDataAnnotations();
    }
  }, [uuid]);

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
  }, []); // Empty dependency array ensures the effect runs only once

  function renderDataAnnotationStack(dataAnnotations: any) {
    if (dataAnnotations.length > 0) {
      return (
        <>
          {dataAnnotations.map((annotation: any) => (
            <DataAnnotationComponent data={annotation} />
          ))}
        </>
      );
    } else {
      return <EmptyDataAnnotationComponent message={dataAnnotationMessage} />;
    }
  }

  return (
    <>
      {uuid !== '' && (
        <Box m={1}>
          <Modal
            open={open}
            onClose={handleClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <SaveDataAnnotationCard userPrincipalName={userPrincipalName} uuid={uuid} />
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
              <Stack>{renderDataAnnotationStack(dataAnnotations)}</Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  );
}

export default DataAnnotationsCard;
