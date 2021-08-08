import environment from 'environment';
import { User } from 'types/User';

export const fetchCurrentUser = async (): Promise<User | undefined> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return undefined;
  }
  const resp = await fetch(`${environment.API_URL}/current-user/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
  });
  if (resp.status === 401) localStorage.removeItem('token');
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};
