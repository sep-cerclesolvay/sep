import { Id } from './Id';
import { Product } from './Product';

export interface EditableSaleItem {
  id?: Id;
  product: Omit<Product, 'buy_price' | 'quantity'>;
  quantity: number;
}
export interface SaleItem extends EditableSaleItem {
  id: Id;
}
