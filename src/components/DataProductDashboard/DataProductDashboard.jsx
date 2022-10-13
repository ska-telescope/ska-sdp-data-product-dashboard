import React from 'react';
import TreeView from '@mui/lab/TreeView';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import DownloadCard from './DownloadCard';
import DataProductFileList from '../../services/DataProduct/DataProductFileList';

const DataProductDashboard = () => {
  const [jsonFilesTree, setJsonFilesTree] = React.useState({data:[]});
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: ''
  });
  const TREE_MAX_WIDTH = 500;
  const TREE_HEIGHT = 500;

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
    getSelectedNodeInfo(jsonFilesTree.data, nodeId);
  };

  async function getJsonFilesTree() {
    setJsonFilesTree(await DataProductFileList());
  }

  if (jsonFilesTree.status === undefined) {
    getJsonFilesTree();
  }

  function renderTreeNodes() {
    if (jsonFilesTree.status === 200) {
      const renderTree = nodes => (
        <TreeItem key={nodes.id} nodeId={nodes.id.toString()} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
        </TreeItem>
      );
      return renderTree(jsonFilesTree.data);
    }
    return <></>;
  }

  function renderTreeComponent() {
    if (jsonFilesTree.status === 200 ) {
      return (
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}       
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeSelect={handleSelectedNode}
          sx={{ height: TREE_HEIGHT, flexGrow: 1, maxWidth: TREE_MAX_WIDTH, overflowY: 'auto' }}
        >
          {jsonFilesTree.data && renderTreeNodes()}
        </TreeView>
      );
    }
    return (
      <>
        <Typography sx={{ fontSize: 25, display: "flex", justifyContent: "center" }} color="#D33115" gutterBottom>
          <WarningIcon sx={{ fontSize: "35px" }}  />
          {" "}
          SDP Data API not available
        </Typography>
      </>
    );
  }

  function RenderDownloadCard() {
    if ( selectedFileNames.relativeFileName !== '' ) {
      return (
       DownloadCard(selectedFileNames)
      );
    }
  }

  return (
    <>
      {renderTreeComponent()}
      {RenderDownloadCard()}
    </>
  );
};

export default DataProductDashboard;
