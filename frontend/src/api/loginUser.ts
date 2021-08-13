import environment from 'environment';
import { RequestStatusError } from 'types/RequestStatusError';
import { UserWithToken } from 'types/User';

export const loginUser = async (username: string, password: string): Promise<UserWithToken> => {
  const resp = await fetch(`${environment.API_URL}/login/`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ username, password }),
  });
  if (resp.status === 400) {
    const content = await resp.json();
    if (content.non_field_errors) {
      throw new RequestStatusError(resp.status, resp.statusText, content.non_field_errors.join(','));
    }
  }
  return await resp.json();
};
