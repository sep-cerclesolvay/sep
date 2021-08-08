import { Id } from './Id';
import { Product } from './Product';

export interface SaleItem {
  id: Id;
  product: Omit<Product, 'buy_price' | 'quantity'>;
  quantity: number;
}
