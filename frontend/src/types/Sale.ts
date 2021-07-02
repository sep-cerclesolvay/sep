import { Id } from './Id';
import { PaymentMethod } from './PaymentMethod';
import { SaleItem } from './SaleItem';

export interface Sale {
  id: Id;
  paymentMethod: PaymentMethod;
  items: SaleItem[];
}
