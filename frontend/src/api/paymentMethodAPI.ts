import environment from 'environment';
import { PaymentMethod } from 'types/PaymentMethod';

export const fetchPaymentMethods = async (): Promise<PaymentMethod[] | undefined> => {
  const resp = await fetch(`${environment.API_URL}/payment-methods/`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  });
  if (resp.status >= 400) throw new Error(`${resp.status} ${resp.statusText}`);
  return await resp.json();
};
