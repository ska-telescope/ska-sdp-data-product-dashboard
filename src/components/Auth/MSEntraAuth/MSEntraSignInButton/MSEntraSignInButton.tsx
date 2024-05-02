import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useTranslation } from 'react-i18next';
import { loginRequest } from '../../../../authConfig';

export default function MSEntraSignInButton() {
  const { instance } = useMsal();
  const { t } = useTranslation('authentication');
  function handleLogin() {
    instance.loginRedirect(loginRequest).catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
    });
  }

  return (
    <Button
      ariaDescription={t('button.confirm')}
      color={ButtonColorTypes.Success}
      icon={<DoneOutlinedIcon />}
      label={t('button.signIn')}
      onClick={() => handleLogin()}
      testId="loginButton"
      variant={ButtonVariantTypes.Contained}
    />
  );
}
