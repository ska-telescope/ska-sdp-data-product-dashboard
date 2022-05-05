import React from 'react';
import './ExampleComponent.scss';
import { useTranslation } from 'react-i18next';

const ExampleComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="exampleContainer">
      <p>{t('language')}</p>
      <p>{t('date_format_one', { date: new Date() })}</p>
      <p>{t('date_format_two', { date: new Date() })}</p>
      <p>{t('intlNumber', { val: 2000 })}</p>
      <p>{t('dummy')}</p>
    </div>
  );
};

export default ExampleComponent;
