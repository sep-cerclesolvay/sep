import environment from 'environment';
import { Id } from 'types/Id';
import { Product } from 'types/Product';

// const sleep = async (duration: number) => await new Promise((r) => setTimeout(r, duration));

export const fetchProducts = async (): Promise<Product[] | undefined> => {
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

export const fetchProductById = async (productId: Id): Promise<Product | undefined> => {
  const resp = await fetch(`${environment.API_URL}/products/${productId}/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};
