import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import DataProductFileList from './data_product_api/data_product_api_filelist';
import DataProductDownload from './data_product_api/data_product_api_download';

const DataProductDashboard = () => {
  const useDummyData = JSON.parse(process.env.REACT_APP_SKA_SDP_DATA_PRODUCT_DUMMY_DATA);
  const dummyFilesTree = {
    id: 'root',
    name: 'test_files',
    relativefilename: '.',
    type: 'directory',
    children: [
      {
        id: 1,
        name: 'testfile.txt',
        relativefilename: 'testfile.txt',
        type: 'file'
      }
    ]
  };
  const jsonFilesTree = useDummyData ? dummyFilesTree : DataProductFileList();
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: ''
  });
  const [selectedNodeId, setSelectedNodeId] = React.useState(null);

  const getSelectedNodeInfo = jsonFilesTreeObject => {
    let result = null;
    if (jsonFilesTreeObject instanceof Array) {
      for (let i = 0; i < jsonFilesTreeObject.length + 1; i += 1) {
        result = getSelectedNodeInfo(jsonFilesTreeObject[i]);
        if (result) {
          break;
        }
      }
    } else {
      for (const prop in jsonFilesTreeObject) {
        if (prop === 'id') {
          if (jsonFilesTreeObject[prop].toString() === selectedNodeId) {
            setSelectedFileNames({
              fileName: jsonFilesTreeObject.name,
              relativeFileName: jsonFilesTreeObject.relativefilename
            });
          }
        }
        if (
          jsonFilesTreeObject[prop] instanceof Object ||
          jsonFilesTreeObject[prop] instanceof Array
        ) {
          result = getSelectedNodeInfo(jsonFilesTreeObject[prop]);
          if (result) {
            break;
          }
        }
      }
    }
  };

  useEffect(() => {
    // This will be called for each new value of selectedNodeId.
    getSelectedNodeInfo(jsonFilesTree);
  }, [selectedNodeId]);

  const handleSelectedNode = (_event, nodeId) => {
    setSelectedNodeId(nodeId);
  };

  function renderTreeFunction() {
    if (jsonFilesTree.length !== 0) {
      const renderTree = nodes => (
        <TreeItem key={nodes.id} nodeId={nodes.id.toString()} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
        </TreeItem>
      );
      return renderTree(jsonFilesTree);
    }
    return null;
  }

  const onDownloadClick = () => {
    DataProductDownload(selectedFileNames);
  };

  return (
    <>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={handleSelectedNode}
        sx={{ height: 500, flexGrow: 1, maxWidth: 500, overflowY: 'auto' }}
      >
        {jsonFilesTree && renderTreeFunction(jsonFilesTree)}
      </TreeView>
      <Button variant="outlined" color="secondary" onClick={onDownloadClick}>
        <DownloadIcon />
        Download
      </Button>
    </>
  );
};

export default DataProductDashboard;
