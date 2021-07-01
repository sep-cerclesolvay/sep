import { Product } from 'types/Product';

const useStocks = (): Product[] => [
  {
    id: 1,
    name: 'Produit 1',
    buyPrice: 10,
    sellPrice: 15,
    quantity: 27,
  },
  {
    id: 2,
    name: 'Produit 2',
    buyPrice: 7,
    sellPrice: 10,
    quantity: 32,
  },
  {
    id: 3,
    name: 'Produit 3',
    buyPrice: 8,
    sellPrice: 17,
    quantity: 15,
  },
  {
    id: 4,
    name: 'Produit 4',
    buyPrice: 10,
    sellPrice: 13,
    quantity: 42,
  },
  {
    id: 5,
    name: 'Produit 5',
    buyPrice: 10,
    sellPrice: 15,
    quantity: 18,
  },
];

export default useStocks;
