import React from 'react';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Paper, ThemeProvider } from '@mui/material';
import DataProductDashboard from '@components/DataProductDashboard/DataProductDashboard';
import Loader from '@components/loader/Loader';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import theme from '@services/theme/theme';
import { AuthWrapper } from '@ska-telescope/ska-login-page';
import { VERSION } from '@utils/constants';
import { GetAPIStatus } from '@services/GetAPIStatus/GetAPIStatus';

function App() {
  const { help, helpToggle, themeMode, toggleTheme } = storageObject.useStore();
  const { t } = useTranslation('authentication');
  const [apiVersion, setAPIVersion] = React.useState('LOCAL');

  React.useEffect(() => {
    async function fetchVersion() {
      const results = await GetAPIStatus();
      setAPIVersion(
        results?.data?.api_version ? results.data.api_version : t('error.API_NOT_AVAILABLE')
      );
    }
    fetchVersion();
  }, [t]);

  return (
    <ThemeProvider theme={theme(themeMode?.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={<Loader />}>
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
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
