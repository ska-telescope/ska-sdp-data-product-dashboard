import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, CssBaseline, Grid, Paper, ThemeProvider, Typography,  Tooltip, IconButton } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import DataProductDashboard from '../components/DataProductDashboard/DataProductDashboard';
import { Footer, Header, Spacer, SPACER_VERTICAL } from "@ska-telescope/ska-gui-components";
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { SPACER_FOOTER, SPACER_HEADER, fullHeight, DOMAIN } from "../utils/constants";
import theme from '../services/theme/theme';
import GetAPIStatus from '../services/GetAPIStatus/GetAPIStatus';
import { cypressUser, isCypress } from '../utils/cypress';

const REACT_APP_VERSION = process.env.REACT_APP_VERSION;

const LoginDialog = React.lazy(() => import('skaLoginPage/LoginDialog'));
const LogoutDialog = React.lazy(() => import('skaLoginPage/LogoutDialog'));

function App() {
  const [apiVersion, setAPIVersion] = React.useState("LOCAL");
  const { themeMode, updateUser, user } = storageObject.useStore();
  const { clearUser } = storageObject.useStore();
  const { t } = useTranslation('dpd');

  const [openLogin, setOpenLogin] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const [username, setusername] = React.useState(!user ? '' : user.username);
  
  const LoginFunction = () => {
    console.debug('LoginFunction called');
    setOpenLogin(false)
  };

  function LoginCancelFunction () {
    setOpenLogin(false)
  }

  const loginClicked = () => {
    isCypress() ? updateUser(cypressUser) : setOpenLogin(true);
  };

  const LogoutFunction = () => {
    clearUser();
    setOpenLogout(false);
  };

  function OpenLogoutDialog() {
    setOpenLogout(true);
  }

  function LogoutCancelFunction() {
    setOpenLogout(false);
  }

  const handleLogoutClick = () => {
    console.debug('handleLogoutClick')
    OpenLogoutDialog()
  };


  React.useEffect(() => {
    setusername(!user ? '' : user.username);
  }, [user]);

  React.useEffect(() => {
    console.debug("openLogin:")
    console.debug(openLogin)
  }, [openLogin]);
  
  React.useEffect(() => {
    console.debug("openLogout:")
    console.debug(openLogout)
  }, [openLogout]);


  async function GetVersionNumber() {
    const results = await GetAPIStatus();
    setAPIVersion(results?.data?.Version ? results.data.Version : t('error.API_NOT_AVAILABLE'));
  }

  GetVersionNumber()

  const TheLoginDialogs = () => {
    return (
      <Suspense fallback={<div>Loading login...</div>}>
        <LoginDialog
          openDialog={openLogin}
          setOpenDialog={setOpenLogin}
          LoginFunction={LoginFunction}
          CancelFunction={LoginCancelFunction}
          domain={DOMAIN}
        />
        <LogoutDialog
          openDialog={openLogout}
          setOpenDialog={setOpenLogout}
          LogoutFunction={LogoutFunction}
          CancelFunction={LogoutCancelFunction}
          domain={DOMAIN}
        />
      </Suspense>
    );
  }

  const TheLoginButton = () => {
    return (
      <>
        <Grid item>
            {username && (
              <Tooltip title={t('toolTip.button.user', { ns: 'login' })} arrow>
                <IconButton
                  data-testid="userName"
                  role="button"
                  aria-label={username}
                  sx={{ '&:hover': { backgroundColor: 'primary.dark' }, ml: 1 }}
                  color="inherit"
                  onClick={handleLogoutClick}
                  size="small"
                >
                  <Typography variant="h6">{username}</Typography>
                </IconButton>
              </Tooltip>
            )}
            {!username && (
              <Tooltip title={t('toolTip.button.login', { ns: 'login' })} arrow>
                <Button
                  data-testid="login"
                  role="button"
                  aria-label={t('button.login', { ns: 'login' })}
                  variant="contained"
                  color="secondary"
                  onClick={loginClicked}
                  startIcon={<LoginIcon />}
                >
                  {t('button.login', { ns: 'login' })}
                </Button>
              </Tooltip>
            )}
          </Grid>
      </>
    );
  }

  const TheHeader = () => {
    return (
      <Header selectTelescope={false} data-testid="skaHeader" title={t('application')}>
        <Grid
          m={1}
          container
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Grid item>
            {TheLoginButton()}
          </Grid>
        </Grid>
      </Header>
    );
  }

  const TheFooter = () => {
    return (
      <Footer>
        <Grid item>
          <Typography variant='body1'>{t('label.guiVersion') + ' : ' + REACT_APP_VERSION}</Typography>
          <Typography variant='body1'>{t('label.apiVersion') + ' : ' + apiVersion}</Typography>
        </Grid>
        <Grid item />
        <Grid item />
      </Footer>
    );
  }

  return (
    <ThemeProvider theme={theme(themeMode.mode)}>
      <CssBaseline enableColorScheme />
      <React.Suspense fallback={t("isLoading")}>
        <Paper
            elevation={0}
            sx={{
              backgroundColor: 'primary.main',
              height: '95vh'
            }}
          >
            {TheHeader()}
            <Box m={1} sx={{ height: fullHeight() }}>
              <Spacer size={SPACER_HEADER} axis={SPACER_VERTICAL} />
              <DataProductDashboard data-testid="DataProductDashboardId"/>
              <Spacer size={SPACER_FOOTER} axis={SPACER_VERTICAL} />
            </Box>
            {TheLoginDialogs()}
            {TheFooter()}
          </Paper>
      </React.Suspense>
    </ThemeProvider>
  );
}

export default App;
