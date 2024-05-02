import React from 'react';
import { Button, ButtonColorTypes, ButtonVariantTypes } from '@ska-telescope/ska-gui-components';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { ALLOW_MOCK_AUTH } from '@utils/constants';
import { useTranslation } from 'react-i18next';

const SwitchAuthButton = () => {
  const { t } = useTranslation('authentication');
  const { application, updateAppContent1 } = storageObject.useStore();

  async function MSEntraClicked(event: { preventDefault: () => void }) {
    event.preventDefault();
    updateAppContent1(ALLOW_MOCK_AUTH ? !application.content1 : false);
  }

  return (
    <Button
      color={application.content1 ? ButtonColorTypes.Error : ButtonColorTypes.Success}
      label={application.content1 ? t('button.switchToMockAuth') : t('button.switchToMSEntraAuth')}
      onClick={(e: { preventDefault: () => void }) => MSEntraClicked(e)}
      testId="useMSEntraTestId"
      variant={ButtonVariantTypes.Outlined}
    />
  );
};

export default SwitchAuthButton;
