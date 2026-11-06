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
  REACT_APP_AUTH_CLIENT_ID: string;
  REACT_APP_AUTH_AUTHORITY: string;
  REACT_APP_AUTH_REDIRECT_URI: string;
  REACT_APP_SKA_DATAPRODUCT_API_URL: string;
  REACT_APP_VERSION: string;
  REACT_APP_I18N_DEBUG: boolean;
  REACT_APP_USE_LOCAL_DATA: boolean;
};
export const env: EnvType = {
  ...window.env,

  ...((window as any).Cypress?.env?.() ?? {})
};
