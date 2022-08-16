import React from 'react';
import FolderTree from 'react-folder-tree';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DataProductFileList from './data_product_api/data_product_api_filelist';
import DataProductDownload from './data_product_api/data_product_api_download';

const DataProductDashboard = () => {
  const fileList = DataProductFileList();
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: ''
  });

  const onNameClick = ({ nodeData }) => {
    const FileName = nodeData.name;
    const FileUrl = nodeData.url;
    setSelectedFileNames({ fileName: FileName, relativeFileName: FileUrl });
  };

  const onDownloadClick = () => {
    DataProductDownload(selectedFileNames);
  };

  // const onTreeStateChange = (state, event) => console.log(state, event);

  return (
    <>
      <FolderTree
        data={fileList}
        initOpenStatus="open"
        showCheckbox={false}
        indentPixels={10}
        onNameClick={onNameClick}
        // onChange={onTreeStateChange}
      />
      <Button variant="outlined" color="secondary" onClick={onDownloadClick}>
        <DownloadIcon />
        Download:
        {selectedFileNames.fileName}
      </Button>
    </>
  );
};

export default DataProductDashboard;
