/* eslint-disable @typescript-eslint/no-explicit-any */

/* DON'T EDIT THIS FILE DIRECTLY

Run: "make dev-local-env" to update it
*/

declare global {
  interface Window {
    env: any;
  }
}

type EnvType = {
  SKIP_PREFLIGHT_CHECK: boolean;
  REACT_APP_API_REFRESH_RATE: number;
  REACT_APP_MSENTRA_CLIENT_ID: string;
  REACT_APP_MSENTRA_REDIRECT_URI: string;
  REACT_APP_MSENTRA_TENANT_ID: string;
  REACT_APP_PERMISSIONS_API_URI: string;
  REACT_APP_SKA_DATAPRODUCT_API_URL: string;
  REACT_APP_VERSION: string;
  REACT_APP_USE_LOCAL_DATA: boolean;
};
export const env: EnvType = {
  ...process.env,
  ...window.env,
  ...(typeof Cypress !== 'undefined' ? Cypress.env() : {})
};
