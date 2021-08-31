import environment from 'environment';
import { Id } from 'types/Id';
import { Sale } from 'types/Sale';

// const sleep = async (duration: number) => await new Promise((r) => setTimeout(r, duration));

export const fetchSales = async (): Promise<Sale[] | undefined> => {
  const resp = await fetch(`${environment.API_URL}/sales/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};

export const fetchSaleById = async (packId: Id): Promise<Sale | undefined> => {
  const resp = await fetch(`${environment.API_URL}/sales/${packId}/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};
