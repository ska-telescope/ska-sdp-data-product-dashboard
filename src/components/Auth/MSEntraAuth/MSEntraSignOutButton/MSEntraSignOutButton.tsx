import React from 'react';
import { useMsal } from '@azure/msal-react';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { useTranslation } from 'react-i18next';

export default function MSEntraSignOutButton() {
  const { instance } = useMsal();
  const { t } = useTranslation('authentication');
  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/'
    });
  };

  return (
    <Button
      ariaDescription={t('button.confirm')}
      color={ButtonColorTypes.Error}
      icon={<DoNotDisturbAltOutlinedIcon />}
      label={t('button.signOut')}
      onClick={() => handleLogout()}
      testId="logoutButton"
      variant={ButtonVariantTypes.Contained}
    />
  );
}
