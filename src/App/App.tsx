import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import DataProductDashboard from '@components/DataProductDashboard/DataProductDashboard';
import Loader from '@components/loader/Loader';
import theme from '@services/theme/theme';
import { useAppSettings } from '@contexts/appSettingsContext';
import { AppWrapper } from '@ska-telescope/ska-gui-components';
import {
  ButtonLogin,
  ButtonLogout,
  ButtonUserMenu,
  isLoggedIn
} from '@ska-telescope/ska-login-page';
import { FEEDBACK_URL, VERSION } from '@utils/constants';
import { ApiStatusProvider, useApiStatus } from '@contexts/ApiStatusContext';

function AppContent() {
  const {
    help,
    helpToggle,
    themeMode,
    toggleTheme,
    accessibility,
    setAccessibility,
    buttonVariant,
    setButtonVariant,
    flatten,
    setFlatten
  } = useAppSettings();
  const authenticated = isLoggedIn();
  const { t } = useTranslation('authentication');
  const { apiStatus } = useApiStatus();
  const apiVersion = apiStatus?.api_version || 'LOCAL';

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'primary.main',
        height: '100vh'
      }}
    >
      <AppWrapper
        application={t('application', { ns: 'dpd' })}
        version={VERSION}
        versionTooltip={`${t('label.apiVersion', { ns: 'dpd' })} ${apiVersion}`}
        iconDocsURL={t('toolTip.button.docsURL', { ns: 'dpd' })}
        iconDocsToolTip={t('toolTip.button.docs', { ns: 'dpd' })}
        iconFeedbackURL={FEEDBACK_URL}
        iconSKAOToolTip={t('toolTip.button.skao', { ns: 'dpd' })}
        iconThemeToolTip={t('toolTip.button.mode', { ns: 'dpd' })}
        loginComponent={
          authenticated ? (
            <ButtonUserMenu showPhoto showUsername toolTip={t('toolTip.button.user')}>
              <ButtonLogout label={t('button.signOut')} toolTip={t('toolTip.button.signOut')} />
            </ButtonUserMenu>
          ) : (
            <ButtonLogin label={t('button.signIn')} toolTip={t('toolTip.button.signIn')} />
          )
        }
        mainChildren={<DataProductDashboard data-testid="DataProductDashboardId" />}
        storageAccessibility={accessibility}
        storageAccessibilityUpdate={setAccessibility}
        storageButtonVariant={buttonVariant}
        storageSetButtonVariant={setButtonVariant}
        storageFlatten={flatten}
        storageSetFlatten={setFlatten}
        storageHelp={help}
        storageHelpToggle={helpToggle}
        storageThemeMode={themeMode.mode}
        storageToggleTheme={toggleTheme}
      />
    </Paper>
  );
}

function App() {
  const { themeMode, accessibility, buttonVariant, flatten } = useAppSettings();

  return (
    <ThemeProvider theme={theme(themeMode?.mode, accessibility, buttonVariant, flatten)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
        <ApiStatusProvider>
          <AppContent />
        </ApiStatusProvider>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
