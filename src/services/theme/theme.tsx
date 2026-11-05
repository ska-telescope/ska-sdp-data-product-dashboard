import { createSKATheme, SKAThemeMode } from '@ska-telescope/ska-gui-components';

// Index of the default (non colour-blind) palette set in createSKATheme.
const DEFAULT_ACCESSIBILITY_MODE = 0;

const theme = (mode: SKAThemeMode) => createSKATheme(mode, DEFAULT_ACCESSIBILITY_MODE);
export default theme;
