export const DATA_LOCAL = process.env.REACT_USE_LOCAL_DATA;
export const LOCAL_HOST = "http://localhost:8100/";

export const DOWNLOAD_BUTTON_LABEL = "BUTTON.DOWNLOAD";
export const DOWNLOAD_ID = "button.downloadId";
export const PROD_1 = "eb-m001-20191031-12345";
export const PROD_2 = "eb-m002-20221212-12345";
export const SELECTED_FILE_TITLE = "label.selectFile";
export const TEST_ARRAY = [
  "label.metaData", "interface", "execution_block", "context", "config", "files"
]
export const TEST_DATA_FILE_1 = "TestDataFile1.txt";
export const TEXT_NO_API = "error.API_NO_DATA";

export const SPACER_HEADER = 70;
export const SPACER_FOOTER = 70;
export const DATA_STORE_BOX_HEIGHT = 70;
export const SPACER = 50;

export const fullHeight = () => { return `calc(100vh - ${SPACER_HEADER + SPACER_FOOTER + SPACER}px)`};
export const tableHeight = () => { return `calc(100vh - ${SPACER_HEADER + SPACER_FOOTER + DATA_STORE_BOX_HEIGHT + SPACER}px)`};

// METADATA_TITLE: "label.metaData",
//   INTERFACE: "interface",
//   EX_BLOCK: "execution_block",
//   CONTEXT: "context",
//   CONFIG: "config",
//   FILES: "files",

