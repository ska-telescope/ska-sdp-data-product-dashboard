import { createTheme } from '@mui/material';
import { Theme } from '@ska-telescope/ska-gui-components';

const theme = (mode) => {
  return createTheme(Theme(mode));
};
export default theme;
