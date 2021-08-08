import { Id } from './Id';

export interface Product {
  id: Id;
  name: string;
  buy_price: string;
  sell_price: string;
  quantity: number;
}
