import * as React from 'react';
import { Box, Card, CardActions, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import { Button } from '@ska-telescope/ska-gui-components';
import { useTranslation } from 'react-i18next';
import { shellSize, FILTERCARDHEIGHT, tableHeight } from '@utils/constants';
import DataAnnotationComponent from '@components/DataAnnotationCompoment/DataAnnotationComponent';
import EmptyDataAnnotationComponent from '@components/EmptyDataAnnotationComponent/EmptyDataAnnotationComponent';
import getDataAnnotations from '@services/GetDataAnnotations/GetDataAnnotations';

function DataAnnotationsCard(uuid: any) {
  const { t } = useTranslation('dpd');

  const [dataAnnotations, setDataAnnotations] = React.useState({ data: [] });
  const [cardHeight, setCardHeight] = React.useState(
    tableHeight() - (window.innerHeight - shellSize() - FILTERCARDHEIGHT -240)
  );

  React.useEffect(() => {

    async function loadDataAnnotations() {
      const results = await getDataAnnotations(uuid);
      setDataAnnotations(results);
    }
    if(uuid !== ''){
      loadDataAnnotations();
    }
  }, [uuid]);

  React.useEffect(() => {
    function handleResize() {
      setCardHeight(tableHeight() - (window.innerHeight - shellSize() - FILTERCARDHEIGHT -240));
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
          {
            dataAnnotations.map((annotation: any) => (
              <DataAnnotationComponent data={annotation} />
            ))
          }
        </>
      )
    }
    else {
      return (<EmptyDataAnnotationComponent />)
    }
  }


  return (
    <>
    {uuid !== '' && (
      <Box m={1} >
        <Card variant="outlined" sx={{ maxHeight: cardHeight, overflow: {overflowY: 'scroll'}}}>
          <CardHeader title="Data Annotations" action={<Button label="Create" testId="createDataAnnotation"/>}/>
          <CardContent>
            <Stack>
              {renderDataAnnotationStack(dataAnnotations)}
            </Stack>
          </CardContent>
        </Card>
      </Box>
        )}
    </>
  )
}

export default DataAnnotationsCard;
