// import React from 'react';
import React, { useEffect, useState } from 'react';
// import FolderTree from 'react-folder-tree';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import DataProductFileList from './data_product_api/data_product_api_filelist';
import DataProductDownload from './data_product_api/data_product_api_download';
// import { stringify } from 'querystring';

// const DataProductDashboard = () => {
//   const jsonFilesTree = DataProductFileList();
//   const [selectedFileNames, setSelectedFileNames] = React.useState({
//     fileName: '',
//     relativeFileName: ''
//   });

//   const onNameClick = ({ nodeData }) => {
//     const FileName = nodeData.name;
//     const FileUrl = nodeData.url;
//     setSelectedFileNames({ fileName: FileName, relativeFileName: FileUrl });
//   };

//   const onDownloadClick = () => {
//     DataProductDownload(selectedFileNames);
//   };

//   return (
//     <>
//       <FolderTree
//         data={jsonFilesTree}
//         initOpenStatus="open"
//         showCheckbox={false}
//         indentPixels={10}
//         onNameClick={onNameClick}
//       />
//       <Button variant="outlined" color="secondary" onClick={onDownloadClick}>
//         <DownloadIcon />
//         Download:
//         {selectedFileNames.fileName}
//       </Button>
//     </>
//   );
// };

const DataProductDashboard = () => {
  const dummy = false;
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: ''
  });
  const [selectedNode, setSelectedNode] = React.useState([]);
  const [selectedNodeId, setSelectedNodeId] = React.useState(null);
  const dummyFilesTree = {
    id: 'root',
    name: 'test_files',
    url: '.',
    type: 'directory',
    children: [
      {
        id: 1,
        name: 'testfile.txt',
        url: 'testfile.txt',
        type: 'file'
      }
    ]
  };
  const jsonFilesTree = dummy ? dummyFilesTree : DataProductFileList();
  console.log('jsonFilesTree:', jsonFilesTree);

  const getObject = ({ theObject }) => {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i += 1) {
        result = getObject(theObject[i]);
        if (result) {
          break;
        }
      }
    } else {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const prop in theObject) {
        console.log(`${prop}: ${theObject[prop]}`);
        if (prop === 'id') {
          if (theObject[prop] === selectedNodeId) {
            setSelectedNode(theObject);
            // return theObject;
          }
        }
        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
          result = getObject(theObject[prop]);
          if (result) {
            break;
          }
        }
      }
    }
    setSelectedNode(result);
    // return result;
  };

  useEffect(() => {
    // This will be called for each new value of selectedNode, including the initial empty one
    // Here is where you can make your API call
    console.log('selectedNodeId:', selectedNodeId);
    getObject(jsonFilesTree);
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
        {selectedFileNames.fileName}
      </Button>
    </>
  );
};

export default DataProductDashboard;
