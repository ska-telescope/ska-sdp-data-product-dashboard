import React, { useEffect, useCallback } from 'react';
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

  const getSelectedNodeInfo = useCallback(jsonTree => {
    // const getSelectedNodeInfo = jsonTree => {
    // Test if the jsonTree is defined.
    if (typeof jsonTree === 'undefined') {
      return;
    }
    // Eveluate first elements of the jsonTree, it is of type array, reevaluate each element of the array.
    if (jsonTree instanceof Array) {
      for (let i = 0; i < jsonTree.length + 1; i += 1) {
        getSelectedNodeInfo(jsonTree[i]);
      }
    } else {
      // If the element of the array is not an array, evaluate its properties. If matching ID is found, update the setSelectedFileNames.
      Object.keys(jsonTree).forEach(prop => {
        if (jsonTree.id.toString() === selectedNodeId) {
          setSelectedFileNames({
            fileName: jsonTree.name,
            relativeFileName: jsonTree.relativefilename
          });
        }
        if (jsonTree[prop] instanceof Object || jsonTree[prop] instanceof Array) {
          getSelectedNodeInfo(jsonTree[prop]);
        }
      });
    }
  });

  useEffect(() => {
    // This will be called for each new value of selectedNodeId.
    getSelectedNodeInfo(jsonFilesTree);
  }, [selectedNodeId]);

  // useEffect(() => {
  //   // This will be called for each new value of selectedNodeId.
  //   getSelectedNodeInfo(jsonFilesTree);
  // }, [getSelectedNodeInfo, jsonFilesTree, selectedNodeId]);

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
        {jsonFilesTree && renderTreeFunction()}
      </TreeView>
      <Button variant="outlined" color="secondary" onClick={onDownloadClick}>
        <DownloadIcon />
        Download
      </Button>
    </>
  );
};

export default DataProductDashboard;
