import { env } from '../env';

export const VERSION = env.REACT_APP_VERSION || 'unknown';

export const { NODE_ENV } = process.env;
export const IS_DEV = NODE_ENV !== 'production';
export const USE_LOCAL_DATA = env.REACT_APP_USE_LOCAL_DATA;
export const API_REFRESH_RATE = env.REACT_APP_API_REFRESH_RATE;
export const SKA_DATAPRODUCT_API_URL = env.REACT_APP_SKA_DATAPRODUCT_API_URL;
export const FEEDBACK_URL = env.REACT_APP_FEEDBACK_FORM_URL || 'https://forms.gle/RvKT9NrHRsmCsw9T6';
export const DATAGRID_DEFAULT_PAGE_SIZE = parseInt(
  env.REACT_APP_DATAGRID_DEFAULT_PAGE_SIZE || '25',
  10
);
export const MSENTRA_CLIENT_ID = env.REACT_APP_MSENTRA_CLIENT_ID;
export const MSENTRA_TENANT_ID = env.REACT_APP_MSENTRA_TENANT_ID;
export const MSENTRA_REDIRECT_URI = env.REACT_APP_MSENTRA_REDIRECT_URI;

export const DOWNLOAD_BUTTON_LABEL = 'BUTTON.DOWNLOAD';
export const DOWNLOAD_ID = 'downloadButton';
export const PROD_1 = 'eb-m001-20191031-12345';
export const PROD_2 = 'eb-m002-20221212-12345';
export const SELECTED_FILE_TITLE = 'label.selectFile';
export const TEST_ARRAY = [
  'label.metaData',
  'interface',
  'execution_block',
  'context',
  'config',
  'files'
];
export const TEST_DATA_FILE_1 = 'TestDataFile1.txt';
export const TEXT_NO_API = 'error.API_NOT_AVAILABLE';

export const SPACER_HEADER = 70;
export const SPACER_FOOTER = 0;
export const DATA_STORE_BOX_HEIGHT = 70;
export const SPACER = 50;

export const fullHeight = () => {
  return `calc(100vh - ${SPACER_HEADER + SPACER_FOOTER + SPACER}px)`;
};
export const tableHeight = (): any => {
  const totalHeight = window.innerHeight;
  const calculatedHeight =
    totalHeight - (SPACER_HEADER + SPACER_FOOTER + DATA_STORE_BOX_HEIGHT + SPACER);
  return calculatedHeight;
};

export const shellSize = (): any => {
  const calculatedHeight = SPACER_HEADER + SPACER_FOOTER + DATA_STORE_BOX_HEIGHT + SPACER;
  return calculatedHeight;
};

export const FILTERCARDHEIGHT = 410;

export const USERS = [
  { label: 'AIV', value: 'aiv' },
  { label: 'Developer', value: 'developer' },
  { label: 'EMS', value: 'ems' },
  { label: 'ITF', value: 'itf' },
  { label: 'Maintainer', value: 'maintainer' },
  { label: 'Operator', value: 'operator' },
  { label: 'Primary Investigator', value: 'pi' },
  { label: 'Co-Investigator', value: 'ci' }
];
