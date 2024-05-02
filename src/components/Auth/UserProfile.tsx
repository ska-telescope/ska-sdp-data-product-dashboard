import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  user: {
    id: string;
    username: string;
    email?: string;
    language?: string;
    token?: string;
  } | null; // Add null as a possible type
}

export function UserProfile({ user }: Props) {
  const { t } = useTranslation('authentication');

  if (!user) {
    // Handle the case where user is null or undefined
    return <div>{t('label.userDataNotAvailable')}</div>;
  }

  const { id, username, email, language, token } = user; // Destructure the properties

  return (
    <div id="profile-div">
      <p>
        <strong>{t('label.id')}</strong> {id}
      </p>
      <p>
        <strong>{t('label.userName')}</strong> {username}
      </p>
      {email && (
        <p>
          <strong>{t('label.email')}</strong> {email}
        </p>
      )}{' '}
      {/* Render email if it exists */}
      {language && (
        <p>
          <strong>{t('label.language')}</strong> {language}
        </p>
      )}{' '}
      {/* Render language if it exists */}
      {token && token !== '' && (
        <p>
          <strong>{t('label.tokenSaved')}</strong>
        </p>
      )}{' '}
      {/* Render language if it exists */}
    </div>
  );
}
