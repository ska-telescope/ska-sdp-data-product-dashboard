import { SKA_DATAPRODUCT_API_URL } from '@utils/constants';
import streamSaver from 'streamsaver';

const dataProductDownloadStream = async (selectedDataProduct: {
  execution_block: any;
  relativePathName: any;
  metaDataFile: any;
  uuid: any;
}) => {
  const URL_DOWNLOAD = '/download';
  const apiUrl = SKA_DATAPRODUCT_API_URL;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip'
    },
    body: JSON.stringify(selectedDataProduct)
  };

  try {
    // Make a request to the endpoint with the file object
    const response = await fetch(`${apiUrl}${URL_DOWNLOAD}`, options);

    // Create a write stream using streamSaver library
    const fileStream = streamSaver.createWriteStream(selectedDataProduct.relativePathName + '.tar');

    const readableStream = response.body;

    // Pipe the stream
    if (window.WritableStream && readableStream?.pipeTo) {
      // Use the modern pipeTo method if available
      await readableStream.pipeTo(fileStream);
    } else {
      // Fallback for older browsers
      const writer = fileStream.getWriter();
      const reader = response?.body?.getReader();

      const pump = async () => {
        try {
          const { value, done } = await reader?.read();
          if (done) {
            writer.close();
          } else {
            await writer.write(value);
            await pump();
          }
        } catch (error) {
          console.error('Error while streaming:', error);
          writer.abort();
        }
      };

      await pump();
    }
  } catch (error) {
    console.error('Error fetching or streaming data:', error);
  }
};

export default dataProductDownloadStream;
