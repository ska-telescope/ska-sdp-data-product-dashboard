/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { callMsGraph } from '@services/graph/graph';
import { storageObject } from '@ska-telescope/ska-gui-local-storage';
import { noUser } from '@services/mocking/mocksAuth';
import { callPermissionsApi } from '@services/PermissionsApi/PermissionsApi';
import { loginRequest } from '../../../authConfig';

interface UpdateMockUserParams {
  id?: string;
  username?: string;
  email?: string;
  language?: string;
  token?: string;
}

export function LoadUserData() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = React.useState(null);
  const [authUser, setAuthUser] = React.useState(noUser); // Authed user in memory, default mocked user
  const { user, updateUser } = storageObject.useStore(); // Actual user in store.

  async function updateMockUser(params: UpdateMockUserParams) {
    setAuthUser((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        id: params.id || prevState.user.id,
        username: params.username || prevState.user.username,
        email: params.email || prevState.user.email,
        language: params.language || prevState.user.language,
        token: params.token || prevState.user.token
      }
    }));
  }

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      })
      .then((response) => {
        updateMockUser({ token: response.accessToken }).then(() => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          callMsGraph(response.accessToken).then((response) => setGraphData(response));
        });
      });
  }

  React.useEffect(() => {
    if (graphData) {
      const { id, displayName, mail, preferredLanguage } = graphData;
      updateMockUser({ id, username: displayName, email: mail, language: preferredLanguage });
    }
  }, [graphData]);

  React.useEffect(() => {
    if (authUser.user.id !== '') {
      updateUser(authUser.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser.user.id]);

  React.useEffect(() => {
    if (user?.token !== '' && user?.token !== undefined) {
      callPermissionsApi(user.token);
    }
  }, [user?.token]);

  React.useEffect(() => {
    if (user?.username === '' || user?.username === undefined) {
      RequestProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
  <> </>;
}
