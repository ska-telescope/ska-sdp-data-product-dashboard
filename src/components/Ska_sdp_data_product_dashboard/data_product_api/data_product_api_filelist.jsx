import React from 'react';
import axios, { AxiosError } from 'axios';

async function DataProductFileList() {
  const [fileList, setFileList] = React.useState([]);

  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const apiPort = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_PORT;

  async function fetchFileList() {
    try {
      axios
        .get(`${apiUrl}:${apiPort}/filelist`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(
          response => response,
          error => {
            if (!error.response) {
              console.log('Please check your internet connection.');
            }

            return Promise.reject(error);
          }
        )
        .then(
          response => {
            setFileList(response.data);
          },
          err => {
            console.log('error', err);
            return null;
          }
        );
    } catch (e) {
      console.error('Catch error', e);
    }
  }
  if (fileList.length === 0) {
    fetchFileList().catch(err => console.log('This is the uncought error:', err));
  }
  return fileList;
}

export default DataProductFileList;

// import React from 'react';
// import axios from 'axios';

// function DataProductFileList() {
//   const [fileList, setFileList] = React.useState([]);

//   const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
//   const apiPort = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_PORT;

//   async function fetchFileList() {
//     fetch(`${apiUrl}:${apiPort}/filelist`, {
//       method: 'get',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => {
//         // Unfortunately, fetch doesn't send (404 error) into the cache itself
//         // You have to send it, as I have done below
//         console.log(response.status);
//         if (response.status >= 400) {
//           throw new Error('Server responds with error!');
//         }
//         return 'Unknown Error';
//       })
//       .then(response => response.json())
//       .then(data => {
//         setFileList(data);
//       });
//   }

//   if (fileList.length === 0) {
//     fetchFileList();
//   }
//   return fileList;
// }

// export default DataProductFileList;
