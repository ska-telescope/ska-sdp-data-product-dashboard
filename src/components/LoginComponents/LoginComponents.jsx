import React from 'react';
import { Button, Typography,  Tooltip, IconButton } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Loader from '@components/loader/Loader';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { DOMAIN } from "../../utils/constants";
import { cypressUser, isCypress } from '../../utils/cypress';
import { useTranslation } from 'react-i18next';
// import axios from 'axios';

const LoginDialog = React.lazy(() => import('skaLoginPage/LoginDialog'));
const LogoutDialog = React.lazy(() => import('skaLoginPage/LogoutDialog'));

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


export function LoginDialogs () {
  const { openLogin, setOpenLogin, openLogout, setOpenLogout } = AuthStates();
  const { clearUser } = storageObject.useStore();

  const LoginFunction = () => {
    setOpenLogin(false)
  };

  function LoginCancelFunction () {
    setOpenLogin(false)
  }

  const LogoutFunction = () => {
    clearUser();
    setOpenLogout(false);
  };

  function LogoutCancelFunction() {
    setOpenLogout(false);
  }
  
  // React.useEffect(() => {
  //   const checkAvailable = async () => {
  //     try {
  //       const result = await axios.get(URL, { timeout: 4000 });
  //       if (result.status !== 404) {
  //         setAvailable(1);
  //       }
  //     } catch (error) {
  //       setAvailable(2);
  //     }
  //   };
  
  //   checkAvailable();
  // }, []);



  return (
    <React.Suspense fallback={<Loader />}>
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
    </React.Suspense>
  );
}

export function LoginButton() {
  const { updateUser, user } = storageObject.useStore();
  const { username, setOpenLogin, setOpenLogout } = AuthStates();
  const { t } = useTranslation('dpd');
  
  React.useEffect(() => {
    const { setUsername } = AuthStates();
    setUsername(!user ? '' : user.username);
  }, [user]);

  const handleLogoutClick = () => {
    setOpenLogout(true);
  };

  function loginClicked () {
    setOpenLogin(true);
    isCypress() ? updateUser(cypressUser) : setOpenLogin(true);
  };

  return (
    <>
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
    </>
  );
}

export function TheLoginDialogs () {
  return (
      <LoginDialogs/>
  );
}

export function TheLoginButton() {
  return (
      <LoginButton />
  );
}