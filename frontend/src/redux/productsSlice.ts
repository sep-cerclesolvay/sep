import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from 'types/Product';
import { AsyncState } from '../types/AsyncState';
import { RootState } from './store';
import { addAsyncThunk } from './utils';
import { fetchProducts } from 'api/productAPI';
import { useAppSelector } from './hooks';

type ProductsState = AsyncState<Product[]>;

const initialState: ProductsState = {
  isLoading: true,
};

export const loadProducts = createAsyncThunk('products/fetchProducts', async (_i, { rejectWithValue }) => {
  try {
    const response = await fetchProducts();
    return response;
  } catch (e) {
    return rejectWithValue(e.data);
  }
});

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunk(builder, loadProducts);
  },
});

export const selectProducts = (state: RootState): ProductsState => state.products;
export const useProducts = (): AsyncState<Product[]> => useAppSelector(selectProducts);

export default productsSlice.reducer;
