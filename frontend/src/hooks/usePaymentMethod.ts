import { PaymentMethod } from 'types/PaymentMethod';

const usePaymentMethod = (): PaymentMethod[] => [
  {
    id: 1,
    name: 'Cash',
  },
  {
    id: 2,
    name: 'Carte',
  },
];

export default usePaymentMethod;
