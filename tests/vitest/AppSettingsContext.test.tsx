import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { THEME_DARK, THEME_LIGHT } from '@ska-telescope/ska-gui-components';
import {
  AppSettingsProvider,
  SETTINGS_STORAGE_KEY,
  useAppSettings
} from '../../src/contexts/appSettingsContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <AppSettingsProvider>{children}</AppSettingsProvider>
);

// The 2.x library bundles its own MUI, which Vitest cannot resolve; only the constants are needed.
vi.mock('@ska-telescope/ska-gui-components', () => ({ THEME_DARK: 'dark', THEME_LIGHT: 'light' }));

const seedStorage = (value: object) =>
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(value));
const readStored = () => JSON.parse(window.localStorage.getItem(SETTINGS_STORAGE_KEY) ?? '{}');

describe('AppSettingsContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('provides light theme and hidden help by default', () => {
    const { result } = renderHook(() => useAppSettings(), { wrapper });

    expect(result.current.themeMode.mode).toBe(THEME_LIGHT);
    expect(result.current.darkMode).toBe(false);
    expect(result.current.help.showHelp).toBe(false);
  });

  it('toggles the theme and persists it alongside other saved keys', () => {
    seedStorage({ user: { id: 'u1' } });
    const { result } = renderHook(() => useAppSettings(), { wrapper });

    act(() => result.current.toggleTheme());

    expect(result.current.themeMode.mode).toBe(THEME_DARK);
    expect(result.current.darkMode).toBe(true);
    expect(readStored()).toEqual({ user: { id: 'u1' }, themeMode: { mode: THEME_DARK } });
  });

  it('restores the theme saved by the previous storage library', () => {
    seedStorage({ themeMode: { mode: THEME_DARK, accessibility: 'default' } });
    const { result } = renderHook(() => useAppSettings(), { wrapper });

    expect(result.current.themeMode.mode).toBe(THEME_DARK);

    act(() => result.current.toggleTheme());

    expect(readStored().themeMode).toEqual({ mode: THEME_LIGHT, accessibility: 'default' });
  });

  it('toggles help', () => {
    const { result } = renderHook(() => useAppSettings(), { wrapper });

    act(() => result.current.helpToggle());

    expect(result.current.help.showHelp).toBe(true);
  });

  it('keeps theme across a reload', () => {
    const first = renderHook(() => useAppSettings(), { wrapper });
    act(() => first.result.current.toggleTheme());
    first.unmount();

    const { result } = renderHook(() => useAppSettings(), { wrapper });

    expect(result.current.themeMode.mode).toBe(THEME_DARK);
  });

  it('throws when used outside the provider', () => {
    expect(() => renderHook(() => useAppSettings())).toThrow(
      'useAppSettings must be used within an AppSettingsProvider'
    );
  });
});
