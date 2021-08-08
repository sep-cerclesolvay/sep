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
              buy_price: '10',
              sell_price: '15',
              quantity: 27,
            },
            {
              id: 2,
              name: 'Produit 2',
              buy_price: '7',
              sell_price: '10',
              quantity: 32,
            },
          ],
        }),
      2000
    )
  );
};
