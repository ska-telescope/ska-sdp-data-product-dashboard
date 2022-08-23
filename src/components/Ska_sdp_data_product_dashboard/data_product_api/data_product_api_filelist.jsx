import axios from 'axios';

async function DataProductFileList() {
  const apiUrl = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_URL;
  const apiPort = process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_API_PORT;

  function populateFilesTree(fileList) {
    const useDummyData = JSON.parse(process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA);
    let newFileTree;
    const dummyFilesTree = {
      id: 'root',
      name: 'SDP Data API not available',
      relativefilename: '.',
      type: 'directory',
      children: [
        {
          id: 1,
          name: 'Moc tree file.txt',
          relativefilename: 'testfile.txt',
          type: 'file'
        }
      ]
    };
    const reviewedJsonFilesTree = fileList;
    if (reviewedJsonFilesTree.length !== 0) {
      newFileTree =
        useDummyData || reviewedJsonFilesTree === null ? dummyFilesTree : reviewedJsonFilesTree;
    }
    return newFileTree;
  }

  async function fetchFileList() {
    try {
      const data = await axios.get(`${apiUrl}:${apiPort}/filelist`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      return populateFilesTree(data.data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Catch error', e);
      return null;
    }
  }
  return fetchFileList();
}

export default DataProductFileList;
