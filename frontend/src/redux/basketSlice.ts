import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'types/Product';
import { AsyncState } from '../types/AsyncState';
import { fetchBasket } from '../api/fetchBasket';
import { RootState } from './store';
import { addAsyncThunk } from './utils';

type BasketState = AsyncState<Product[]>;

const initialState: BasketState = {
  isLoading: true,
};

export const loadBasket = createAsyncThunk('basket/fetchCount', async (_i, { rejectWithValue }) => {
  try {
    const response = await fetchBasket();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  } catch (e) {
    return rejectWithValue(e.data);
  }
});

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      if (state.isLoading || state.data === undefined) {
        throw new Error('Can not add products into the basket: Basket is loading');
      }
      if (state.data.find((product) => product.id == action.payload.id)) {
        return {
          ...state,
          data: state.data.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + action.payload.quantity }
              : product
          ),
        };
      }
      return { ...state, data: [...state.data, action.payload] };
    },
    removeOne: (state, action: PayloadAction<{ id: Product['id'] }>) => {
      if (state.isLoading || state.data === undefined) {
        throw new Error('Can not remove products into the basket: Basket is loading');
      }
      return {
        ...state,
        data: state.data
          .map((product) =>
            product.id === action.payload.id ? { ...product, quantity: product.quantity - 1 } : product
          )
          .filter((product) => product.quantity > 0),
      };
    },
    removeAll: (state, action: PayloadAction<{ id: Product['id'] }>) => {
      if (state.isLoading || state.data === undefined) {
        throw new Error('Can not remove products into the basket: Basket is loading');
      }
      return { ...state, data: state.data.filter((product) => product.id !== action.payload.id) };
    },
  },
  extraReducers: (builder) => {
    addAsyncThunk(builder, loadBasket);
  },
});

export const { add, removeOne, removeAll } = basketSlice.actions;

export const selectBasket = (state: RootState): BasketState => state.basket;

export default basketSlice.reducer;
