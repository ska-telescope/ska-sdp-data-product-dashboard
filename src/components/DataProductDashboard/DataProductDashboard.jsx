import React from 'react';

import { Grid, Typography } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DownloadCard from '../DownloadCard/DownloadCard';
import MetaDataComponent from '../MetaDataComponent/MetaDataComponent';
import FetchDataProductList from '../../services/FetchDataProductList/FetchDataProductList';
import MetaData from '../../services/MetaData/MetaData';

const DataProductDashboard = () => {
  const [jsonDataProductsTree, setJsonDataProductsTree] = React.useState({data:[]});
  const [metaData, setMetaData] = React.useState(null);
  const [oldFilename, setOldFilename] = React.useState(null);
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: '',
    metaDataFile: ''
  });

  const TREE_OK = jsonDataProductsTree?.status === 200;
  const TREE_MAX_WIDTH = 500;  
  const TREE_HEIGHT = 500;

  React.useEffect(() => {
    async function getJsonDataProductsTree() {
      const results = await FetchDataProductList();
      setJsonDataProductsTree(results);
    }
    
    getJsonDataProductsTree();
  }, []);

  React.useEffect(() => {
    setOldFilename(selectedFileNames.metaDataFile);
  }, [selectedFileNames, metaData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSelectedNodeInfo = (jsonTree, nodeId) => {
    // Test if the jsonTree is defined.
    if (typeof jsonTree !== 'undefined') {
      // Evaluate first elements of the jsonTree, it is of type array, reevaluate each element of the array.
      if (jsonTree instanceof Array) {
        for (let i = 0; i < jsonTree.length + 1; i += 1) {
          getSelectedNodeInfo(jsonTree[i], nodeId);
        }
      } else {
        // If the element of the array is not an array, evaluate its properties. If matching ID is found, update the setSelectedFileNames.
        Object.keys(jsonTree).forEach(prop => {
          if (jsonTree?.id?.toString() === nodeId) {
            setSelectedFileNames({
              fileName: jsonTree.name,
              relativeFileName: jsonTree.relativefilename,
              metaDataFile: jsonTree.metadatafile
            });
            return;
          }
          if (jsonTree[prop] instanceof Object || jsonTree[prop] instanceof Array) {
            getSelectedNodeInfo(jsonTree[prop], nodeId);
          }
        });
      }
    }
  };

  const handleSelectedNode = (_event, nodeId) => {
    getSelectedNodeInfo(jsonDataProductsTree.data, nodeId);
  };

  async function getMetaData() {
    const results = await MetaData(selectedFileNames?.metaDataFile);
    setMetaData(results.data);
  }

  function renderDataProductsTreeNodes() {
    if (TREE_OK) {
      const renderTree = nodes => (
        <TreeItem key={nodes?.id?.toString()} nodeId={nodes?.id?.toString()} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
        </TreeItem>
      );
      return renderTree(jsonDataProductsTree.data);
    }
    return <></>;
  }

  function renderDataProductsTreeComponent() {
    if (TREE_OK) {
      return (
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}       
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
          onNodeSelect={handleSelectedNode}
          sx={{ height: TREE_HEIGHT, flexGrow: 1, maxWidth: TREE_MAX_WIDTH, overflowY: 'auto' }}
        >
          {jsonDataProductsTree.data && renderDataProductsTreeNodes()}
        </TreeView>
      );
    }
    return (
      <>
        <Typography sx={{ fontSize: 25, display: "flex", justifyContent: "center" }} color="error" gutterBottom>
          <WarningIcon sx={{ fontSize: "35px" }}  />
          {" "}
          {"SDP Data API not available"}
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

  function RenderMetaData() {
    if ( displayData() && metaData ) {
      return (
        <MetaDataComponent metaData={metaData} />
      );
    }
  }

  const displayData = () => {
    let result = false;
    const metaDataFile = selectedFileNames?.metaDataFile;

    if (metaDataFile && metaDataFile.length) {
      result = true;
      if (oldFilename !== metaDataFile) {
        getMetaData();
      }
    }
    return result;
  }

  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          {renderDataProductsTreeComponent()}
        </Grid>
        <Grid item xs={6}>
          <>
            {RenderDownloadCard()}
            {RenderMetaData()}
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default DataProductDashboard;
