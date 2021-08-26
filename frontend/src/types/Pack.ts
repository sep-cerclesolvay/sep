import { Id } from './Id';
import { Product } from './Product';

export interface Pack {
  id: Id;
  name: string;
  products: Product[];
}
