import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMsal } from '@azure/msal-react';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';

export function UserProfile() {
  const { t } = useTranslation('authentication');
  const { accounts } = useMsal();
  const homeAccountId = accounts.length > 0 ? accounts[0].homeAccountId : '';
  const tenantId = accounts.length > 0 ? accounts[0].tenantId : '';
  const username = accounts.length > 0 ? accounts[0].username : '';
  const displayName = accounts.length > 0 ? accounts[0].name : '';
  const { access } = storageObject.useStore();

  return (
    <div id="profile-div">
      <p>
        <strong>{t('label.id')}</strong> {homeAccountId}
      </p>
      <p>
        <strong>{t('label.userName')}</strong> {username}
      </p>
      <p>
        <strong>{t('label.displayName')}</strong> {displayName}
      </p>
      <p>
        <strong>{t('label.tenantId')}</strong> {tenantId}
      </p>
      <p>
        <strong>{t('label.telescope')}</strong> {access?.telescopes}
      </p>
    </div>
  );
}
