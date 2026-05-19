import { useMsal } from '@azure/msal-react';

export const useUserAuthenticated = () => {
  const { accounts } = useMsal();
  return accounts.length > 0;
};
