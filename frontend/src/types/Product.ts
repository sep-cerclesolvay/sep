import { Id } from './Id';

export interface Product {
  id: Id;
  name: string;
  buyPrice: number;
  sellPrice: number;
  quantity: number;
}
