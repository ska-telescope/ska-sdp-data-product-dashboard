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
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: ''
  });
  const [selectedNode, setSelectedNode] = React.useState([]);
  const [selectedNodeId, setSelectedNodeId] = React.useState('');
  const jsonFilesTree = DataProductFileList();

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
  }, [selectedNodeId]);

  const handleSelectedNode = (event, nodeId) => {
    console.log(`searching for node original ID:${nodeId}`);
    const node = nodeId;
    console.log(`searching for node original2 ID:${node}`);
    setSelectedNodeId(nodeId);
    console.log(`searching for node assigned ID:${selectedNodeId}`);

    getObject(jsonFilesTree);
    console.log(`Selected node: ${selectedNode}`);
  };

  const renderTree = nodes => (
    <TreeItem key={nodes.id} {...console.log(nodes.id)} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
    </TreeItem>
  );

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
        {jsonFilesTree && renderTree(jsonFilesTree)}
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
