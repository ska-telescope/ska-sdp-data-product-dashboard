import { createTheme } from '@mui/material';
import { Theme } from '@ska-telescope/ska-javascript-components';

const theme = () => {
  const mode = 'light';
  return createTheme(Theme(mode));
};
export default theme;
