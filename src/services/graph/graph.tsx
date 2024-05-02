import { graphConfig } from '../../authConfig';

/**
 * Attaches a given access token to an MS Graph API call. Returns information about the user.
 * @param accessToken
 * @returns {Promise<any>} User data from MS Graph
 */
export async function callMsGraph(accessToken: string): Promise<unknown> {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers
  };

  try {
    const response = await fetch(graphConfig.graphMeEndpoint, options);
    const data = await response.json();
    return data; // Return the graph data directly
  } catch (error) {
    console.error('Error fetching MS Graph data:', error);
    return null;
  }
}
