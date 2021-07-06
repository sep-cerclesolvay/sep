import { Product } from 'types/Product';

// A mock function to mimic making an async request for data
export const fetchBasket = (): Promise<{ data: Product[] }> => {
  return new Promise<{ data: Product[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: [
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
          ],
        }),
      2000
    )
  );
};
