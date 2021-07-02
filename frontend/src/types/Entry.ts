import { Id } from './Id';
import { Product } from './Product';

export interface Entry {
  id: Id;
  product: Omit<Product, 'quantity'>;
  quantity: number;
}
