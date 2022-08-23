import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import DataProductFileList from './data_product_api/data_product_api_filelist';
import DataProductDownload from './data_product_api/data_product_api_download';

const DataProductDashboard = () => {
  const [jsonFilesTree, setJsonFilesTree] = React.useState([]);
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: ''
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSelectedNodeInfo = (jsonTree, nodeId) => {
    // Test if the jsonTree is defined.
    if (typeof jsonTree === 'undefined') {
      return;
    }
    // Evaluate first elements of the jsonTree, it is of type array, reevaluate each element of the array.
    if (jsonTree instanceof Array) {
      for (let i = 0; i < jsonTree.length + 1; i += 1) {
        getSelectedNodeInfo(jsonTree[i], nodeId);
      }
    } else {
      // If the element of the array is not an array, evaluate its properties. If matching ID is found, update the setSelectedFileNames.
      Object.keys(jsonTree).forEach(prop => {
        if (jsonTree.id.toString() === nodeId) {
          setSelectedFileNames({
            fileName: jsonTree.name,
            relativeFileName: jsonTree.relativefilename
          });
          return;
        }
        if (jsonTree[prop] instanceof Object || jsonTree[prop] instanceof Array) {
          getSelectedNodeInfo(jsonTree[prop], nodeId);
        }
      });
    }
  };

  const handleSelectedNode = (_event, nodeId) => {
    getSelectedNodeInfo(jsonFilesTree, nodeId);
  };

  async function getJsonFilesTree() {
    setJsonFilesTree(await DataProductFileList());
  }

  if (jsonFilesTree.length === 0) {
    getJsonFilesTree();
  }

  function renderTreeFunction() {
    if (jsonFilesTree.length !== 0) {
      const renderTree = nodes => (
        <TreeItem key={nodes.id} nodeId={nodes.id.toString()} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
        </TreeItem>
      );
      return renderTree(jsonFilesTree);
    }
    return <></>;
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
