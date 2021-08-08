import environment from 'environment';
import { Id } from 'types/Id';
import { Product } from 'types/Product';

// const sleep = async (duration: number) => await new Promise((r) => setTimeout(r, duration));

export const fetchPacks = async (): Promise<Product[] | undefined> => {
  const resp = await fetch(`${environment.API_URL}/packs/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};

export const fetchPackById = async (productId: Id): Promise<Product | undefined> => {
  const resp = await fetch(`${environment.API_URL}/packs/${productId}/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};
