import download from 'downloadjs';

function DataProductDownload(selectedFileNames) {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;

  fetch(`${apiUrl}/download`, {
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
