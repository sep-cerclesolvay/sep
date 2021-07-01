import { Id } from './Id';
import { Product } from './Product';
import { Vendor } from './Vendor';

export interface Entry {
  id: Id;
  product: Omit<Product, 'quantity'>;
  quantity: number;
  createdBy: Vendor;
  updatedBy?: Vendor;
}
