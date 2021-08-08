import { Sale } from 'types/Sale';

const useSales = (): Sale[] => [
  {
    id: 1,
    paymentMethod: {
      id: 1,
      name: 'Cash',
    },
    items: [
      {
        id: 1,
        product: {
          id: 1,
          name: 'Produit 1',
          sell_price: '15',
        },
        quantity: 3,
      },
    ],
  },
  {
    id: 2,
    paymentMethod: {
      id: 2,
      name: 'Carte',
    },
    items: [
      {
        id: 2,
        product: {
          id: 5,
          name: 'Produit 5',
          sell_price: '15',
        },
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    paymentMethod: {
      id: 1,
      name: 'Cash',
    },
    items: [
      {
        id: 3,
        product: {
          id: 2,
          name: 'Produit 2',
          sell_price: '10',
        },
        quantity: 1,
      },
      {
        id: 4,
        product: {
          id: 3,
          name: 'Produit 3',
          sell_price: '17',
        },
        quantity: 1,
      },
    ],
  },
  {
    id: 4,
    paymentMethod: {
      id: 2,
      name: 'Carte',
    },
    items: [
      {
        id: 5,
        product: {
          id: 1,
          name: 'Produit 1',
          sell_price: '15',
        },
        quantity: 1,
      },
      {
        id: 6,
        product: {
          id: 2,
          name: 'Produit 2',
          sell_price: '10',
        },
        quantity: 1,
      },
      {
        id: 7,
        product: {
          id: 3,
          name: 'Produit 3',
          sell_price: '17',
        },
        quantity: 1,
      },
    ],
  },
  {
    id: 5,
    paymentMethod: {
      id: 1,
      name: 'Cash',
    },
    items: [
      {
        id: 8,
        product: {
          id: 1,
          name: 'Produit 1',
          sell_price: '15',
        },
        quantity: 3,
      },
    ],
  },
];

export default useSales;
