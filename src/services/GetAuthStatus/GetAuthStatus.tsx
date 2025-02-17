import React from 'react';
import { useMsal } from '@azure/msal-react';

export const useUserAuthenticated = () => {
  const { instance } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuthStatus = () => {
      const allAccounts = instance.getAllAccounts();
      setIsAuthenticated(allAccounts.length === 1);
    };

    checkAuthStatus(); // Check on initial mount
  }, [instance]);

  return isAuthenticated;
};
