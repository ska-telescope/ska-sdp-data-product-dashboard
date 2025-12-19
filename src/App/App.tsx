import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import DataProductDashboard from '@components/DataProductDashboard/DataProductDashboard';
import Loader from '@components/loader/Loader';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import theme from '@services/theme/theme';
import { AuthWrapper } from '@ska-telescope/ska-login-page';
import { VERSION } from '@utils/constants';
import { ApiStatusProvider, useApiStatus } from '@contexts/ApiStatusContext';

function AppContent() {
  const { help, helpToggle, themeMode, toggleTheme } = storageObject.useStore();
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
      <AuthWrapper
        mainChildren={<DataProductDashboard data-testid="DataProductDashboardId" />}
        version={VERSION}
        versionTooltip={`${t('label.apiVersion', { ns: 'dpd' })} ${apiVersion}`}
        application={t('application', { ns: 'dpd' })}
        buttonLoginLabel={t('button.signIn')}
        buttonLoginToolTip={t('toolTip.button.signIn')}
        buttonLogoutLabel={t('button.signOut')}
        buttonLogoutToolTip={t('toolTip.button.user')}
        buttonUserShowPhoto
        buttonUserShowUsername
        buttonUserToolTip={t('toolTip.button.signOut')}
        docsIconToolTip={t('toolTip.button.docs', { ns: 'dpd' })}
        docsURL={t('toolTip.button.docsURL', { ns: 'dpd' })}
        skaoLogoToolTip={t('toolTip.button.skao', { ns: 'dpd' })}
        themeModeToolTip={t('toolTip.button.mode', { ns: 'dpd' })}
        storageHelp={help}
        storageHelpToggle={helpToggle}
        storageThemeMode={themeMode.mode}
        storageToggleTheme={toggleTheme}
      />
    </Paper>
  );
}

function App() {
  const { themeMode } = storageObject.useStore();

  return (
    <ThemeProvider theme={theme(themeMode?.mode)}>
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
