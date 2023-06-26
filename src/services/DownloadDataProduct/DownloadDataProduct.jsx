import download from 'downloadjs';

const DownloadDataProduct = (selectedFileNames) => {
  const URL_DOWNLOAD = '/download';
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATAPRODUCT_API_URL;

  fetch(`${apiUrl}${URL_DOWNLOAD}`, {
    method: 'POST',
    body: JSON.stringify(selectedFileNames),
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
  })
    .then(resp => resp.blob())
    .then(blob => download(blob, `${selectedFileNames.fileName}.tar`, 'text/plain'));
}

export default DownloadDataProduct