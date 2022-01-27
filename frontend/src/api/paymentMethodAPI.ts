import { PaymentMethod } from 'types/PaymentMethod';
import { ReadApi } from './_API';

const paymentMethodAPI = new ReadApi<PaymentMethod>('payment-methods');

export const fetchPaymentMethods = paymentMethodAPI.fetchAll;
