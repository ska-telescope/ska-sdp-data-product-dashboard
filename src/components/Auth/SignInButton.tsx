import React from 'react';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { useTranslation } from 'react-i18next';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { ALLOW_MOCK_AUTH } from '@utils/constants';
import MSEntraSignInButton from '@components/Auth/MSEntraAuth/MSEntraSignInButton/MSEntraSignInButton';

export interface UserProps {
  loginClicked: Function;
}

const SignInButton = (): React.JSX.Element => {
  const { application } = storageObject.useStore();
  const { t } = useTranslation('authentication');
  const { updateAppContent2 } = storageObject.useStore();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {ALLOW_MOCK_AUTH && !application.content1 ? (
        <Button
          ariaDescription={t('button.confirm')}
          color={ButtonColorTypes.Success}
          icon={<DoneOutlinedIcon />}
          label={t('button.signIn')}
          onClick={() => updateAppContent2(true)}
          testId="loginButton"
          variant={ButtonVariantTypes.Contained}
        />
      ) : (
        <MSEntraSignInButton />
      )}
    </>
  );
};

export default SignInButton;
