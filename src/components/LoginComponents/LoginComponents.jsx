import React from 'react';
import { Button, Typography,  Tooltip, IconButton } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Loader from '@components/loader/Loader';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { DOMAIN } from "../../utils/constants";
import { cypressUser, isCypress } from '../../utils/cypress';
import { useTranslation } from 'react-i18next';
import { importRemote } from '@module-federation/utilities';
import { SKA_LOGIN_APP_URL } from "../../utils/constants";
import axios from 'axios';

// Create a context
const AuthContext = React.createContext();

// Create a provider
export const AuthProvider = ({ children }) => {
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [available, setAvailable] = React.useState(0);

  const value = {
    openLogin,
    setOpenLogin,
    openLogout,
    setOpenLogout,
    username,
    setUsername,
    available,
    setAvailable,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Use the context
export function AuthStates () {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthStates must be used within an AuthProvider');
  }
  return context;
};


export function AuthDialogs () {
  const { openLogin, setOpenLogin, openLogout, setOpenLogout, available, setAvailable } = AuthStates();
  const { clearUser } = storageObject.useStore();

  const LoginFunction = () => {
  };

  function LoginCancelFunction () {
  }

  const LogoutFunction = () => {
    clearUser();
  };

  function LogoutCancelFunction() {
  }

  React.useEffect(() => {
    const checkAvailable = async () => {
      try {
        const result = await axios.get(SKA_LOGIN_APP_URL, { timeout: 4000 });
        if (result.status !== 404) {
          setAvailable(1);
        }
      } catch (error) {
        setAvailable(2);
      }
    };
  
    checkAvailable();
  }, [setAvailable]);
  
   
  const LoginDialog =
    available !== 1
      ? null
      : React.lazy(() =>
          importRemote({
            url: async () => Promise.resolve(SKA_LOGIN_APP_URL),
            remoteEntryFileName: 'remoteEntry.js',
            scope: 'skaLoginPage',
            module: 'LoginDialog'
          })
        );
  
  const LogoutDialog =
  available !== 1
    ? null
    : React.lazy(() =>
        importRemote({
          url: async () => Promise.resolve(SKA_LOGIN_APP_URL),
          remoteEntryFileName: 'remoteEntry.js',
          scope: 'skaLoginPage',
          module: 'LogoutDialog'
        })
      );
 
  return (
    <React.Suspense fallback={<Loader />}>
      {available === 1 && 
      LoginDialog && 
      LogoutDialog && (
      <>
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
      </>
      )}
    </React.Suspense>
  );
}

export function LoginButtonFunction() {
  const { updateUser, user } = storageObject.useStore();
  const { username, setOpenLogin, setOpenLogout, setUsername, available } = AuthStates();
  const { t } = useTranslation('dpd');
  
  React.useEffect(() => {
    setUsername(!user ? '' : user.username);
  }, [setUsername, user]);

  const logoutClick = () => {
    setOpenLogout(true);
  };

  function loginClicked () {
    isCypress() ? updateUser(cypressUser) : setOpenLogin(true);
  };

  return (
    <>
      {available === 1 && username && (
        <Tooltip title={t('toolTip.button.user', { ns: 'login' })} arrow>
          <IconButton
            data-testid="userName"
            role="button"
            aria-label={username}
            sx={{ '&:hover': { backgroundColor: 'primary.dark' }, ml: 1 }}
            color="inherit"
            onClick={logoutClick}
            size="small"
          >
            <Typography variant="h6">{username}</Typography>
          </IconButton>
        </Tooltip>
      )}
      {available === 1 && !username && (
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

      {available === 2 && (
        <Tooltip title='Login capability is not available at this time' arrow>
          <Button
            data-testid="login"
            role="button"
            aria-label={t('button.login', { ns: 'login' })}
            variant="outlined"
            color="error"
            onClick={loginClicked}
            startIcon={<LoginIcon />}
          >
            Login unavailable
          </Button>
        </Tooltip>
      )}

    </>
  );
}

export function LoginDialogs () {
  return (
      <AuthDialogs/>
  );
}

export function LoginButton() {
  return (
      <LoginButtonFunction />
  );
}