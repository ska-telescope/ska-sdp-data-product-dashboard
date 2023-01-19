import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Divider, Drawer, Grid, Stack, Typography } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import DownloadCard from './DownloadCard';
import DataProductList from '../../services/DataProduct/DataProductList';
import MetaData from '../../services/MetaData/MetaData';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';

const TREE_MAX_WIDTH = 500;
const TREE_HEIGHT = 500;

const DataProductDashboard = () => {
  const { t } = useTranslation();

  const [jsonDataProductsTree, setJsonDataProductsTree] = React.useState({data:[]});
  const [open, setOpen] = React.useState(false);
  const [metaData, setMetaData] = React.useState({data:[]});
  const [selectedFileNames, setSelectedFileNames] = React.useState({
    fileName: '',
    relativeFileName: ''
  });

  function drawerTgggle() {
    setOpen(!open);
}

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
    getSelectedNodeInfo(jsonDataProductsTree.data, nodeId);
  };

  async function getJsonDataProductsTree() {
    setJsonDataProductsTree(await DataProductList());
  }

  async function getMetaData() {
    const results = await MetaData();
    setMetaData(results.data);
  }

  if (jsonDataProductsTree.status === undefined) {
    getJsonDataProductsTree();
  }

  function renderDataProductsTreeNodes() {
    if (jsonDataProductsTree.status === 200) {
      const renderTree = nodes => (
        <TreeItem key={nodes.id} nodeId={nodes.id.toString()} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
        </TreeItem>
      );
      return renderTree(jsonDataProductsTree.data);
    }
    return <></>;
  }

  function renderDataProductsTreeComponent() {
    if (jsonDataProductsTree.status === 200 ) {
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

  function metaDataButton() {
    return (
      <Box m={2} >
        <Button
            id="metaDataButton"
            variant="contained"
            color='secondary'
            startIcon={<BuildCircleOutlinedIcon />}
            onClick={metaDataButtonClicked}
        >
            {t('button.settings')}
        </Button>
      </Box>
    );
  }

  function metaDataElements() {
    const context = JSON.stringify(metaData.context);
    return (
      <Drawer anchor={'right'} open={open} onClose={drawerTgggle}  PaperProps={{ sx: { width: "25vw" }}}>
        <Box m={1}>
          <Stack>
            <Typography variant="h4" component="div">Meta Data</Typography>
            <Divider />
            <Typography variant="h6" component="div">interface</Typography>
            <Typography variant="body2" component="div">{metaData.interface}</Typography>
            <Divider />
            <Typography variant="h6" component="div">execution_block</Typography>
            <Typography variant="body2" component="div">{metaData.execution_block}</Typography>
            <Divider />
            <Typography variant="h6" component="div">context</Typography>
            <Typography variant="body2" component="div">{context}</Typography>
            <Divider />
            <Typography variant="h6" component="div">config</Typography>
            <Typography variant="body2" component="div">{JSON.stringify(metaData.config)}</Typography>
            <Divider />
            <Typography variant="h6" component="div">files</Typography>
            <Typography variant="body2" component="div">{JSON.stringify(metaData.files)}</Typography>
            
          </Stack>
        </Box>
      </Drawer>
    );
  }

  function metaDataButtonClicked() {
    getMetaData();
    drawerTgggle();
  }

  return (
    <>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          {renderDataProductsTreeComponent()}
          {RenderDownloadCard()}
        </Grid>
        <Grid item>
          <>
            {metaDataButton()}
            {metaData && metaDataElements()}
          </>
        </Grid>
      </Grid>
    </>
  );
};

export default DataProductDashboard;
