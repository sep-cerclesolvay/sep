import { Id } from './Id';
import { Product } from './Product';

export interface Entry {
  id: Id;
  created_date: string;
  updated_date?: string | null;
  product: Omit<Product, 'quantity'>;
  quantity: number;
}
