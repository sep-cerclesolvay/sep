import environment from 'environment';
import { UserWithToken } from 'types/User';

export const loginUser = async (username: string, password: string): Promise<UserWithToken> => {
  const resp = await fetch(`${environment.API_URL}/login/`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({ username, password }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};
