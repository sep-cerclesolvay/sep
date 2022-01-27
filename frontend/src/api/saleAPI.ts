import environment from 'environment';
import { Id } from 'types/Id';
import { EditableSale, Sale } from 'types/Sale';
import { CRUDApi } from './_API';

const saleApi = new CRUDApi<Sale, EditableSale>('sales', (data: EditableSale) => {
  const obj: { payment_method?: number; items: { quantity: number; product: Id }[] } = {
    items: data.items.map((item) => ({ product: item.product.id, quantity: item.quantity })),
  };

  if (data.payment_method?.id) obj['payment_method'] = data.payment_method.id;

  return JSON.stringify(obj);
});

export const fetchSales = saleApi.fetchAll;
export const fetchSaleById = saleApi.fetchById;
export const saveSale = saleApi.save;

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
  if (contentDisposition) link.download = contentDisposition.substring(21);
  link.click();
};
