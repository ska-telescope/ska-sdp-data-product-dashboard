/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Card } from '@mui/material';
import MockSignOutDialog from '@components/Auth/MockAuth/MockSignOut/MockSignOut';
import MockSignInDialog from '@components/Auth/MockAuth/MockSignIn/MockSignIn';

const MockAuthDialogs = () => {
  const LogoutFunction = () => {
    // eslint-disable-next-line no-empty
  };

  const LoginFunction = () => {
    // eslint-disable-next-line no-empty
  };

  const LogoutCancelFunction = () => {
    // eslint-disable-next-line no-empty
  };

  const LoginCancelFunction = () => {
    // eslint-disable-next-line no-empty
  };

  return (
    <Card variant="outlined">
      <MockSignInDialog LoginFunction={LoginFunction} CancelFunction={LoginCancelFunction} />
      <MockSignOutDialog LogoutFunction={LogoutFunction} CancelFunction={LogoutCancelFunction} />
    </Card>
  );
};

export default MockAuthDialogs;
