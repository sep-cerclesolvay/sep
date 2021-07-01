import { Id } from './Id';
import { Product } from './Product';

export interface SaleItem {
  id: Id;
  product: Omit<Product, 'buyPrice' | 'quantity'>;
  quantity: number;
}
