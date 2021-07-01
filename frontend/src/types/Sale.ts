import { Id } from './Id';
import { PaymentMethod } from './PaymentMethod';
import { SaleItem } from './SaleItem';
import { Vendor } from './Vendor';

export interface Sale {
  id: Id;
  paymentMethod: PaymentMethod;
  items: SaleItem[];
  createdBy: Vendor;
  updatedBy?: Vendor;
}
