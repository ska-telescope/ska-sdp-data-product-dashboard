import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  CopyrightModal,
  Footer,
  Header,
  SPACER_VERTICAL,
  Spacer
} from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { ALLOW_MOCK_AUTH, SPACER_FOOTER, SPACER_HEADER, VERSION } from '@utils/constants';
import SwitchAuthButton from '@components/Auth/SwitchAuthButton';
import SignInButton from '@components/Auth/SignInButton';
import MockAuthDialogs from '@components/Auth/MockAuth/MockAuthDialogs/MockAuthDialogs';
import { LoadUserData } from '@components/Auth/MSEntraAuth/LoadUserData';
import { MsalAuthenticationTemplate } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { IconButton, Paper, Tooltip, Typography } from '@mui/material';
import GetAPIStatus from '@services/GetAPIStatus/GetAPIStatus';
import User from './User/User';

function TheHeader(setOpenUser: {
  (newOpen: boolean): () => void;
  (arg0: boolean): React.MouseEventHandler<HTMLButtonElement> | undefined;
}): React.JSX.Element {
  const { t } = useTranslation('dpd');
  const { user } = storageObject.useStore();
  const skao = t('toolTip.button.skao');
  const mode = t('toolTip.button.mode');
  const toolTip = { skao, mode };
  const username = !user ? '' : user.username;
  const getDocs = () => {
    const headerTip = t('toolTip.button.docs');
    const headerURL = t('toolTip.button.docsURL');
    return { tooltip: headerTip, url: headerURL };
  };
  const { help, helpToggle, themeMode, toggleTheme } = storageObject.useStore();
  const theStorage = {
    help,
    helpToggle,
    themeMode: themeMode.mode,
    toggleTheme
  };

  const signIn = () => (
    <>
      <MsalAuthenticationTemplate interactionType={InteractionType.None}>
        <LoadUserData />
      </MsalAuthenticationTemplate>
      {username && (
        <Tooltip title={t('toolTip.button.user', { ns: 'authentication' })} arrow>
          <IconButton
            data-testid="userName"
            role="button"
            aria-label={username}
            sx={{ '&:hover': { backgroundColor: 'primary.dark' }, ml: 1 }}
            color="inherit"
            onClick={setOpenUser(true)}
            size="small"
          >
            <Typography variant="h6">{username}</Typography>
          </IconButton>
        </Tooltip>
      )}
      {!username && <SignInButton />}
    </>
  );

  return (
    <Header
      docs={getDocs()}
      title={t('application')}
      testId="skaHeader"
      toolTip={toolTip}
      storage={theStorage}
    >
      {ALLOW_MOCK_AUTH ? <SwitchAuthButton /> : <> </>}
      {signIn()}
    </Header>
  );
}

export function TheFooter(): React.JSX.Element {
  const { t } = useTranslation('dpd');
  const [showCopyright, setShowCopyright] = React.useState(false);

  const [apiVersion, setAPIVersion] = React.useState('LOCAL');

  async function GetVersionNumber() {
    const results = await GetAPIStatus();
    setAPIVersion(
      results?.data?.api_version ? results.data.api_version : t('error.API_NOT_AVAILABLE')
    );
  }

  React.useEffect(() => {
    GetVersionNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CopyrightModal copyrightFunc={setShowCopyright} show={showCopyright} />
      <Footer
        copyrightFunc={setShowCopyright}
        testId="footerId"
        version={VERSION}
        versionTooltip={`${t('label.apiVersion')} ${apiVersion}`}
      />
    </>
  );
}

export interface LayoutProps {
  children: JSX.Element;
}

export function Shell({ children }: LayoutProps) {
  const { application } = storageObject.useStore();
  const [openUser, setOpenUser] = React.useState(false);
  const { user } = storageObject.useStore();
  const username = !user ? '' : user.username;

  React.useEffect(() => {
    if (username === '') {
      setOpenUser(false);
    }
  }, [username]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenUser(newOpen);
  };

  return (
    <Paper elevation={0} sx={{ height: '100%', backgroundColor: 'primary.main' }}>
      {TheHeader(toggleDrawer)}
      <User open={openUser} toggleDrawer={toggleDrawer} />
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'primary.main',
          width: '100vw',
          minHeight: '100vh'
        }}
      >
        <div>
          <Spacer size={SPACER_HEADER} axis={SPACER_VERTICAL} />
          <main>{children}</main>
          <Spacer size={SPACER_FOOTER} axis={SPACER_VERTICAL} />
        </div>
      </Paper>
      {ALLOW_MOCK_AUTH && !application.content1 ? <MockAuthDialogs /> : null}
      {TheFooter()}
    </Paper>
  );
}
