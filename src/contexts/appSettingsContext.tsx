import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { SKABrandColor, THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import usePersistentState from '@hooks/usePersistentState';

// Same key and shape as the former ska-gui-local-storage, so saved settings survive the switch.
export const SETTINGS_STORAGE_KEY = 'ska-ui-store';

export type ThemeModeValue = typeof THEME_LIGHT | typeof THEME_DARK;

type HelpState = {
  content: object;
  component: object;
  showHelp: boolean;
  contentURL: string;
  componentURL: string;
};

type PersistedSettings = {
  themeMode?: { mode?: ThemeModeValue };
  accessibility?: number;
  buttonVariant?: SKABrandColor;
  flatten?: boolean;
};

export type AppSettingsContextType = {
  help: HelpState;
  helpToggle: () => void;
  themeMode: { mode: ThemeModeValue };
  darkMode: boolean;
  toggleTheme: () => void;
  accessibility: number;
  setAccessibility: (value: number) => void;
  buttonVariant: SKABrandColor;
  setButtonVariant: (value: SKABrandColor) => void;
  flatten: boolean;
  setFlatten: (value: boolean) => void;
};

// Index of the default (non colour-blind) palette set in createSKATheme.
const DEFAULT_ACCESSIBILITY = 0;

const INITIAL_HELP: HelpState = {
  content: [],
  component: [],
  showHelp: false,
  contentURL: '',
  componentURL: ''
};

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [persisted, setPersisted] = usePersistentState<PersistedSettings>(SETTINGS_STORAGE_KEY, {});
  const [help, setHelp] = useState<HelpState>(INITIAL_HELP);
  // Stored value may be a non-object (e.g. a string or number); ignore anything unexpected.
  const storedMode =
    typeof persisted === 'object' && persisted !== null ? persisted.themeMode?.mode : undefined;
  const mode: ThemeModeValue = storedMode === THEME_DARK ? THEME_DARK : THEME_LIGHT;

  const toggleTheme = useCallback(() => {
    setPersisted((prev) => {
      const base = typeof prev === 'object' && prev !== null ? prev : {};
      return {
        ...base,
        themeMode: {
          ...base.themeMode,
          mode: base.themeMode?.mode === THEME_DARK ? THEME_LIGHT : THEME_DARK
        }
      };
    });
  }, [setPersisted]);

  const setSetting = useCallback(
    <K extends keyof PersistedSettings>(key: K, value: PersistedSettings[K]) => {
      setPersisted((prev) => ({
        ...(typeof prev === 'object' && prev !== null ? prev : {}),
        [key]: value
      }));
    },
    [setPersisted]
  );

  const setAccessibility = useCallback(
    (value: number) => setSetting('accessibility', value),
    [setSetting]
  );
  const setButtonVariant = useCallback(
    (value: SKABrandColor) => setSetting('buttonVariant', value),
    [setSetting]
  );
  const setFlatten = useCallback((value: boolean) => setSetting('flatten', value), [setSetting]);

  const stored = typeof persisted === 'object' && persisted !== null ? persisted : {};
  const accessibility =
    typeof stored.accessibility === 'number' ? stored.accessibility : DEFAULT_ACCESSIBILITY;
  const buttonVariant =
    stored.buttonVariant === SKABrandColor.Pink ? SKABrandColor.Pink : SKABrandColor.Blue;
  const flatten = stored.flatten === true;

  const helpToggle = useCallback(() => {
    setHelp((prev) => ({ ...prev, showHelp: !prev.showHelp }));
  }, []);

  const value = useMemo(
    () => ({
      help,
      helpToggle,
      themeMode: { mode },
      darkMode: mode === THEME_DARK,
      toggleTheme,
      accessibility,
      setAccessibility,
      buttonVariant,
      setButtonVariant,
      flatten,
      setFlatten
    }),
    [
      help,
      helpToggle,
      mode,
      toggleTheme,
      accessibility,
      setAccessibility,
      buttonVariant,
      setButtonVariant,
      flatten,
      setFlatten
    ]
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
};

export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
