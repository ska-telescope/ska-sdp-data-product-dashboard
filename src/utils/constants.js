import { env } from '../env'
export const USE_LOCAL_DATA = env.REACT_APP_USE_LOCAL_DATA === "true";
export const API_REFRESH_RATE = env.REACT_APP_API_REFRESH_RATE;
export const SKA_SDP_DATAPRODUCT_DASHBOARD_URL = env.REACT_APP_SKA_SDP_DATAPRODUCT_DASHBOARD_URL;
export const SKA_SDP_DATAPRODUCT_API_URL = env.REACT_APP_SKA_SDP_DATAPRODUCT_API_URL;
export const DASHBOARD_URL_SUBDIRECTORY = env.REACT_APP_DASHBOARD_URL_SUBDIRECTORY;
export const DOMAIN = env.REACT_APP_DOMAIN;
export const SKA_LOGIN_APP_URL = env.REACT_APP_SKA_LOGIN_APP_URL;

export const DOWNLOAD_BUTTON_LABEL = "BUTTON.DOWNLOAD";
export const DOWNLOAD_ID = "downloadButton";
export const PROD_1 = "eb-m001-20191031-12345";
export const PROD_2 = "eb-m002-20221212-12345";
export const SELECTED_FILE_TITLE = "label.selectFile";
export const TEST_ARRAY = [
  "label.metaData", "interface", "execution_block", "context", "config", "files"
]
export const TEST_DATA_FILE_1 = "TestDataFile1.txt";
export const TEXT_NO_API = "error.API_NOT_AVAILABLE";

export const SPACER_HEADER = 70;
export const SPACER_FOOTER = 0;
export const DATA_STORE_BOX_HEIGHT = 70;
export const SPACER = 50;

export const fullHeight = () => { return `calc(100vh - ${SPACER_HEADER + SPACER_FOOTER + SPACER}px)`};
export const tableHeight = () => { return `calc(100vh - ${SPACER_HEADER + SPACER_FOOTER + DATA_STORE_BOX_HEIGHT + SPACER}px)`};
