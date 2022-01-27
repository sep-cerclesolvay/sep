import { Product } from 'types/Product';
import { CRUDApi } from './_API';

const productApi = new CRUDApi<Product, Product>('products');

export const fetchProducts = productApi.fetchAll;
export const fetchProductById = productApi.fetchById;
