import environment from 'environment';
import { Id } from 'types/Id';
import { EditableSale, Sale } from 'types/Sale';

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

export const fetchSaleById = async (saleId: Id): Promise<Sale | undefined> => {
  const resp = await fetch(`${environment.API_URL}/sales/${saleId}/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};

export const saveSale = async (sale?: EditableSale): Promise<Sale | undefined> => {
  if (!sale) return;
  const obj: { payment_method?: number; items: { quantity: number; product: Id }[] } = {
    items: sale.items.map((item) => ({ product: item.product.id, quantity: item.quantity })),
  };

  if (sale.payment_method?.id) obj['payment_method'] = sale.payment_method.id;

  const response = await fetch(`${environment.API_URL}/sales/${typeof sale.id === 'number' ? `${sale.id}/` : ''}`, {
    method: typeof sale.id === 'number' ? 'PUT' : 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
    body: JSON.stringify(obj),
  });
  return await response.json();
};

export const downloadSalesReport = async (): Promise<void> => {
  const resp = await fetch(`${environment.API_URL}/reports/sales/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  const blob = await resp.blob();

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  const contentDisposition = resp.headers.get('Content-Disposition');
  if (contentDisposition) link.download = contentDisposition.substr(21);
  link.click();
};
