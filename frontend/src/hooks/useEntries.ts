import { Entry } from 'types/Entry';

const useEntries = (): Entry[] => [
  {
    id: 1,
    product: {
      id: 1,
      name: 'Produit 1',
      buy_price: '10',
      sell_price: '15',
    },
    quantity: 27,
  },
];

export default useEntries;
