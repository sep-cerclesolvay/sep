import environment from 'environment';
import { Product } from 'types/Product';

const sleep = async (duration: number) => await new Promise((r) => setTimeout(r, duration));

export const fetchProducts = async (): Promise<Product[] | undefined> => {
  await sleep(2000);
  const resp = await fetch(`${environment.API_URL}/products/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};
