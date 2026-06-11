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
  REACT_APP_FEEDBACK_FORM_URL: string;
  SKIP_PREFLIGHT_CHECK: boolean;
  REACT_APP_API_REFRESH_RATE: number;
  REACT_APP_DATAGRID_DEFAULT_PAGE_SIZE: string;
  REACT_APP_MSENTRA_CLIENT_ID: string;
  REACT_APP_MSENTRA_REDIRECT_URI: string;
  REACT_APP_MSENTRA_TENANT_ID: string;
  REACT_APP_SKA_DATAPRODUCT_API_URL: string;
  REACT_APP_VERSION: string;
  REACT_APP_USE_LOCAL_DATA: boolean;
};
export const env: EnvType = {
  ...window.env,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...((window as any).Cypress?.env?.() ?? {})
};
