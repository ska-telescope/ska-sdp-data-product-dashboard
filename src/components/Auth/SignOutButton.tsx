import React from 'react';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';
import { useTranslation } from 'react-i18next';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { ALLOW_MOCK_AUTH } from '@utils/constants';
import MSEntraSignOutButton from '@components/Auth/MSEntraAuth/MSEntraSignOutButton/MSEntraSignOutButton';

export interface UserProps {
  logoutClicked: Function;
}

const SignOutButton = () => {
  const { application } = storageObject.useStore();
  const { t } = useTranslation('authentication');
  const { updateAppContent3 } = storageObject.useStore();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {ALLOW_MOCK_AUTH && !application.content1 ? (
        <Button
          ariaDescription={t('button.confirm')}
          color={ButtonColorTypes.Error}
          icon={<DoNotDisturbAltOutlinedIcon />}
          label={t('button.signOut')}
          onClick={() => updateAppContent3(true)}
          testId="logoutButton"
          variant={ButtonVariantTypes.Contained}
        />
      ) : (
        <MSEntraSignOutButton />
      )}
    </>
  );
};

export default SignOutButton;
