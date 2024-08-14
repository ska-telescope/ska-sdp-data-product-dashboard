declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env: any;
  }
}

type EnvType = {
  SKIP_PREFLIGHT_CHECK: string;
  REACT_APP_SKA_SDP_DATAPRODUCT_API_URL: string;
  REACT_APP_API_REFRESH_RATE: string;
  REACT_APP_USE_LOCAL_DATA: string;
  REACT_APP_MSENTRA_REDIRECT_URI: string;
  REACT_APP_MSENTRA_CLIENT_ID: string;
  REACT_APP_MSENTRA_TENANT_ID: string;
  REACT_APP_ALLOW_MOCK_AUTH: string;
  REACT_APP_PERMISSIONS_API_URI: string;
  REACT_APP_VERSION: string;
};
export const env: EnvType = {
  ...process.env,
  ...window.env,
  ...(typeof Cypress !== 'undefined' ? Cypress.env() : {})
};
