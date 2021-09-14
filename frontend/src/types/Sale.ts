import { Id } from './Id';
import { PaymentMethod } from './PaymentMethod';
import { EditableSaleItem, SaleItem } from './SaleItem';

export interface EditableSale {
  id?: Id;
  created_date?: string;
  updated_date?: string | null;
  payment_method?: PaymentMethod;
  total: string;
  items: EditableSaleItem[];
}

export interface Sale extends EditableSale {
  id: Id;
  created_date: string;
  updated_date: string | null;
  payment_method: PaymentMethod;
  items: SaleItem[];
}
