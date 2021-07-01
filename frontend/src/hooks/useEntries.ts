import { Entry } from 'types/Entry';

const useEntries = (): Entry[] => [
  {
    id: 1,
    product: {
      id: 1,
      name: 'Produit 1',
      buyPrice: 10,
      sellPrice: 15,
    },
    quantity: 27,
    createdBy: {
      firstName: 'Luke',
      lastName: 'Skywalker',
    },
  },
];

export default useEntries;
