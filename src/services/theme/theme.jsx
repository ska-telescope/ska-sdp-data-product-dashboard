import { createTheme } from '@mui/material';
import { Theme } from '@ska-telescope/ska-gui-components';

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';

const theme = mode => createTheme(Theme(mode));
export default theme;
