import { createSKATheme, SKABrandColor, SKAThemeMode } from '@ska-telescope/ska-gui-components';

// Index of the default (non colour-blind) palette set in createSKATheme.
const DEFAULT_ACCESSIBILITY_MODE = 0;

const theme = (
  mode: SKAThemeMode,
  accessibility: number = DEFAULT_ACCESSIBILITY_MODE,
  buttonVariant: SKABrandColor = SKABrandColor.Blue,
  flatten: boolean = false
) => createSKATheme(mode, accessibility, buttonVariant, flatten);
export default theme;
