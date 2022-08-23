import download from 'downloadjs';

function DataProductDownload(selectedFileNames) {
  const apiUrl = process.env.SKA_SDP_DATA_PRODUCT_API_URL;
  const apiPort = process.env.SKA_SDP_DATA_PRODUCT_API_PORT;

  fetch(`${apiUrl}:${apiPort}/download`, {
    method: 'POST',
    body: JSON.stringify(selectedFileNames),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(resp => resp.blob())
    .then(blob => download(blob, `${selectedFileNames.fileName}`));
}

export default DataProductDownload;
