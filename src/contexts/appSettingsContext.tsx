import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import usePersistentState from '@hooks/usePersistentState';

// Same key and shape as the former ska-gui-local-storage, so saved settings survive the switch.
export const SETTINGS_STORAGE_KEY = 'ska-ui-store';

export type ThemeModeValue = typeof THEME_LIGHT | typeof THEME_DARK;

type HelpState = {
  content: object | string;
  component: object | string;
  showHelp: boolean;
  contentURL: string;
  componentURL: string;
};

type PersistedSettings = {
  themeMode?: { mode?: ThemeModeValue };
};

export type AppSettingsContextType = {
  help: HelpState;
  helpToggle: () => void;
  themeMode: { mode: ThemeModeValue };
  darkMode: boolean;
  toggleTheme: () => void;
};

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
  const mode = storedMode === THEME_DARK ? THEME_DARK : THEME_LIGHT;

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

  const helpToggle = useCallback(() => {
    setHelp((prev) => ({ ...prev, showHelp: !prev.showHelp }));
  }, []);

  const value = useMemo(
    () => ({
      help,
      helpToggle,
      themeMode: { mode },
      darkMode: mode === THEME_DARK,
      toggleTheme
    }),
    [help, helpToggle, mode, toggleTheme]
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
